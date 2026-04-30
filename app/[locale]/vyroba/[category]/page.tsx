import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchPortfolio } from "@/lib/api";
import type { ProductGroup } from "@/lib/types";

export default async function CategoryPage({
  params,
}: {
  params: { locale: string; category: string };
}) {
  const { locale, category } = params;
  const categories = await fetchPortfolio(locale);
  const cat = categories.find((c) => c.slug === category);
  if (!cat) notFound();

  return (
    <main className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8 flex gap-2 items-center">
          <Link href={`/${locale}/vyroba`} className="hover:text-brand-green transition-colors">Výrobky</Link>
          <span>/</span>
          <span className="text-brand-blue font-medium">{cat.name}</span>
        </nav>

        {/* Hlavička kategorie */}
        <div className="mb-16">
          <h1 className="font-eurostile text-4xl font-bold text-brand-blue mb-3">{cat.name}</h1>
          <div className="w-16 h-1 bg-brand-green mb-5" />
          {cat.description && (
            <p className="text-gray-600 leading-relaxed max-w-3xl">{cat.description}</p>
          )}
        </div>

        {/* Skupiny výrobků (s dělením dle subkategorie) */}
        {cat.subcategories?.length > 0 ? (
          <div className="space-y-14">
            {cat.subcategories.map((sub) => (
              <section key={sub.public_id}>
                <div className="flex items-center gap-4 mb-6">
                  {sub.gallery?.[0] && (
                    <div className="relative w-12 h-12 rounded overflow-hidden shrink-0">
                      <Image src={sub.gallery[0].url} alt={sub.name} fill className="object-cover" sizes="48px" />
                    </div>
                  )}
                  <div>
                    <h2 className="font-eurostile text-2xl font-bold text-brand-blue">{sub.name}</h2>
                    <div className="mt-1 w-10 h-0.5 bg-brand-green" />
                  </div>
                </div>
                <GroupGrid groups={sub.groups} locale={locale} categorySlug={cat.slug} />
              </section>
            ))}
          </div>
        ) : (
          <GroupGrid groups={cat.groups} locale={locale} categorySlug={cat.slug} />
        )}
      </div>
    </main>
  );
}

function GroupGrid({ groups, locale, categorySlug }: { groups: ProductGroup[]; locale: string; categorySlug: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {groups.map((group) => {
        const img = group.gallery?.[0];
        return (
          <Link
            key={group.public_id}
            href={`/${locale}/vyroba/${categorySlug}/${group.slug}`}
            className="group bg-white border border-gray-100 rounded overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
          >
            {/* Obrázek */}
            <div className="relative h-48 bg-gray-50">
              {img ? (
                <Image
                  src={img.url}
                  alt={img.description || group.name}
                  fill
                  className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-eurostile text-5xl font-bold text-brand-blue/20">M</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-4 flex flex-col">
              <h3 className="font-eurostile font-bold text-brand-blue text-base group-hover:text-brand-green transition-colors">
                {group.name}
              </h3>
              {group.subtitle && (
                <p className="text-xs text-gray-500 mt-0.5">{group.subtitle}</p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
