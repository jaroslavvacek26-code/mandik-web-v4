export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/ui/CookieBanner";
import { I18nProvider } from "@/lib/i18n-client";
import { routing } from "@/routing";
import { fetchPortfolio } from "@/lib/api";

// Explicitní mapa – žádné template literals, žádný __dirname
const messageLoaders = {
  cs: () => import("@/messages/cs.json"),
  en: () => import("@/messages/en.json"),
  de: () => import("@/messages/de.json"),
  uk: () => import("@/messages/uk.json"),
} as const;

export const metadata: Metadata = {
  title: "MANDÍK a.s. – Vzduchotechnika, protipožární prvky, průmyslové vytápění",
  description: "MANDÍK a.s. – český výrobce vzduchotechnických komponentů, protipožárních prvků a průmyslového vytápění. Dodávky do více než 30 zemí světa.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Načti zprávy
  const loader = messageLoaders[locale as keyof typeof messageLoaders] ?? messageLoaders.cs;
  const messages = (await loader()).default;

  const categories = await fetchPortfolio(locale).catch(() => []);
  const navCategories = categories.map((c) => ({ name: c.name, slug: c.slug }));

  return (
    <I18nProvider locale={locale} messages={messages}>
      <Header categories={navCategories} />
      <div className="pt-20 sm:pt-24 flex-1 flex flex-col">
        {children}
      </div>
      <Footer categories={navCategories} />
      <CookieBanner />
    </I18nProvider>
  );
}
