import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { fetchNews } from "@/lib/api";

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Fallback novinky pokud API nedostupné
const FALLBACK_NEWS = [
  { id: 1, title: "New type of AHU Casing T2TB2", perex: "Nový typ pláště vzduchotechnické jednotky pro náročné průmyslové aplikace.", published_at: "2024-10-01", slug: "new-ahu-casing-t2tb2", image: undefined },
  { id: 2, title: "New product SEDM-2D", perex: "Představujeme nový regulační prvek s dvojitou deflexí pro precizní distribuci vzduchu.", published_at: "2024-08-15", slug: "new-product-sedm-2d", image: undefined },
  { id: 3, title: "ISO 9001 recertifikace", perex: "MANDÍK a.s. úspěšně prošel recertifikačním auditem systému managementu kvality.", published_at: "2024-06-20", slug: "iso-9001-recertifikace", image: undefined },
];

export default async function News() {
  const locale = await getLocale();
  const t = await getTranslations("news");
  const items = await fetchNews(locale);
  const news = items.length > 0 ? items.slice(0, 3) : FALLBACK_NEWS;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="font-eurostile text-3xl sm:text-4xl font-bold text-brand-blue">
            {t("title")}
          </h2>
          <div className="mt-2 w-16 h-1 bg-brand-green" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item) => (
            <article key={item.id} className="bg-white rounded overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              {/* Obrázek */}
              <div className="relative h-48 bg-brand-blue/10">
                {item.image ? (
                  <Image
                    src={item.image.url}
                    alt={item.image.description ?? item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-eurostile text-5xl font-bold text-brand-blue/20">M</span>
                  </div>
                )}
              </div>

              {/* Obsah */}
              <div className="p-5 flex flex-col flex-1">
                {item.published_at && (
                  <time className="text-xs text-gray-400 mb-2">{formatDate(item.published_at)}</time>
                )}
                <h3 className="font-eurostile font-semibold text-brand-blue text-lg leading-tight mb-2">
                  {item.title}
                </h3>
                {item.perex && (
                  <p className="text-sm text-gray-600 flex-1 line-clamp-3">{item.perex}</p>
                )}
                <Link
                  href={`/${locale}/spolecnost/novinky/${item.slug}`}
                  className="mt-4 text-sm font-semibold text-brand-green hover:text-green-600 transition-colors inline-flex items-center gap-1"
                >
                  {t("readMore")}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
