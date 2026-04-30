import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "./routing";

// Explicitní mapa importů – webpack je umí staticky analyzovat,
// template literal import by mohl způsobit __dirname error na Vercelu
const messageLoaders = {
  cs: () => import("./messages/cs.json"),
  en: () => import("./messages/en.json"),
  de: () => import("./messages/de.json"),
  uk: () => import("./messages/uk.json"),
} as const;

export default getRequestConfig(async ({ locale }) => {
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const loader = messageLoaders[locale as keyof typeof messageLoaders] ?? messageLoaders.cs;
  const messages = (await loader()).default;

  return { messages };
});
