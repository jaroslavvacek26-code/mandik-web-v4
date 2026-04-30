import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { fetchPortfolio } from "@/lib/api";
import type { Category } from "@/lib/types";

function ShowroomCard({ label }: { label: string }) {
  return (
    <a
      href="https://my.matterport.com/show/?m=MW8NFZmbZoo"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative aspect-square overflow-hidden rounded bg-brand-blue flex flex-col items-center justify-center text-white hover:bg-brand-blue/90 transition-colors"
    >
      <svg className="w-12 h-12 mb-3 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a1 1 0 011-1h8a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" />
      </svg>
      <span className="font-eurostile font-semibold text-sm text-center px-3">{label}</span>
    </a>
  );
}

function ProductCard({ category, locale }: { category: Category; locale: string }) {
  const image = category.gallery?.[0];

  return (
    <Link
      href={`/${locale}/vyroba/${category.slug}`}
      className="group relative aspect-square overflow-hidden rounded bg-gray-100"
    >
      {image ? (
        <>
          <Image
            src={image.url}
            alt={image.description || category.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-brand-blue/10 flex items-center justify-center">
          <span className="text-brand-blue/30 text-5xl font-eurostile font-bold">M</span>
        </div>
      )}
      <span className="absolute bottom-0 left-0 right-0 p-3 text-white text-sm font-semibold font-eurostile leading-tight">
        {category.name}
      </span>
    </Link>
  );
}

export default async function Products() {
  const locale = await getLocale();
  const t = await getTranslations("products");
  const categories = await fetchPortfolio(locale);
  const displayed = categories.slice(0, 8);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="font-eurostile text-3xl sm:text-4xl font-bold text-brand-blue">
            {t("title")}
          </h2>
          <div className="mt-2 w-16 h-1 bg-brand-green" />
          <p className="mt-4 text-gray-600 max-w-xl">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {displayed.length > 0 ? (
            <>
              {displayed.map((cat) => (
                <ProductCard key={cat.public_id} category={cat} locale={locale} />
              ))}
              <ShowroomCard label={t("virtualShowroom")} />
            </>
          ) : (
            <>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-square rounded bg-gray-100 animate-pulse" />
              ))}
              <ShowroomCard label={t("virtualShowroom")} />
            </>
          )}
        </div>


      </div>
    </section>
  );
}
