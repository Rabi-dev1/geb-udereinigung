// Erzeugt die statische Website in dist/ – ohne externe Abhängigkeiten.
import { rm, mkdir, cp, writeFile, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, 'dist');

export async function build() {
  const { pages } = await import(pathToFileURL(join(root, 'src/pages.js')));
  const { layout } = await import(pathToFileURL(join(root, 'src/layout.js')));
  const { company } = await import(pathToFileURL(join(root, 'src/data.js')));

  await rm(out, { recursive: true, force: true });
  await cp(join(root, 'public'), out, { recursive: true });

  const hash = createHash('sha1')
    .update(await readFile(join(out, 'assets/site.css')))
    .update(await readFile(join(out, 'assets/site.js')))
    .digest('hex').slice(0, 8);

  const list = pages();
  for (const p of list) {
    const file = join(out, p.file);
    await mkdir(dirname(file), { recursive: true });
    p.html = layout({ ...p, v: hash });
    await writeFile(file, p.html);
  }

  const site = company.siteUrl.replace(/\/$/, '');
  const today = new Date().toISOString().slice(0, 10);
  await writeFile(join(out, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${site}/sitemap.xml\n`);
  const urls = list.filter(p => !p.noindex).map(p => {
    const prio = p.path === '/' ? '1.0' : p.path.startsWith('/leistungen') ? '0.8' : '0.6';
    return `  <url><loc>${site}${p.path}</loc><lastmod>${today}</lastmod><priority>${prio}</priority></url>`;
  }).join('\n');
  await writeFile(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);

  await writeFile(join(out, 'site.webmanifest'), JSON.stringify({
    name: company.legalName, short_name: company.name, lang: 'de', start_url: '/', display: 'browser',
    theme_color: '#0b3a78', background_color: '#ffffff',
    icons: [{ src: '/assets/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/assets/icon-512.png', sizes: '512x512', type: 'image/png' }],
  }, null, 2));

  // favicon.ico mit eingebettetem PNG (von allen Browsern unterstützt)
  const png = await readFile(join(out, 'assets/favicon-48.png'));
  const ico = Buffer.alloc(22);
  ico.writeUInt16LE(0, 0); ico.writeUInt16LE(1, 2); ico.writeUInt16LE(1, 4);
  ico.writeUInt8(48, 6); ico.writeUInt8(48, 7); ico.writeUInt16LE(1, 10); ico.writeUInt16LE(32, 12);
  ico.writeUInt32LE(png.length, 14); ico.writeUInt32LE(22, 18);
  await writeFile(join(out, 'favicon.ico'), Buffer.concat([ico, png]));

  console.log(`✓ ${list.length} Seiten gebaut → dist/`);
  audit(list);

  // Hinweis auf noch offene Platzhalter
  const open = Object.entries(company).filter(([, v]) => typeof v === 'string' && /\[.*\]|example\.|0000/.test(v)).map(([k]) => k);
  if (open.length) console.log(`⚠ Platzhalter in src/data.js: ${open.join(', ')}`);
}

// Kleiner SEO-/Qualitäts-Check über alle erzeugten Seiten
function audit(list) {
  const warn = [];
  const titles = new Map();
  const paths = new Set(list.map(p => p.path));
  for (const p of list) {
    const html = p.html;
    const t = (html.match(/<title>(.*?)<\/title>/) || [])[1] || '';
    const d = (html.match(/<meta name="description" content="(.*?)">/) || [])[1] || '';
    const len = s => s.replace(/&amp;/g, '&').length;
    if (!p.noindex) {
      if (len(t) > 62) warn.push(`${p.path}: Titel zu lang (${len(t)})`);
      if (len(d) < 70 || len(d) > 160) warn.push(`${p.path}: Beschreibung ${len(d)} Zeichen`);
      if (titles.has(t)) warn.push(`${p.path}: doppelter Titel wie ${titles.get(t)}`);
      titles.set(t, p.path);
    }
    const h1 = (html.match(/<h1[\s>]/g) || []).length;
    if (h1 !== 1) warn.push(`${p.path}: ${h1}× <h1>`);
    for (const img of html.match(/<img [^>]*>/g) || []) if (!/ alt="/.test(img)) warn.push(`${p.path}: Bild ohne alt`);
    for (const [, href] of html.matchAll(/href="(\/[^"#?]*)/g)) {
      if (!href.startsWith('/assets') && !/\.\w+$/.test(href) && !paths.has(href)) warn.push(`${p.path}: toter Link ${href}`);
    }
    for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
      try { JSON.parse(m[1]); } catch { warn.push(`${p.path}: ungültiges JSON-LD`); }
    }
  }
  console.log(warn.length ? `⚠ SEO-Check:\n  ${[...new Set(warn)].join('\n  ')}` : '✓ SEO-Check ohne Befund');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) build().catch(e => { console.error(e); process.exit(1); });
