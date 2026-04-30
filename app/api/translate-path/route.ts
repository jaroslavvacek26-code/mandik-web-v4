import { NextResponse } from "next/server";
import { fetchPortfolio } from "@/lib/api";
import type { Category } from "@/lib/types";

const ALL_LOCALES = ["cs", "en", "de", "uk"] as const;
type Locale = (typeof ALL_LOCALES)[number];

function isLocale(v: string): v is Locale {
  return (ALL_LOCALES as readonly string[]).includes(v);
}

function findCategoryGroup(
  cat: Category,
  groupPublicId: string
): { categorySlug: string; groupSlug: string } | null {
  if (cat.groups?.length) {
    const g = cat.groups.find((x) => x.public_id === groupPublicId);
    if (g) return { categorySlug: cat.slug, groupSlug: g.slug };
  }
  for (const sub of cat.subcategories ?? []) {
    const g = sub.groups.find((x) => x.public_id === groupPublicId);
    if (g) return { categorySlug: cat.slug, groupSlug: g.slug };
  }
  return null;
}

/**
 * Přeloží aktuální cestu na ekvivalenty ve všech lokalitách.
 * Vstup: ?path=/cs/vyroba/pozarni-technika/fdmr
 * Výstup: { cs: "...", en: "...", de: "...", uk: "..." }
 *
 * Důležité: slugy kategorie/výrobku se liší v každém jazyce, takže je dohledáme
 * přes public_id z portfolia.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path") ?? "/";

  const segments = path.split("/").filter(Boolean); // ["cs", "vyroba", "pozarni-technika", ...]
  const sourceLocale = segments[0];

  if (!sourceLocale || !isLocale(sourceLocale)) {
    // Fallback — nepřepisovatelná cesta, jen vrátíme stejnou strukturu
    const result: Record<string, string> = {};
    for (const lc of ALL_LOCALES) {
      const copy = [...segments];
      copy[0] = lc;
      result[lc] = "/" + copy.join("/");
    }
    return NextResponse.json(result);
  }

  // Detekce /vyroba/[category]/[group?]
  const isVyroba = segments[1] === "vyroba";
  const categorySlug = isVyroba ? segments[2] : undefined;
  const groupSlug = isVyroba ? segments[3] : undefined;

  // Pokud to není detail kategorie/výrobku, jen nahradíme locale a končíme
  if (!isVyroba || !categorySlug) {
    const result: Record<string, string> = {};
    for (const lc of ALL_LOCALES) {
      const copy = [...segments];
      copy[0] = lc;
      result[lc] = "/" + copy.join("/");
    }
    return NextResponse.json(result);
  }

  // Načti portfolia pro všechny locale + současný locale abychom našli public_id
  const portfolios = await Promise.all(
    ALL_LOCALES.map(async (lc) => [lc, await fetchPortfolio(lc)] as const)
  );
  const byLocale = new Map(portfolios);

  const sourceCats = byLocale.get(sourceLocale) ?? [];
  const sourceCat = sourceCats.find((c) => c.slug === categorySlug);
  if (!sourceCat) {
    // Fallback na náhradu locale
    const result: Record<string, string> = {};
    for (const lc of ALL_LOCALES) {
      const copy = [...segments];
      copy[0] = lc;
      result[lc] = "/" + copy.join("/");
    }
    return NextResponse.json(result);
  }

  // Pokud máme i group slug, najdi jeho public_id
  let groupPublicId: string | undefined;
  if (groupSlug) {
    if (sourceCat.groups?.length) {
      groupPublicId = sourceCat.groups.find((g) => g.slug === groupSlug)?.public_id;
    }
    if (!groupPublicId) {
      for (const sub of sourceCat.subcategories ?? []) {
        const g = sub.groups.find((g) => g.slug === groupSlug);
        if (g) {
          groupPublicId = g.public_id;
          break;
        }
      }
    }
  }

  const result: Record<string, string> = {};
  for (const lc of ALL_LOCALES) {
    const cats = byLocale.get(lc) ?? [];
    const matchCat = cats.find((c) => c.public_id === sourceCat.public_id);
    if (!matchCat) {
      result[lc] = `/${lc}/vyroba`;
      continue;
    }
    if (!groupPublicId) {
      result[lc] = `/${lc}/vyroba/${matchCat.slug}`;
      continue;
    }
    const match = findCategoryGroup(matchCat, groupPublicId);
    result[lc] = match
      ? `/${lc}/vyroba/${match.categorySlug}/${match.groupSlug}`
      : `/${lc}/vyroba/${matchCat.slug}`;
  }

  return NextResponse.json(result);
}
