import Link from "next/link";
import { getLocale } from "next-intl/server";
import { MILESTONES } from "@/lib/milestones";

export default async function ONasPage() {
  const locale = await getLocale();

  // Milníky seřazené od nejnovějšího
  const sorted = [...MILESTONES].sort((a, b) => b.year - a.year);

  return (
    <main className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8 flex gap-2 items-center">
          <Link href={`/${locale}`} className="hover:text-brand-green transition-colors">Domů</Link>
          <span>/</span>
          <span className="text-brand-blue font-medium">O nás</span>
        </nav>

        {/* Nadpis */}
        <div className="mb-16">
          <h1 className="font-eurostile text-4xl sm:text-5xl font-bold text-brand-blue">
            O nás
          </h1>
          <div className="mt-3 w-16 h-1 bg-brand-green" />
        </div>

        {/* Naše historie */}
        <section className="mb-20">
          <h2 className="font-eurostile text-2xl sm:text-3xl font-bold text-brand-blue mb-6">
            Naše historie
          </h2>
          <div className="max-w-3xl space-y-5 text-gray-700 leading-relaxed">
            <p className="text-lg">
              Příběh rodiny Mandíků sahá hluboko do minulosti, kdy se v obci Neuměřice u Prahy
              věnovali tradičnímu kovářskému řemeslu. Na tuto tradici navázal v roce 1989
              zakladatel <strong className="text-brand-blue">Vlastimil Mandík</strong>, který
              bez počátečního kapitálu, s půjčkou pouhých 20 tisíc Kč, začal podnikat v garáži.
            </p>
            <p>
              Od drobných zámečnických prací se firma rychle vyprofilovala jako specialista
              na protipožární a vzduchotechnické komponenty. Během tří dekád vyrostla
              z jednoho muže s vizí na jednoho z největších evropských výrobců
              vzduchotechnických komponentů s obratem přes <strong className="text-brand-blue">1 miliardu Kč</strong> a
              exportem do více než <strong className="text-brand-blue">38 zemí světa</strong>.
            </p>
            <p>
              Dnes společnost <strong className="text-brand-blue">MANDÍK a.s.</strong> zaměstnává
              přes 200 odborníků a její výrobky chrání budovy a infrastrukturu po celém světě –
              od jaderných elektráren přes tunely až po nemocnice a obchodní centra.
            </p>
          </div>
        </section>

        {/* Firemní milníky – timeline */}
        <section>
          <h2 className="font-eurostile text-2xl sm:text-3xl font-bold text-brand-blue mb-10">
            Firemní milníky
          </h2>

          <div className="relative">
            {/* Svislá čára */}
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gray-200" />

            <div className="space-y-0">
              {sorted.map((milestone, index) => (
                <div
                  key={milestone.year + "-" + index}
                  className="relative flex items-start gap-6 sm:gap-8 group"
                >
                  {/* Rok + tečka */}
                  <div className="shrink-0 w-12 sm:w-16 flex flex-col items-center pt-6 relative z-10">
                    {/* Kruh na timeline */}
                    <div className="w-3 h-3 rounded-full bg-brand-green border-2 border-white shadow-sm group-hover:scale-125 transition-transform" />
                  </div>

                  {/* Obsah */}
                  <div className="flex-1 pb-8 pt-3">
                    <div className="bg-white border border-gray-100 rounded-lg p-5 sm:p-6 hover:shadow-md hover:border-brand-green/30 transition-all">
                      <div className="flex items-baseline gap-3 mb-1">
                        <span className="font-eurostile text-xl sm:text-2xl font-bold text-brand-green">
                          {milestone.year}
                        </span>
                        <h3 className="font-eurostile font-bold text-brand-blue text-base sm:text-lg">
                          {milestone.title}
                        </h3>
                      </div>
                      {milestone.description && (
                        <p className="text-gray-600 text-sm sm:text-base mt-1 leading-relaxed">
                          {milestone.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
