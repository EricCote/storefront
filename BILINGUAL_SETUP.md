# Bilingual (next-intl) Setup for Saleor Storefront

## ✅ Setup Complete!

Your storefront has been configured for bilingual support using `next-intl`. Here's what was set up:

## 📁 New Files Created

### Configuration

- **`src/i18n/request.ts`** - Core i18n configuration that loads translation messages
- **`middleware.ts`** - Middleware to handle locale detection and routing (replaces existing middleware)
- **`next.config.js`** - Updated to include NextIntl plugin

### Translations

- **`messages/en.json`** - English translations (sample structure)
- **`messages/fr.json`** - French translations (sample structure)

### Routing Structure

- **`src/app/[locale]/layout.tsx`** - Locale layout for validating locales
- **`src/app/[locale]/page.tsx`** - Redirect to default channel
- **`src/app/[locale]/[channel]/layout.tsx`** - Channel layout with locale support
- **`src/app/[locale]/[channel]/(main)/layout.tsx`** - Main layout
- **`src/app/[locale]/[channel]/(main)/page.tsx`** - Sample page showing locale and channel

### Utilities

- **`src/hooks/useI18n.ts`** - Hook for using translations in Client Components

## 🚀 How to Use

### 1. **In Server Components** (read-only translations):

```tsx
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations();

  return <h1>{t("navigation.home")}</h1>;
}
```

### 2. **In Client Components** (interactive):

```tsx
"use client";

import { useTranslations } from "next-intl";

export function Button() {
  const t = useTranslations();

  return <button>{t("common.addToCart")}</button>;
}
```

### 3. **Access locale in Server Components**:

```tsx
import { getLocale } from "next-intl/server";

export default async function Page() {
  const locale = await getLocale();
  console.log(locale); // "en" or "fr"

  return <div>Current locale: {locale}</div>;
}
```

## 📍 Routing

Your app now uses locale-based routing:

- **English**: `/en/default-channel` → English experience
- **French**: `/fr/default-channel` → French experience
- **Default redirect**: `/` → Detects browser language, falls back to English (`/en`)

## 🌐 URL Structure

```
Old:          /default-channel/...
New:          /[locale]/default-channel/...
Examples:     /en/default-channel/products
              /fr/default-channel/products
```

## ✏️ Adding More Translations

1. Add keys to both `messages/en.json` and `messages/fr.json`
2. Use the exact same key structure in both files
3. No rebuild needed - translations are loaded dynamically

Example:

```json
// messages/en.json
{
  "product": {
    "rating": "Rating"
  }
}

// messages/fr.json
{
  "product": {
    "rating": "Note"
  }
}
```

## 🔧 Adding More Languages

To add a new language (e.g., Spanish):

1. Create `messages/es.json` with all translation keys
2. Update `src/i18n/request.ts` - Change the Locale type:
   ```tsx
   export type Locale = "en" | "fr" | "es";
   ```
3. Update validation logic to include "es"
4. Update `middleware.ts` to include "es" in the locales array:
   ```tsx
   locales: ["en", "fr", "es"],
   ```
5. Update `src/app/[locale]/layout.tsx` to include "es" in generateStaticParams

## ⚙️ Next Steps

### Update Header & Footer Components

The Header and Footer components need to accept the locale. You can:

- Remove the locale prop (already done temporarily)
- Or pass it through if you want locale-specific rendering

### Migrate Existing Routes

The old `[channel]` routes are still in `src/app/[channel]/`. You'll want to:

- Move all routes to `src/app/[locale]/[channel]/`
- Or keep both for backwards compatibility

### Update Links

When creating links, include the locale:

```tsx
import Link from "next/link";
import { useLocale } from "next-intl";

export function ProductLink({ id }) {
  const locale = useLocale();
  return <Link href={`/${locale}/default-channel/products/${id}`}>View</Link>;
}
```

## 📚 Sample Translations Provided

The following translations are already set up:

**navigation:**

- home, products, about, contact

**common:**

- search, cart, account, checkout, addToCart, price, quantity, total

**product:**

- description, details, inStock, outOfStock

Add more as needed in the JSON files!

## 🐛 Troubleshooting

**Build failing?** - The linting warnings about `clsx` imports are pre-existing and not related to i18n setup.

**Translations not showing?** - Make sure you're using the correct key path and that both en.json and fr.json have the same keys.

**Locale not changing?** - The middleware automatically detects the locale from the URL. Visit `/fr/default-channel` to switch to French.

## 📖 Official Documentation

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [next-intl with Next.js App Router](https://next-intl-docs.vercel.app/docs/getting-started/app-router-setup)

---

**Happy translating! 🌍**
