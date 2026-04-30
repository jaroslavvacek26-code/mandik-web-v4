import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Žádné importy z next-intl – ten balíček používá __dirname
// a padá na Vercel Edge Runtime
const locales = ["cs", "en", "de", "uk"] as const;
const defaultLocale = "cs";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Pokud URL už obsahuje locale prefix, nech projít
  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Jinak přesměruj na výchozí locale
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Spouštět middleware na všech cestách kromě:
  // - /api/*
  // - /_next/*
  // - /_vercel/*
  // - statické soubory s příponou
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
