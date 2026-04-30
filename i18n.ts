import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

const messageLoaders = {
  cs: () => import("./messages/cs.json"),
  en: () => import("./messages/en.json"),
  de: () => import("./messages/de.json"),
  uk: () => import("./messages/uk.json"),
} as const;

export default getRequestConfig(async ({ locale }) => {
  const validLocale = routing.locales.includes(locale as (typeof routing.locales)[number])
    ? (locale as keyof typeof messageLoaders)
    : "cs";

  const messages = (await messageLoaders[validLocale]()).default;

  return { locale: validLocale, messages };
});
