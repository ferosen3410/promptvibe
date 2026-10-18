# Kurulum (5 dakika)

> Başlamadan önce mevcut projenizi `git commit` ile kaydedin. Aşağıdaki dosyalar
> `about`, `contact`, `privacy`, `index`, `prompts` ve `prompt/[slug]` sayfalarınızın üzerine yazar.

## 1. Dosyaları kopyalayın

Bu paketteki şu klasörleri kendi `promptvibe` projenize kopyalayıp üzerine yazın:

- `src/` (data, components, layouts, pages, styles)
- `public/` (favicon.svg, robots.txt)
- `scripts/`

## 2. Eski dosyaları silin

- `src/pages/[slug].astro` → kök dizindeki dinamik sayfa yeni yapıyla çakışır
- `src/pages/prompt-detail.astro` → artık `prompt/[slug].astro` kullanılıyor

(Yeni gelenler: `terms.astro`, `404.astro`, `category/[slug].astro`.)

## 3. Sitemap ekleyin

```
npm install @astrojs/sitemap
```

`astro.config.mjs` içine şunları ekleyin (paketteki dosya örnektir, kendi adapter
ayarınız varsa onu koruyun):

```js
import sitemap from '@astrojs/sitemap';
export default defineConfig({
  site: 'https://www.promptvibehq.com',
  integrations: [sitemap()],
});
```

## 4. Kendi bilgilerinizi girin

`src/data/site.ts` içindeki `author` bölümünü doldurun, ardından kontrol edin:

```
npm run check:placeholders
```

Hakkında sayfasındaki "How a prompt page is built" bölümü gerçek sürecinizi
anlatmalı. Yazılanlar doğru değilse (ör. modellerde deneme yapmadıysanız) önce
gerçekten yapın ya da metni değiştirin.

## 5. Çalıştırın

```
npm run dev      # yerelde bakın
npm run build    # yayın öncesi hata var mı kontrol edin
```

## 6. İçerik eklemek

`src/data/prompts.ts` içindeki `prompts` dizisine yeni bir nesne ekleyin. Sayfa,
kategori listesi, sitemap ve kapak görseli otomatik oluşur. `node scripts/validate-data.mjs`
alanları ve `{DEĞİŞKEN}` tutarlılığını kontrol eder.

Her sayfadaki örnek çıktılar **gösterim içindir**. Yayınlamadan önce prompt'u
gerçekten çalıştırıp çıkan sonuçla değiştirmeniz sayfayı hem dürüst hem daha değerli yapar.

## AdSense için sonraki adımlar

1. En az 20-30 sayfa içerik olana kadar bekleyin (şu an 9 prompt + sayfalar).
2. Search Console'a `https://www.promptvibehq.com/sitemap-index.xml` adresini gönderin.
3. AdSense'e başvururken verilen kodu `site.ts` içindeki `adsensePublisherId` alanına
   (ör. `ca-pub-1234567890123456`) yazın; kod otomatik olarak `<head>` içine eklenir.
4. Çerez onayı için AdSense'in "Privacy & messaging" bölümünden ücretsiz onay
   mesajı (CMP) oluşturun. AB/Birleşik Krallık trafiği için gereklidir.
5. Onaydan sonra AdSense'in verdiği `ads.txt` dosyasını `public/ads.txt` olarak ekleyin.
6. Gizlilik ve Kullanım Koşulları metinleri şablondur, hukuki tavsiye değildir.

## Görseller

Kapak görselleri `Cover.astro` ile üretilen özgün SVG'lerdir (stok fotoğraf yok,
lisans sorunu yok). Sosyal medya paylaşım görseli (og:image) için ileride PNG
eklemek isterseniz `Layout.astro` içine `og:image` etiketi ekleyebilirsiniz.
