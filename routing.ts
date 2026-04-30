export const locales = ["cs", "en", "de", "uk"] as const;
export const defaultLocale = "cs";

export const routing = {
  locales,
  defaultLocale,
  localePrefix: "always" as const,
};

export type Locale = (typeof locales)[number];
