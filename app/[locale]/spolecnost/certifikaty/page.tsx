import Image from "next/image";
import Link from "next/link";
import { fetchCertificates, fetchDocuments, fetchEpd } from "@/lib/api";
import type { Resource } from "@/lib/types";

function ResourceCard({ item }: { item: Resource }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-md hover:border-brand-green transition-all flex flex-col"
    >
      {item.image_link && (
        <div className="relative h-44 bg-gray-50">
          <Image
            src={item.image_link}
            alt={item.title}
            fill
            className="object-contain p-4"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
      )}

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-eurostile font-bold text-brand-blue text-sm group-hover:text-brand-green transition-colors">
          {item.title}
        </h3>
        {item.subtitle && (
          <p className="text-xs text-gray-500 mt-1">{item.subtitle}</p>
        )}
        {item.description && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
        )}

        <div className="mt-auto pt-3 flex items-center gap-1.5 text-xs text-brand-green font-semibold">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Zobrazit dokument
        </div>
      </div>
    </a>
  );
}

function CertBadge({ item }: { item: Resource }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center gap-3 p-4 bg-white border border-gray-100 rounded-lg hover:shadow-md hover:border-brand-green transition-all"
    >
      {item.image_link ? (
        <div className="relative w-24 h-24">
          <Image
            src={item.image_link}
            alt={item.title}
            fill
            className="object-contain"
            sizes="96px"
          />
        </div>
      ) : (
        <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center">
          <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
      )}
      <span className="text-xs text-center font-medium text-brand-blue group-hover:text-brand-green transition-colors leading-tight">
        {item.title}
      </span>
    </a>
  );
}

export default async function CertifikatyPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;

  const [certificates, documents, epd] = await Promise.all([
    fetchCertificates(locale),
    fetchDocuments(locale),
    fetchEpd(locale),
  ]);

  return (
    <main className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8 flex gap-2 items-center">
          <Link href={`/${locale}/spolecnost/o-nas`} className="hover:text-brand-green transition-colors">Naše společnost</Link>
          <span>/</span>
          <span className="text-brand-blue font-medium">Certifikace a dokumenty</span>
        </nav>

        <div className="mb-12">
          <h1 className="font-eurostile text-4xl sm:text-5xl font-bold text-brand-blue">
            Certifikace a dokumenty
          </h1>
          <div className="mt-3 w-16 h-1 bg-brand-green" />
        </div>

        {/* EPD Banner */}
        <div className="mb-16 bg-brand-blue rounded-xl p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-eurostile text-xl sm:text-2xl font-bold text-white mb-2">
              Environmentální prohlášení o produktu (EPD)
            </h2>
            <p className="text-white/80 text-sm sm:text-base max-w-xl">
              Najděte více environmentálních prohlášení o produktu v národní databázi EPD.
            </p>
          </div>
          <a
            href="https://www.ekoznacka.cz/databaze-epd-v-cr/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-brand-green text-white font-semibold rounded-lg hover:bg-brand-green/90 transition-colors text-sm"
          >
            EPD Databáze
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* EPD sekce */}
        {epd.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-brand-green rounded-full" />
              <h2 className="font-eurostile text-2xl font-bold text-brand-blue">
                EPD
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {epd.map((item, i) => (
                <ResourceCard key={i} item={item} />
              ))}
            </div>
          </section>
        )}

        {/* Certifikace sekce */}
        {certificates.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-brand-green rounded-full" />
              <h2 className="font-eurostile text-2xl font-bold text-brand-blue">
                Certifikace
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {certificates.map((item, i) => (
                <CertBadge key={i} item={item} />
              ))}
            </div>
          </section>
        )}

        {/* Dokumenty sekce */}
        {documents.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-brand-green rounded-full" />
              <h2 className="font-eurostile text-2xl font-bold text-brand-blue">
                Dokumenty
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {documents.map((item, i) => (
                <ResourceCard key={i} item={item} />
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
