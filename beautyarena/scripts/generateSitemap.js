import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://beautyarena.ro';
const projectRoot = path.resolve(process.cwd());
const productsPath = path.join(projectRoot, 'public', 'data', 'products.json');
const sitemapPath = path.join(projectRoot, 'public', 'sitemap.xml');

const staticRoutes = [
  '/',
  '/shop',
  '/servicii',
  '/programare',
  '/despre',
  '/contact',
  '/politica-de-livrare',
  '/politica-de-confidentialitate',
  '/termeni-si-conditii',
  '/regulament-giveaway-valentines-day',
];

const formatDate = (date = new Date()) => date.toISOString().split('T')[0];

const makeUrlNode = (route, { priority, changefreq, lastmod }) => `
  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

const ensureUnique = (arr) => [...new Set(arr.filter(Boolean))];

const buildSitemap = () => {
  const today = formatDate();

  const productsRaw = fs.readFileSync(productsPath, 'utf8');
  const products = JSON.parse(productsRaw);

  const productRoutes = ensureUnique(products.map((product) => (product?.slug ? `/product/${product.slug}` : null)));

  const nodes = [
    ...staticRoutes.map((route) =>
      makeUrlNode(route, {
        priority: route === '/' ? '1.0' : route === '/shop' ? '0.95' : '0.75',
        changefreq: route === '/shop' ? 'daily' : 'weekly',
        lastmod: today,
      })
    ),
    ...productRoutes.map((route) =>
      makeUrlNode(route, {
        priority: '0.80',
        changefreq: 'weekly',
        lastmod: today,
      })
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${nodes.join('')}
</urlset>
`;

  fs.writeFileSync(sitemapPath, xml, 'utf8');

  console.log(`[sitemap] Generated ${nodes.length} URLs at public/sitemap.xml`);
};

buildSitemap();

