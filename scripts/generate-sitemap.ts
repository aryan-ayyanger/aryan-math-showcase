// Generates dist/sitemap.xml automatically from the central articles data source.
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Dynamic import so tsx resolves the TypeScript source directly.
const { articles } = await import('../src/data/articles.ts');

const SITE = 'https://www.aryanayyanger.com';

// lastmod/changefreq/priority are omitted — Google largely ignores them
// and a build-date lastmod on every page is misleading.
const staticUrls = [
  `${SITE}/`,
  `${SITE}/articles`,
  `${SITE}/practice`,
  `${SITE}/about`,
  `${SITE}/contact`,
];

const articleUrls = articles
  .filter((a) => a.indexable)
  .flatMap((a) => [
    `${SITE}/articles/${a.slug}`,
    `${SITE}${a.pdfPath}`,
  ]);

const allUrls = [...staticUrls, ...articleUrls];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map((url) => `  <url>\n    <loc>${url}</loc>\n  </url>`).join('\n')}
</urlset>
`;

const outPath = resolve(__dirname, '../dist/sitemap.xml');
writeFileSync(outPath, xml, 'utf-8');
console.log(`sitemap.xml written — ${allUrls.length} URLs`);

