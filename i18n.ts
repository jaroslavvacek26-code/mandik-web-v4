import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  if (!hasLocale(routing.locales, locale)) {
    // Fallback na výchozí jazyk
    const fallback = routing.defaultLocale;
    return {
      locale: fallback,
      messages: (await import(`./messages/${fallback}.json`)).default,
    };
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
