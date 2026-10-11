// Erzeugt die statische Website in dist/ – ohne externe Abhängigkeiten.
import { rm, mkdir, cp, writeFile, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, 'dist');

export async function build() {
  // Module bei jedem Build frisch laden (wichtig für den Dev-Server)
  const bust = `?t=${Date.now()}`;
  const { pages } = await import(pathToFileURL(join(root, 'src/pages.js')) + bust);
  const { layout } = await import(pathToFileURL(join(root, 'src/layout.js')) + bust);
  const { company } = await import(pathToFileURL(join(root, 'src/data.js')) + bust);

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
    await writeFile(file, layout({ ...p, v: hash }));
  }

  const site = company.siteUrl.replace(/\/$/, '');
  await writeFile(join(out, 'robots.txt'), `User-agent: *\nAllow: /\n${site ? `Sitemap: ${site}/sitemap.xml\n` : ''}`);
  if (site) {
    const urls = list.filter(p => !p.noindex).map(p => `  <url><loc>${site}${p.path === '/' ? '/' : p.path}</loc></url>`).join('\n');
    await writeFile(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  }

  // Hinweis auf noch offene Platzhalter
  const open = Object.entries(company).filter(([, v]) => typeof v === 'string' && /\[.*\]|example\.|0000/.test(v)).map(([k]) => k);
  console.log(`✓ ${list.length} Seiten gebaut → dist/`);
  if (open.length) console.log(`⚠ Platzhalter in src/data.js: ${open.join(', ')}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) build().catch(e => { console.error(e); process.exit(1); });
