import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Sitenizde zaten bir astro.config.mjs (ve varsa adapter) varsa sadece
// `site` ve `integrations: [sitemap()]` satırlarını kendi dosyanıza ekleyin.
export default defineConfig({
  site: 'https://www.promptvibehq.com',
  integrations: [sitemap()],
  trailingSlash: 'ignore',
});
