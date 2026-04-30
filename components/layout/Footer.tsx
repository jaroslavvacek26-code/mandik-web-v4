"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "@/lib/i18n-client";

interface NavCategory {
  name: string;
  slug: string;
}

export default function Footer({ categories = [] }: { categories?: NavCategory[] }) {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-blue text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-8 lg:gap-6">

          {/* Logo + popis firmy */}
          <div className="lg:pt-1">
            <Link href={`/${locale}`} className="inline-block -translate-x-7 -translate-y-2">
              <Image
                src="/logos/mandik-logo-white.webp"
                alt="MANDÍK"
                width={220}
                height={65}
                className="h-20 w-auto sm:h-24 -translate-y-5"
              />
            </Link>
            <p className="-mt-9 text-base text-white/80 leading-relaxed max-w-sm">
              {t("description")}
            </p>
          </div>

          {/* Výrobky */}
          <div>
            <h3 className="font-eurostile font-bold text-white mb-4 text-base uppercase tracking-wider">
              {tNav("products")}
            </h3>
            <ul className="space-y-2.5 text-base text-white/80">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/${locale}/vyroba/${cat.slug}`}
                    className="hover:text-brand-green transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Podpora */}
          <div>
            <h3 className="font-eurostile font-bold text-white mb-4 text-base uppercase tracking-wider">
              {t("support")}
            </h3>
            <ul className="space-y-2.5 text-base text-white/80">
              <li>
                <Link href={`/${locale}/kontakt`} className="hover:text-brand-green transition-colors">
                  {t("contactSupport")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/ke-stazeni`} className="hover:text-brand-green transition-colors">
                  {tNav("downloads")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/ke-stazeni`} className="hover:text-brand-green transition-colors">
                  {t("manuals")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Společnost */}
          <div>
            <h3 className="font-eurostile font-bold text-white mb-4 text-base uppercase tracking-wider">
              {tNav("company")}
            </h3>
            <ul className="space-y-2.5 text-base text-white/80">
              <li>
                <Link href={`/${locale}/spolecnost/o-nas`} className="hover:text-brand-green transition-colors">
                  {tNav("about")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/spolecnost/novinky`} className="hover:text-brand-green transition-colors">
                  {t("aktuality")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/spolecnost/kariera`} className="hover:text-brand-green transition-colors">
                  {t("jobOffers")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/spolecnost/za-podpory-eu`} className="hover:text-brand-green transition-colors">
                  {t("euSupport")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/whistleblowing`} className="hover:text-brand-green transition-colors">
                  {t("whistleblowing")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Právní */}
          <div>
            <h3 className="font-eurostile font-bold text-white mb-4 text-base uppercase tracking-wider">
              {t("legal")}
            </h3>
            <ul className="space-y-2.5 text-base text-white/80">
              <li>
                <Link href={`/${locale}/ochrana-osobnich-udaju`} className="hover:text-brand-green transition-colors">
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/cookies`} className="hover:text-brand-green transition-colors">
                  {t("cookies")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Spodní řádek */}
        <div className="border-t border-white/10 mt-12 pt-6 text-xs text-white/60">
          <p>{t("copyright", { year })}</p>
        </div>
      </div>
    </footer>
  );
}
