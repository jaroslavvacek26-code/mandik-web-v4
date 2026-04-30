"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "@/lib/i18n-client";

const locales = [
  { code: "cs", label: "CZ", flagSrc: "https://flagcdn.com/w20/cz.png" },
  { code: "en", label: "EN", flagSrc: "https://flagcdn.com/w20/gb.png" },
  { code: "de", label: "DE", flagSrc: "https://flagcdn.com/w20/de.png" },
  { code: "uk", label: "UK", flagSrc: "https://flagcdn.com/w20/ua.png" },
] as const;

function LangSwitcher({ onSelect }: { onSelect?: () => void }) {
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [translated, setTranslated] = useState<Record<string, string> | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const current = locales.find((l) => l.code === locale) ?? locales[0];

  // Fallback: nahradí jen první segment. Pro stránky jako /vyroba/[category]/[group],
  // kde se slug liší jazykem, fetchujeme přesný překlad z API níže.
  function fallbackHref(code: string) {
    const segments = pathname.split("/");
    segments[1] = code;
    return segments.join("/");
  }

  function localizedHref(code: string) {
    return translated?.[code] ?? fallbackHref(code);
  }

  // Při změně cesty si stáhneme překlady (API vrátí mapu kód → URL).
  // Volá se jen jednou pro danou pathname.
  useEffect(() => {
    let cancelled = false;
    setTranslated(null);
    fetch(`/api/translate-path?path=${encodeURIComponent(pathname)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data) setTranslated(data);
      })
      .catch(() => { /* zůstaneme na fallback */ });
    return () => { cancelled = true; };
  }, [pathname]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-gray-200 hover:border-brand-green transition-colors text-sm font-medium text-brand-blue hover:text-brand-green"
        aria-label="Vybrat jazyk"
      >
        
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={current.flagSrc} alt={current.label} width={20} height={14} className="rounded-sm" />
        <span>{current.label}</span>
        <svg className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul className="absolute top-full right-0 mt-1 bg-white shadow-lg rounded border border-gray-100 py-1 min-w-[7rem] z-50">
          {locales.map(({ code, label, flagSrc }) => (
            <li key={code}>
              <Link
                href={localizedHref(code)}
                onClick={() => { setOpen(false); onSelect?.(); }}
                className={`flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                  locale === code ? "text-brand-green font-semibold" : "text-brand-blue hover:text-brand-green"
                }`}
              >
                
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={flagSrc} alt={label} width={20} height={14} className="rounded-sm" />
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export interface NavCategory {
  name: string;
  slug: string;
}

export default function Header({ categories = [] }: { categories?: NavCategory[] }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [companyOpen, setCompanyOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const companyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const productsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeAll = () => {
    setCompanyOpen(false);
    setProductsOpen(false);
    setMobileOpen(false);
    setMobileCompanyOpen(false);
    setMobileProductsOpen(false);
  };

  // Desktop hover handlers s malým zpožděním při odchodu myši
  const companyEnter = () => { if (companyTimer.current) clearTimeout(companyTimer.current); setCompanyOpen(true); setProductsOpen(false); };
  const companyLeave = () => { companyTimer.current = setTimeout(() => setCompanyOpen(false), 150); };
  const productsEnter = () => { if (productsTimer.current) clearTimeout(productsTimer.current); setProductsOpen(true); setCompanyOpen(false); };
  const productsLeave = () => { productsTimer.current = setTimeout(() => setProductsOpen(false), 150); };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20 sm:h-24">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center shrink-0" onClick={closeAll}>
          <Image
            src="/logos/mandik-logo-gray.webp"
            alt="MANDÍK"
            width={180}
            height={54}
            className="h-16 w-auto sm:h-[72px]"
            priority
          />
        </Link>

        {/* Desktop navigace */}
        <ul className="hidden md:flex items-center gap-5 lg:gap-6 text-lg xl:text-xl font-medium text-brand-blue">
          {/* Naše společnost */}
          <li className="relative" onMouseEnter={companyEnter} onMouseLeave={companyLeave}>
            <span className="flex items-center gap-1 hover:text-brand-green transition-colors py-5 cursor-default">
              {t("company")}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
            {companyOpen && (
              <ul className="absolute top-full left-0 bg-white shadow-lg rounded min-w-64 py-1 border border-gray-100">
                <li><Link href={`/${locale}/spolecnost/o-nas`} className="block px-4 py-2.5 hover:bg-gray-50 hover:text-brand-green text-base" onClick={closeAll}>{t("about")}</Link></li>
                <li><Link href={`/${locale}/spolecnost/reference`} className="block px-4 py-2.5 hover:bg-gray-50 hover:text-brand-green text-base" onClick={closeAll}>{t("references")}</Link></li>
                <li><Link href={`/${locale}/spolecnost/novinky`} className="block px-4 py-2.5 hover:bg-gray-50 hover:text-brand-green text-base" onClick={closeAll}>{t("news")}</Link></li>
                <li><Link href={`/${locale}/spolecnost/kariera`} className="block px-4 py-2.5 hover:bg-gray-50 hover:text-brand-green text-base" onClick={closeAll}>{t("careers")}</Link></li>
                <li><Link href={`/${locale}/spolecnost/certifikaty`} className="block px-4 py-2.5 hover:bg-gray-50 hover:text-brand-green text-base" onClick={closeAll}>{t("certificates")}</Link></li>
                <li>
                  <a href="https://my.matterport.com/show/?m=MW8NFZmbZoo" target="_blank" rel="noopener noreferrer"
                    className="block px-4 py-2.5 hover:bg-gray-50 hover:text-brand-green text-base" onClick={closeAll}>
                    {t("virtualShowroom")}
                  </a>
                </li>
              </ul>
            )}
          </li>

          {/* Výrobky – dropdown s kategoriemi z portfolia */}
          <li className="relative" onMouseEnter={productsEnter} onMouseLeave={productsLeave}>
            <span className="flex items-center gap-1 hover:text-brand-green transition-colors py-5 cursor-default">
              {t("products")}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
            {productsOpen && categories.length > 0 && (
              <ul className="absolute top-full left-0 bg-white shadow-lg rounded min-w-64 py-1 border border-gray-100">
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/${locale}/vyroba/${cat.slug}`}
                      className="block px-4 py-2.5 hover:bg-gray-50 hover:text-brand-green text-base"
                      onClick={closeAll}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <Link href={`/${locale}/servis`} className="hover:text-brand-green transition-colors py-5" onClick={closeAll}>
              {t("service")}
            </Link>
          </li>

          {/* Ke stažení */}
          <li>
            <Link href={`/${locale}/ke-stazeni`} className="hover:text-brand-green transition-colors py-5" onClick={closeAll}>
              {t("downloads")}
            </Link>
          </li>

          <li>
            <Link href={`/${locale}/kontakt`} className="hover:text-brand-green transition-colors py-5" onClick={closeAll}>
              {t("contact")}
            </Link>
          </li>
        </ul>

        {/* Přepínač jazyků (desktop) */}
        <div className="hidden md:block">
          <LangSwitcher />
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="md:hidden p-2 text-brand-blue hover:text-brand-green transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <ul className="flex flex-col text-sm font-medium text-brand-blue">
            <li className="border-b border-gray-50">
              <button className="w-full text-left px-4 py-3 flex justify-between items-center hover:text-brand-green"
                onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}>
                {t("company")}
                <svg className={`w-3 h-3 transition-transform ${mobileCompanyOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileCompanyOpen && (
                <ul className="bg-gray-50 px-4 pb-2">
                  <li><Link href={`/${locale}/spolecnost/o-nas`} className="block py-2 hover:text-brand-green" onClick={closeAll}>{t("about")}</Link></li>
                  <li><Link href={`/${locale}/spolecnost/reference`} className="block py-2 hover:text-brand-green" onClick={closeAll}>{t("references")}</Link></li>
                  <li><Link href={`/${locale}/spolecnost/novinky`} className="block py-2 hover:text-brand-green" onClick={closeAll}>{t("news")}</Link></li>
                  <li><Link href={`/${locale}/spolecnost/kariera`} className="block py-2 hover:text-brand-green" onClick={closeAll}>{t("careers")}</Link></li>
                  <li><Link href={`/${locale}/spolecnost/certifikaty`} className="block py-2 hover:text-brand-green" onClick={closeAll}>{t("certificates")}</Link></li>
                  <li><a href="https://my.matterport.com/show/?m=MW8NFZmbZoo" target="_blank" rel="noopener noreferrer" className="block py-2 hover:text-brand-green" onClick={closeAll}>{t("virtualShowroom")}</a></li>
                </ul>
              )}
            </li>
            <li className="border-b border-gray-50">
              <button className="w-full text-left px-4 py-3 flex justify-between items-center hover:text-brand-green"
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}>
                {t("products")}
                <svg className={`w-3 h-3 transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileProductsOpen && categories.length > 0 && (
                <ul className="bg-gray-50 px-4 pb-2">
                  {categories.map((cat) => (
                    <li key={cat.slug}>
                      <Link href={`/${locale}/vyroba/${cat.slug}`} className="block py-2 hover:text-brand-green" onClick={closeAll}>
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li className="border-b border-gray-50"><Link href={`/${locale}/servis`} className="block px-4 py-3 hover:text-brand-green" onClick={closeAll}>{t("service")}</Link></li>
            <li className="border-b border-gray-50"><Link href={`/${locale}/ke-stazeni`} className="block px-4 py-3 hover:text-brand-green" onClick={closeAll}>{t("downloads")}</Link></li>
            <li className="border-b border-gray-50"><Link href={`/${locale}/kontakt`} className="block px-4 py-3 hover:text-brand-green" onClick={closeAll}>{t("contact")}</Link></li>
            {/* Jazyky (mobile) */}
            <li className="px-4 py-3">
              <LangSwitcher onSelect={closeAll} />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
