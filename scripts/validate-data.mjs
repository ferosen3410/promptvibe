// İçerik verisini kontrol eder: benzersiz slug, geçerli kategori, boş alan, sayfa uzunluğu.
import { categories, prompts, readMinutes } from '../src/data/prompts.ts';

const errors = [];
const slugs = new Set();
const catSlugs = new Set(categories.map((c) => c.slug));

for (const p of prompts) {
  if (slugs.has(p.slug)) errors.push(`Yinelenen slug: ${p.slug}`);
  slugs.add(p.slug);
  if (!catSlugs.has(p.category)) errors.push(`${p.slug}: geçersiz kategori ${p.category}`);
  if (!/^[a-z0-9-]+$/.test(p.slug)) errors.push(`${p.slug}: slug sadece küçük harf, rakam ve tire içermeli`);
  if (p.metaTitle.length > 70) errors.push(`${p.slug}: metaTitle ${p.metaTitle.length} karakter (en fazla ~60-70)`);
  if (p.summary.length > 170) errors.push(`${p.slug}: summary ${p.summary.length} karakter (meta description için kısaltın)`);
  for (const key of ['intro', 'steps', 'variables', 'variations', 'mistakes', 'faq']) {
    if (!Array.isArray(p[key]) || p[key].length === 0) errors.push(`${p.slug}: ${key} boş`);
  }
  if (!p.example.input.trim() || !p.example.output.trim()) errors.push(`${p.slug}: örnek eksik`);
  // Prompt'taki {DEĞİŞKEN} yer tutucuları variables tablosunda var mı?
  const used = new Set(p.prompt.match(/\{[A-Z_]+\}/g) ?? []);
  const declared = new Set(p.variables.map((v) => v.name));
  for (const u of used) if (!declared.has(u)) errors.push(`${p.slug}: prompt'ta ${u} var ama variables tablosunda yok`);
  for (const d of declared) if (!used.has(d)) errors.push(`${p.slug}: variables'ta ${d} var ama prompt'ta kullanılmıyor`);
}

for (const c of categories) {
  if (!prompts.some((p) => p.category === c.slug)) errors.push(`Kategori boş: ${c.slug}`);
}

console.log('slug | kategori | okuma süresi');
for (const p of prompts) console.log(`${p.slug} | ${p.category} | ${readMinutes(p)} dk`);

if (errors.length) {
  console.log(`\n${errors.length} sorun:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`\nOK: ${prompts.length} prompt, ${categories.length} kategori.`);
