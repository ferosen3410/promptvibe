// Site genelinde kullanılan ayarlar. Köşeli parantez içinde EDIT yazan her yeri
// kendi bilgilerinizle değiştirin. `npm run check:placeholders` eksik kalanları listeler.

export const SITE = {
  name: 'PromptVibe HQ',
  url: 'https://www.promptvibehq.com',
  tagline: 'AI prompts with worked examples, variations and common mistakes',
  description:
    'A free library of AI prompts for ChatGPT, Claude and Midjourney. Every prompt comes with a worked example, variations for different situations and the mistakes that most often ruin the result.',
  email: 'support@promptvibehq.com',
  // AdSense onaylandıktan sonra doldurun, örn. 'ca-pub-1234567890123456'.
  // Başvuru sırasında da aynı snippet'in <head> içinde olması gerekir.
  adsensePublisherId: '',
  // Google Analytics 4 ölçüm kimliği, örn. 'G-XXXXXXXXXX'. Boş bırakırsanız yüklenmez.
  analyticsId: '',
  // Gizlilik ve Kullanım Koşulları sayfalarında gösterilen tarih.
  legalUpdated: 'October 18, 2026',
  author: {
    name: 'Ferdi',
    role: 'software developer',
    country: 'Turkey',
    story:
      '[EDIT: one or two honest sentences on why you started this site, e.g. what problem you kept solving with prompts]',
    models:
      '[EDIT: the AI tools you actually use to check prompts, e.g. ChatGPT, Claude, Midjourney]',
  },
};

export const NAV = [
  { href: '/prompts', label: 'All prompts' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export const FOOTER_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Use' },
];
