// Lokaler Dev-Server: baut bei Änderungen neu, liefert dist/ mit "sauberen" URLs aus (wie Vercel)
// und führt die Kontakt-API unter /api/contact aus. Zugangsdaten kommen aus .env.local (nicht im Git).
import http from 'node:http';
import { watch, existsSync, readFileSync } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { join, extname, dirname, normalize } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, 'dist');
const port = Number(process.env.PORT) || 4180;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json' };

// .env.local laden
const envFile = join(root, '.env.local');
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !line.trim().startsWith('#')) process.env[m[1]] ??= m[2].replace(/^(['"])(.*)\1$/, '$2');
  }
}

// Build in eigenem Prozess, damit Änderungen an src/ immer frisch geladen werden
const build = () => new Promise(resolve => spawn(process.execPath, [join(root, 'build.js')], { stdio: 'inherit' }).on('exit', resolve));
await build();
let timer;
for (const dir of ['src', 'public']) {
  watch(join(root, dir), { recursive: true }, () => { clearTimeout(timer); timer = setTimeout(build, 150); });
}

const api = await import(pathToFileURL(join(root, 'api/contact.js')));
const isFile = async p => (await stat(p).catch(() => null))?.isFile();

async function resolve(url) {
  const p = normalize(decodeURIComponent(url.split('?')[0])).replace(/^([\\/])+/, '');
  for (const c of [p, `${p}.html`, join(p, 'index.html')]) {
    const f = join(dist, c);
    if (f.startsWith(dist) && await isFile(f)) return f;
  }
  return null;
}

async function handleApi(req, res) {
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const request = new Request(`http://${req.headers.host}${req.url}`, {
    method: req.method, headers: { ...req.headers, 'x-forwarded-for': req.socket.remoteAddress },
    body: ['GET', 'HEAD'].includes(req.method) ? undefined : Buffer.concat(chunks),
  });
  const handler = api[req.method] || (() => new Response('Method Not Allowed', { status: 405 }));
  const response = await handler(request);
  res.writeHead(response.status, Object.fromEntries(response.headers));
  res.end(Buffer.from(await response.arrayBuffer()));
}

http.createServer(async (req, res) => {
  try {
    if (req.url.split('?')[0] === '/api/contact') return await handleApi(req, res);
    const f = await resolve(req.url);
    const file = f || join(dist, '404.html');
    res.writeHead(f ? 200 : 404, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(await readFile(file));
  } catch (e) {
    console.error(e);
    res.writeHead(500).end('Serverfehler');
  }
}).listen(port, () => console.log(`→ http://localhost:${port}`));
