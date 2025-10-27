# Bilingual Setup with next-intl

This storefront is now configured for bilingual support using `next-intl` with English and French languages.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                 # Root layout with NextIntlClientProvider
│   ├── [locale]/                  # Locale segment (en, fr)
│   │   ├── layout.tsx             # Locale validation layout
│   │   ├── page.tsx               # Redirects to default channel
│   │   └── [channel]/
│   │       ├── layout.tsx         # Channel layout
│   │       └── (main)/
│   │           ├── layout.tsx     # Main layout with Header/Footer
│   │           └── page.tsx       # Home page
├── i18n.ts                        # i18n configuration
└── hooks/
    └── useI18n.ts                 # Hook for translations
middleware.ts                       # Locale detection middleware
messages/
├── en.json                        # English translations
└── fr.json                        # French translations
```

## How to Use Translations

### Server Components

In Server Components, use the `getTranslations()` function:

```tsx
import { getTranslations } from "next-intl";

export default async function Page() {
	const t = await getTranslations("navigation");

	return <h1>{t("home")}</h1>;
}
```

### Client Components

In Client Components, use the `useTranslations()` hook:

```tsx
"use client";

import { useTranslations } from "next-intl";

export function MyComponent() {
	const t = useTranslations("common");

	return <button>{t("addToCart")}</button>;
}
```

## Translation File Structure

Translation files are organized by namespaces in `messages/*.json`:

```json
{
	"navigation": {
		"home": "Home",
		"products": "Products"
	},
	"common": {
		"search": "Search",
		"cart": "Cart"
	},
	"product": {
		"description": "Description",
		"inStock": "In Stock"
	}
}
```

Access translations using dot notation: `navigation.home`, `common.search`, etc.

## URL Structure

- English: `http://localhost:3000/en/default-channel`
- French: `http://localhost:3000/fr/default-channel`

The middleware automatically detects browser language and redirects to the appropriate locale.

## Adding New Languages

1. Add locale to `src/i18n.ts`:

```tsx
const locales = ["en", "fr", "de"] as const;
```

2. Update middleware in `middleware.ts`:

```tsx
export default createMiddleware({
	locales: ["en", "fr", "de"],
	defaultLocale: "en",
});
```

3. Create translation file `messages/de.json` with the same structure.

4. Update `generateStaticParams` in `src/app/[locale]/layout.tsx`.

## Updating Components for i18n

When updating existing components to use translations:

1. Change Server Components to use `getTranslations()`:

```tsx
import { getTranslations } from "next-intl";

export default async function Component() {
	const t = await getTranslations("namespace");
	return <p>{t("key")}</p>;
}
```

2. Mark Client Components with `"use client"` to use `useTranslations()`:

```tsx
"use client";

import { useTranslations } from "next-intl";

export function Component() {
	const t = useTranslations("namespace");
	return <p>{t("key")}</p>;
}
```

## Next Steps

- Update Header and Footer components to accept and use locale
- Add more translation namespaces as needed
- Integrate with product catalog and checkout flows
- Consider adding RTL language support if needed
