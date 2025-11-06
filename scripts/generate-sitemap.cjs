#!/usr/bin/env node

/**
 * Sitemap Generator
 * Generates a complete sitemap.xml including all static routes and markdown pages
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://serre.lab.brown.edu';
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');
const MARKDOWN_DIR = path.join(__dirname, '../src/markdown-pages');

// Main static routes
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/research', priority: '0.9', changefreq: 'monthly' },
  { path: '/publications', priority: '0.9', changefreq: 'monthly' },
  { path: '/people', priority: '0.8', changefreq: 'monthly' },
  { path: '/resources', priority: '0.7', changefreq: 'monthly' },
  { path: '/sci-comm', priority: '0.7', changefreq: 'monthly' },
];

/**
 * Recursively find all markdown files
 */
function findMarkdownFiles(dir, basePath = '') {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = basePath ? `${basePath}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      files.push(...findMarkdownFiles(fullPath, relativePath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      // Remove .md extension and add to files
      const routePath = relativePath.replace(/\.md$/, '');
      files.push(`/${routePath}`);
    }
  }

  return files;
}

/**
 * Generate sitemap XML
 */
function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  
  // Get all markdown routes
  const markdownRoutes = findMarkdownFiles(MARKDOWN_DIR);
  
  // Combine all routes
  const allRoutes = [
    ...staticRoutes,
    ...markdownRoutes.map(path => ({
      path,
      priority: '0.6',
      changefreq: 'monthly'
    }))
  ];

  // Generate XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const route of allRoutes) {
    const url = route.path === '/' 
      ? `${BASE_URL}/` 
      : `${BASE_URL}#${route.path}`;
    
    const priority = route.priority || '0.6';
    const changefreq = route.changefreq || 'monthly';

    xml += '  <url>\n';
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';

  return xml;
}

// Main execution
try {
  console.log('Generating sitemap...');
  const sitemap = generateSitemap();
  
  fs.writeFileSync(SITEMAP_PATH, sitemap, 'utf8');
  
  // Count URLs
  const urlCount = (sitemap.match(/<url>/g) || []).length;
  console.log(`✅ Sitemap generated successfully!`);
  console.log(`   Location: ${SITEMAP_PATH}`);
  console.log(`   Total URLs: ${urlCount}`);
  console.log(`   Base URL: ${BASE_URL}`);
} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}

