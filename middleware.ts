import { NextRequest, NextResponse } from "next/server";

const locales = ["cs", "en", "de", "uk"];
const defaultLocale = "cs";

function getLocaleFromRequest(request: NextRequest): string {
  // Zkus Accept-Language header
  const acceptLang = request.headers.get("Accept-Language") ?? "";
  for (const locale of locales) {
    if (acceptLang.toLowerCase().includes(locale)) return locale;
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Pokud URL už obsahuje locale prefix, nechej projít
  const hasLocale = locales.some(
    (locale) =>
      pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return NextResponse.next();

  // Jinak přesměruj na výchozí locale
  const locale = getLocaleFromRequest(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)",],
};
