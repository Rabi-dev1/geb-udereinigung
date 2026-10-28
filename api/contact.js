// Serverseitiger Versand der Kontaktanfragen (Vercel Function, Node.js-Runtime).
//
// Versand wahlweise über
//   1. SMTP (z. B. IONOS-Postfach)  → SMTP_USER + SMTP_PASS setzen
//   2. Resend                         → RESEND_API_KEY setzen (hat Vorrang)
// Alle Zugangsdaten kommen ausschließlich aus Umgebungsvariablen.
import nodemailer from 'nodemailer';
import { services, objectTypes, intervals } from '../src/data.js';

const env = (key, fallback = '') => (process.env[key] ?? '').trim() || fallback;

const LIMITS = { name: 100, firma: 120, telefon: 40, email: 200, ort: 100, nachricht: 5000 };
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;
const ALLOWED_HOSTS = [/^(www\.)?ostwestglanz\.de$/, /\.vercel\.app$/, /^localhost(:\d+)?$/, /^127\.0\.0\.1(:\d+)?$/];

// Einfache Drossel pro Instanz: max. 5 Anfragen je IP in 10 Minuten
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now(), windowMs = 10 * 60 * 1000;
  const list = (hits.get(ip) || []).filter(t => now - t < windowMs);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > 5;
}

const clean = (v, max) => String(v ?? '').replace(/\r\n?/g, '\n').trim().slice(0, max);
const oneLine = v => v.replace(/[\r\n]+/g, ' ');
const escapeHtml = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pick = (value, list, fallback) => (list.includes(value) ? value : fallback);

function serviceTitle(value) {
  if (value === 'sonstiges') return 'Sonstiges / Mehrere Leistungen';
  return services.find(s => s.slug === value || s.title === value)?.title || 'Nicht angegeben';
}

async function readBody(request) {
  const type = request.headers.get('content-type') || '';
  if (type.includes('application/json')) return { data: await request.json(), html: false };
  if (type.includes('application/x-www-form-urlencoded') || type.includes('multipart/form-data')) {
    return { data: Object.fromEntries(await request.formData()), html: true };
  }
  throw new Error('unsupported');
}

function validate(raw) {
  const d = {
    name: oneLine(clean(raw.name, LIMITS.name)),
    firma: oneLine(clean(raw.firma, LIMITS.firma)),
    telefon: oneLine(clean(raw.telefon, LIMITS.telefon)),
    email: oneLine(clean(raw.email, LIMITS.email)).toLowerCase(),
    ort: oneLine(clean(raw.ort, LIMITS.ort)),
    nachricht: clean(raw.nachricht, LIMITS.nachricht),
    leistung: serviceTitle(clean(raw.leistung, 120)),
    objekt: pick(clean(raw.objekt, 120), objectTypes, 'Nicht angegeben'),
    rhythmus: pick(clean(raw.rhythmus, 120), intervals, 'Nicht angegeben'),
  };
  const errors = {};
  if (d.name.length < 2) errors.name = 'Bitte geben Sie Ihren Namen an.';
  if (!EMAIL_RE.test(d.email)) errors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse an.';
  if (d.telefon && !/^[+\d][\d\s()/-]{4,}$/.test(d.telefon)) errors.telefon = 'Bitte prüfen Sie die Telefonnummer.';
  if (!(raw.consent === true || raw.consent === 'on' || raw.consent === 'true')) errors.consent = 'Bitte stimmen Sie der Datenverarbeitung zu.';
  return { d, errors };
}

function buildMail(d) {
  const rows = [
    ['Name', d.name], ['Firma / Hausverwaltung', d.firma], ['E-Mail', d.email], ['Telefon', d.telefon],
    ['Leistung', d.leistung], ['Art des Objekts', d.objekt], ['PLZ / Ort', d.ort], ['Rhythmus', d.rhythmus],
  ].filter(([, v]) => v);
  const message = d.nachricht || '(keine Nachricht)';

  const text = `Neue Anfrage über www.ostwestglanz.de\n\n${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nNachricht:\n${message}\n\n—\nAntworten Sie einfach auf diese E-Mail, um ${d.name} direkt zu erreichen.`;

  const html = `<!doctype html><html><body style="margin:0;background:#f5f8fc;font-family:Arial,Helvetica,sans-serif;color:#0d1d35">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border:1px solid #e3e9f1;border-radius:12px;overflow:hidden">
<tr><td style="background:#0b3a78;padding:20px 24px;color:#fff;font-size:18px;font-weight:bold">Neue Anfrage: ${escapeHtml(d.leistung)}</td></tr>
<tr><td style="padding:24px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.5">
${rows.map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#64748b;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0;font-weight:bold">${k === 'E-Mail' ? `<a href="mailto:${escapeHtml(v)}" style="color:#1a6fd1">${escapeHtml(v)}</a>` : k === 'Telefon' ? `<a href="tel:${escapeHtml(v.replace(/[^\d+]/g, ''))}" style="color:#1a6fd1">${escapeHtml(v)}</a>` : escapeHtml(v)}</td></tr>`).join('')}
</table>
<p style="margin:20px 0 6px;color:#64748b;font-size:13px">Nachricht</p>
<div style="padding:14px 16px;background:#f5f8fc;border-radius:8px;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(message)}</div>
<p style="margin:20px 0 0;color:#64748b;font-size:12px">Auf diese E-Mail antworten → die Antwort geht direkt an ${escapeHtml(d.email)}.</p>
</td></tr></table></td></tr></table></body></html>`;

  return { subject: `Neue Anfrage: ${d.leistung} – ${d.name}`, text, html };
}

async function send(d) {
  const to = env('CONTACT_TO', 'info@ostwestglanz.de');
  const from = env('CONTACT_FROM', 'OstWest Glanz Website <info@ostwestglanz.de>');
  const mail = buildMail(d);
  const replyTo = { name: d.name, address: d.email };

  if (env('RESEND_API_KEY')) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env('RESEND_API_KEY')}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], reply_to: `${d.name.replace(/[<>"]/g, '')} <${d.email}>`, ...mail }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 300)}`);
    return 'resend';
  }

  if (env('SMTP_USER') && env('SMTP_PASS')) {
    const port = Number(env('SMTP_PORT', '465'));
    const transport = nodemailer.createTransport({
      host: env('SMTP_HOST', 'smtp.ionos.de'), port, secure: port === 465,
      auth: { user: env('SMTP_USER'), pass: env('SMTP_PASS') },
      connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 15000,
    });
    await transport.sendMail({ from, to, replyTo, ...mail });
    return 'smtp';
  }

  if (env('CONTACT_DRY_RUN') === '1') {
    console.log(`[contact] DRY RUN – würde senden an ${to} (Reply-To ${d.email}):\n${mail.subject}\n${mail.text}`);
    return 'dry-run';
  }

  const err = new Error('Kein Mailversand konfiguriert (SMTP_USER/SMTP_PASS oder RESEND_API_KEY fehlen).');
  err.code = 'NOT_CONFIGURED';
  throw err;
}

const json = (status, body) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
const redirect = path => new Response(null, { status: 303, headers: { Location: path } });

export async function POST(request) {
  // Nur Anfragen von der eigenen Website annehmen
  const origin = request.headers.get('origin');
  if (origin) {
    let host = '';
    try { host = new URL(origin).host; } catch {}
    if (!ALLOWED_HOSTS.some(re => re.test(host))) return json(403, { ok: false, error: 'Anfrage nicht erlaubt.' });
  }

  let body;
  try { body = await readBody(request); } catch { return json(400, { ok: false, error: 'Ungültige Anfrage.' }); }
  const { data: raw, html } = body;
  const fail = (status, error, extra = {}) => (html ? redirect('/anfrage-fehlgeschlagen') : json(status, { ok: false, error, ...extra }));

  // Spam-Schutz: verstecktes Feld muss leer bleiben, Formular nicht in < 3 s abgeschickt
  const started = Number(raw._t);
  if (raw._hp || (started && Date.now() - started < 3000)) {
    return html ? redirect('/danke') : json(200, { ok: true });
  }

  const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) return fail(429, 'Zu viele Anfragen in kurzer Zeit. Bitte versuchen Sie es später erneut oder rufen Sie uns an.');

  const { d, errors } = validate(raw);
  if (Object.keys(errors).length) return fail(422, 'Bitte prüfen Sie Ihre Angaben.', { fields: errors });

  try {
    const via = await send(d);
    console.log(`[contact] Anfrage gesendet via ${via}: ${d.leistung}`);
    return html ? redirect('/danke') : json(200, { ok: true });
  } catch (e) {
    console.error('[contact] Versand fehlgeschlagen:', e.code || '', e.message);
    return fail(e.code === 'NOT_CONFIGURED' ? 503 : 502, 'Ihre Anfrage konnte gerade nicht gesendet werden. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an: 0176 71216622.');
  }
}

export function GET() {
  return json(405, { ok: false, error: 'Bitte das Kontaktformular verwenden.' });
}
