import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

const messageLoaders = {
  cs: () => import("./messages/cs.json"),
  en: () => import("./messages/en.json"),
  de: () => import("./messages/de.json"),
  uk: () => import("./messages/uk.json"),
} as const;

export default getRequestConfig(async ({ requestLocale }) => {
  // requestLocale je Promise<string> v next-intl v3.22+
  let locale = await requestLocale;

  // Fallback na cs pokud locale není platný
  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  const validLocale = locale as keyof typeof messageLoaders;
  const messages = (await messageLoaders[validLocale]()).default;

  return { locale: validLocale, messages };
});
