export const dynamic = "force-dynamic";

import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/ui/CookieBanner";
import { routing } from "@/routing";
import { fetchPortfolio } from "@/lib/api";

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

  // Nastav locale pro všechny server komponenty bez next-intl middleware
  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  // Kategorie pro dropdown "Výrobky" v headeru
  const categories = await fetchPortfolio(locale).catch(() => []);
  const navCategories = categories.map((c) => ({ name: c.name, slug: c.slug }));

  return (
    <NextIntlClientProvider messages={messages}>
      <Header categories={navCategories} />
      <div className="pt-16 flex-1 flex flex-col">
        {children}
      </div>
      <Footer categories={navCategories} />
      <CookieBanner />
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
