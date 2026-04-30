import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { fetchPortfolio } from "@/lib/api";

export default async function VyrobaPage() {
  const locale = await getLocale();
  const t = await getTranslations("products");
  const categories = await fetchPortfolio(locale);

  return (
    <main className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="font-eurostile text-4xl sm:text-5xl font-bold text-brand-blue">
            {t("title")}
          </h1>
          <div className="mt-3 w-16 h-1 bg-brand-green" />
          <p className="mt-4 text-gray-600 max-w-2xl">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const img = cat.gallery?.[0];
            return (
              <Link
                key={cat.public_id}
                href={`/${locale}/vyroba/${cat.slug}`}
                className="group relative aspect-square overflow-hidden rounded bg-gray-100"
              >
                {img ? (
                  <>
                    <Image
                      src={img.url}
                      alt={img.description || cat.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-brand-blue/10">
                    <span className="text-brand-blue/30 text-5xl font-eurostile font-bold">M</span>
                  </div>
                )}
                <span className="absolute bottom-0 left-0 right-0 p-3 text-white text-sm font-bold font-eurostile leading-tight">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Virtuální showroom */}
        <div className="mt-16 p-8 bg-brand-blue rounded text-white text-center">
          <h2 className="font-eurostile text-2xl font-bold mb-3">{t("virtualShowroom")}</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Prohlédněte si naše výrobky v interaktivním 3D prostředí.
          </p>
          <a
            href="https://my.matterport.com/show/?m=MW8NFZmbZoo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-brand-green text-white font-semibold rounded hover:bg-green-500 transition-colors"
          >
            Spustit virtuální prohlídku →
          </a>
        </div>
      </div>
    </main>
  );
}
