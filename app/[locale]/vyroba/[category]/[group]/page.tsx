import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { fetchPortfolio } from "@/lib/api";
import type { Download, ProductGroup } from "@/lib/types";
import { charText } from "@/lib/types";
import ImageGallery from "@/components/ui/ImageGallery";

export default async function GroupDetailPage({
  params,
}: {
  params: { locale: string; category: string; group: string };
}) {
  const locale = await getLocale();
  const categories = await fetchPortfolio(locale);

  const cat = categories.find((c) => c.slug === params.category);
  if (!cat) notFound();

  // Najdi group přímo nebo přes subcategories
  let group: ProductGroup | undefined;
  let subcategoryName: string | undefined;

  if (cat.groups?.length > 0) {
    group = cat.groups.find((g) => g.slug === params.group);
  } else {
    for (const sub of cat.subcategories ?? []) {
      const found = sub.groups.find((g) => g.slug === params.group);
      if (found) {
        group = found;
        subcategoryName = sub.name;
        break;
      }
    }
  }

  if (!group) notFound();

  // Downloads grouped by type
  const downloadsByType: Record<string, Download[]> = {};
  for (const d of group.downloads) {
    if (!downloadsByType[d.type]) downloadsByType[d.type] = [];
    downloadsByType[d.type].push(d);
  }

  return (
    <main className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8 flex flex-wrap gap-2 items-center">
          <Link href={`/${locale}/vyroba`} className="hover:text-brand-green transition-colors">Výrobky</Link>
          <span>/</span>
          <Link href={`/${locale}/vyroba/${cat.slug}`} className="hover:text-brand-green transition-colors">{cat.name}</Link>
          {subcategoryName && (
            <>
              <span>/</span>
              <span>{subcategoryName}</span>
            </>
          )}
          <span>/</span>
          <span className="text-brand-blue font-medium">{group.name}</span>
        </nav>

        {/* Galerie + info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <ImageGallery images={group.gallery ?? []} name={group.name} />

          <div>
            <h1 className="font-eurostile text-3xl sm:text-4xl font-bold text-brand-blue">
              {group.name}
            </h1>
            {group.subtitle && (
              <p className="text-brand-green font-semibold mt-1 text-lg">{group.subtitle}</p>
            )}
            <div className="mt-3 w-16 h-1 bg-brand-green mb-5" />

            {group.description && (
              <p className="text-gray-700 leading-relaxed mb-6">{group.description}</p>
            )}

            {/* Ikony */}
            {group.icons?.length > 0 && (
              <div className="flex flex-wrap gap-4 mb-6">
                {group.icons.map((icon, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 text-center w-16" title={icon.description ?? icon.name}>
                    <div className="relative w-10 h-10">
                      <Image src={icon.url} alt={icon.description ?? icon.name} fill className="object-contain" sizes="40px" />
                    </div>
                    {icon.description && (
                      <span className="text-xs text-gray-500 leading-tight">{icon.description}</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Charakteristiky */}
            {group.characteristics?.length > 0 && (
              <div>
                <h2 className="font-eurostile font-bold text-brand-blue text-base mb-3">Charakteristiky</h2>
                <ul className="space-y-1.5">
                  {group.characteristics.map((c, i) => {
                    const text = charText(c);
                    if (!text) return null;
                    return (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-green shrink-0" />
                        {text}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Technická specifikace */}
        {group.specification && (
          <section className="mb-16">
            <h2 className="font-eurostile text-2xl font-bold text-brand-blue mb-3">Technická specifikace</h2>
            <div className="w-12 h-1 bg-brand-green mb-6" />
            <div
              className="prose prose-gray max-w-none text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: group.specification }}
            />
          </section>
        )}

        {/* Soubory ke stažení */}
        {Object.keys(downloadsByType).length > 0 && (
          <section>
            <h2 className="font-eurostile text-2xl font-bold text-brand-blue mb-3">Ke stažení</h2>
            <div className="w-12 h-1 bg-brand-green mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(downloadsByType).map(([type, files]) => (
                <div key={type}>
                  <h3 className="font-semibold text-brand-blue mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                    <span className="w-2 h-2 rounded-full bg-brand-green shrink-0" />
                    {type}
                  </h3>
                  <ul className="space-y-1.5">
                    {files.map((file, i) => (
                      <li key={i}>
                        <a
                          href={file.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded border border-gray-100 hover:border-brand-green hover:bg-gray-50 transition-all group"
                        >
                          <svg className="w-5 h-5 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z" />
                          </svg>
                          <span className="text-sm text-gray-700 group-hover:text-brand-green transition-colors flex-1">
                            {file.name}
                          </span>
                          <svg className="w-4 h-4 text-gray-400 group-hover:text-brand-green transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
