#!/usr/bin/env node

/**
 * Sitemap for the hash-routed lab site.
 *
 * The app uses createHashRouter, so in-app pages are fragments on the site
 * origin (https://serre.lab.brown.edu/#/research). Many crawlers ignore
 * fragments. This file records those routes and does not invent server paths.
 * Standalone HTML files in public/ are real URLs and are listed without a hash.
 *
 * lastmod is omitted: the repo has no per-page modification source.
 * joining-the-lab is reachable by direct link and is deliberately unlisted.
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://serre.lab.brown.edu';
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');
const MARKDOWN_DIR = path.join(__dirname, '../src/markdown-pages');
const PUBLIC_DIR = path.join(__dirname, '../public');

// Same static children registered in src/App.tsx.
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/research', priority: '0.9', changefreq: 'monthly' },
  { path: '/publications', priority: '0.9', changefreq: 'monthly' },
  { path: '/people', priority: '0.8', changefreq: 'monthly' },
  { path: '/resources', priority: '0.7', changefreq: 'monthly' },
  { path: '/sci-comm', priority: '0.7', changefreq: 'monthly' },
];

// Reachable, but kept out of the sitemap.
const UNLISTED_ROUTES = new Set(['/resources/joining-the-lab']);

// Real files served from public/, linked as document paths (not hash routes).
const STANDALONE_PAGES = [
  '/hmdb51.html',
  '/breakfast-actions-dataset.html',
];

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Markdown routes match loadMarkdownFiles: every .md file under
 * src/markdown-pages becomes /<relative path without .md>.
 */
function findMarkdownRoutes(dir, basePath = '') {
  if (!fs.existsSync(dir)) {
    throw new Error(`Markdown directory not found: ${dir}`);
  }

  const routes = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = basePath ? `${basePath}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      routes.push(...findMarkdownRoutes(fullPath, relativePath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      routes.push(`/${relativePath.replace(/\.md$/, '')}`);
    }
  }

  return routes;
}

function hashLoc(routePath) {
  if (routePath === '/') return `${BASE_URL}/`;
  return `${BASE_URL}/#${routePath}`;
}

function generateSitemap() {
  const markdownRoutes = findMarkdownRoutes(MARKDOWN_DIR)
    .filter((route) => !UNLISTED_ROUTES.has(route))
    .sort();

  for (const page of STANDALONE_PAGES) {
    const filePath = path.join(PUBLIC_DIR, page);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Standalone page is missing: ${filePath}`);
    }
  }

  const entries = [
    ...staticRoutes.map((route) => ({
      loc: hashLoc(route.path),
      priority: route.priority,
      changefreq: route.changefreq,
    })),
    ...markdownRoutes.map((routePath) => ({
      loc: hashLoc(routePath),
      priority: '0.6',
      changefreq: 'monthly',
    })),
    ...STANDALONE_PAGES.map((page) => ({
      loc: `${BASE_URL}${page}`,
      priority: '0.6',
      changefreq: 'monthly',
    })),
  ];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const entry of entries) {
    xml += '  <url>\n';
    xml += `    <loc>${escapeXml(entry.loc)}</loc>\n`;
    xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    xml += `    <priority>${entry.priority}</priority>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';
  return xml;
}

try {
  console.log('Generating sitemap...');
  const sitemap = generateSitemap();
  fs.writeFileSync(SITEMAP_PATH, sitemap, 'utf8');

  const urlCount = (sitemap.match(/<url>/g) || []).length;
  console.log('Sitemap generated.');
  console.log(`   Location: ${SITEMAP_PATH}`);
  console.log(`   Total URLs: ${urlCount}`);
  console.log(`   Base URL: ${BASE_URL}`);
} catch (error) {
  console.error('Error generating sitemap:', error);
  process.exit(1);
}
