// Yayına çıkmadan önce: "[EDIT: ...]" ile işaretli, doldurulmamış alan kaldı mı?
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../src/', import.meta.url).pathname;
const hits = [];

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(astro|ts|md|css)$/.test(entry.name)) {
      readFileSync(full, 'utf8')
        .split('\n')
        .forEach((line, i) => {
          if (line.includes('[EDIT')) hits.push(`${full.replace(root, 'src/')}:${i + 1}  ${line.trim().slice(0, 90)}`);
        });
    }
  }
}

walk(root);

if (hits.length) {
  console.log(`Doldurulmamış ${hits.length} alan var:\n`);
  console.log(hits.join('\n'));
  process.exit(1);
}
console.log('Tüm [EDIT] alanları doldurulmuş.');
