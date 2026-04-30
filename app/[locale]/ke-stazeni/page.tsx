import Image from "next/image";
import { getT } from "@/lib/i18n-server";
import { fetchDownloads } from "@/lib/api";
import type { Resource } from "@/lib/types";

function formatSize(bytes?: number) {
  if (!bytes) return "";
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024).toFixed(0)} kB`;
}

function DownloadCard({ item }: { item: Resource }) {
  const isZip = item.mime_type.includes("zip");
  const isPdf = item.mime_type.includes("pdf");

  return (
    <div className="bg-white border border-gray-100 rounded overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      {/* Náhled obrázku */}
      {item.image_link && (
        <div className="relative h-36 bg-gray-50">
          <Image
            src={item.image_link}
            alt={item.title}
            fill
            className="object-contain p-3"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start gap-2 mb-2">
          {/* Ikona typu */}
          {isZip && (
            <span className="shrink-0 mt-0.5 text-xs font-bold px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded">ZIP</span>
          )}
          {isPdf && (
            <span className="shrink-0 mt-0.5 text-xs font-bold px-1.5 py-0.5 bg-red-100 text-red-700 rounded">PDF</span>
          )}
          <h3 className="font-eurostile font-bold text-brand-blue text-sm leading-tight">
            {item.title}
          </h3>
        </div>

        {item.subtitle && (
          <p className="text-xs text-brand-green font-medium mb-2">{item.subtitle}</p>
        )}
        {item.description && (
          <p className="text-xs text-gray-600 leading-relaxed flex-1 line-clamp-3">{item.description}</p>
        )}

        <div className="mt-4 flex items-center justify-between gap-2">
          {item.size && (
            <span className="text-xs text-gray-400">{formatSize(item.size)}</span>
          )}
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex items-center gap-1.5 px-4 py-2 bg-brand-green text-white text-xs font-semibold rounded hover:bg-green-500 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Stáhnout
          </a>
        </div>
      </div>
    </div>
  );
}

export default async function KeStazeniPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const t = await getT(locale, "nav");
  const downloads = await fetchDownloads(locale);

  // Seskupit dle type_name
  const byType = downloads.reduce<Record<string, Resource[]>>((acc, d) => {
    if (!acc[d.type_name]) acc[d.type_name] = [];
    acc[d.type_name].push(d);
    return acc;
  }, {});

  return (
    <main className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="font-eurostile text-4xl sm:text-5xl font-bold text-brand-blue">
            {t("downloads")}
          </h1>
          <div className="mt-3 w-16 h-1 bg-brand-green" />
        </div>

        {downloads.length === 0 ? (
          <p className="text-gray-500">Momentálně nejsou k dispozici žádné soubory ke stažení.</p>
        ) : (
          <div className="space-y-14">
            {Object.entries(byType).map(([typeName, items]) => (
              <section key={typeName}>
                <h2 className="font-eurostile text-2xl font-bold text-brand-blue mb-2 flex items-center gap-3">
                  <span className="w-1 h-7 bg-brand-green rounded inline-block" />
                  {typeName}
                </h2>
                <p className="text-gray-500 text-sm mb-6 ml-4">
                  {items.length} {items.length === 1 ? "soubor" : items.length < 5 ? "soubory" : "souborů"}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ml-4">
                  {items.map((item, i) => (
                    <DownloadCard key={i} item={item} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
