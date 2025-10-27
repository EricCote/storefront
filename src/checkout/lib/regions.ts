export const locales = ["en-US", "fr-CA"] as const;

export const DEFAULT_LOCALE = "en-US";

export type Locale = (typeof locales)[number];
