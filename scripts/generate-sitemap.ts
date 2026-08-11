// Generates dist/sitemap.xml automatically from the central articles data source.
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Dynamic import so tsx resolves the TypeScript source directly.
const { articles } = await import('../src/data/articles.ts');

const SITE = 'https://www.aryanayyanger.com';
const today = new Date().toISOString().split('T')[0];

const staticPages = [
  { url: `${SITE}/`,        changefreq: 'monthly',  priority: '1.0' },
  { url: `${SITE}/articles`, changefreq: 'weekly',   priority: '0.9' },
  { url: `${SITE}/about`,   changefreq: 'monthly',  priority: '0.7' },
  { url: `${SITE}/contact`, changefreq: 'yearly',   priority: '0.5' },
];

const articlePages = articles
  .filter((a) => a.indexable)
  .flatMap((a) => [
    { url: `${SITE}/articles/${a.slug}`, changefreq: 'monthly', priority: '0.8' },
    { url: `${SITE}${a.pdfPath}`,        changefreq: 'yearly',  priority: '0.6' },
  ]);

const allPages = [...staticPages, ...articlePages];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (p) => `  <url>
    <loc>${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const outPath = resolve(__dirname, '../dist/sitemap.xml');
writeFileSync(outPath, xml, 'utf-8');
console.log(`sitemap.xml written to ${outPath} (${allPages.length} URLs)`);
