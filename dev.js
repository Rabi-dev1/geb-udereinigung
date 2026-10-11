// Lokaler Dev-Server: baut bei Änderungen neu und liefert dist/ mit "sauberen" URLs aus (wie Vercel).
import http from 'node:http';
import { watch } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, dirname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from './build.js';

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, 'dist');
const port = Number(process.env.PORT) || 4180;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };

const isFile = async p => (await stat(p).catch(() => null))?.isFile();

async function resolve(url) {
  const p = normalize(decodeURIComponent(url.split('?')[0])).replace(/^([\\/])+/, '');
  for (const c of [p, `${p}.html`, join(p, 'index.html')]) {
    const f = join(dist, c);
    if (f.startsWith(dist) && await isFile(f)) return f;
  }
  return null;
}

await build();
let timer;
for (const dir of ['src', 'public']) {
  watch(join(root, dir), { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(() => build().catch(e => console.error(e)), 120);
  });
}

http.createServer(async (req, res) => {
  const f = await resolve(req.url);
  const status = f ? 200 : 404;
  const file = f || join(dist, '404.html');
  res.writeHead(status, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  res.end(await readFile(file));
}).listen(port, () => console.log(`→ http://localhost:${port}`));
