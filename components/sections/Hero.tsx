"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "@/lib/i18n-client";

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Video na pozadí */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/hero.webm"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />

      {/* Tmavý overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Obsah */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="font-eurostile text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wide mb-4 text-balance">
          {t("motto")}
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl text-white/80 mb-10 text-balance">
          {t("description")}
        </p>

        {/* CTA tlačítka */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={`/${locale}/vyroba`}
            className="px-8 py-3 bg-brand-green text-white font-semibold rounded hover:bg-green-500 transition-colors"
          >
            {t("ctaProducts")}
          </Link>
          <Link
            href={`/${locale}/spolecnost/o-nas`}
            className="px-8 py-3 border-2 border-white text-white font-semibold rounded hover:bg-white hover:text-brand-blue transition-colors"
          >
            {t("ctaCompany")}
          </Link>
        </div>
      </div>

      {/* Scroll indikátor */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
