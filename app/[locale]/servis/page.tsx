import { getTranslations } from "next-intl/server";

const SERVICES = [
  {
    icon: "🔧",
    title: "Montáž a instalace",
    description: "Profesionální montáž vzduchotechnických systémů přímo na místě. Naši technici zajistí správnou instalaci a zprovoznění.",
  },
  {
    icon: "📋",
    title: "Servisní prohlídky",
    description: "Pravidelná údržba a servisní prohlídky pro zajištění dlouhé životnosti a spolehlivého provozu vašich zařízení.",
  },
  {
    icon: "⚡",
    title: "Pohotovostní servis",
    description: "Rychlá reakce na výpadky a poruchy. Pohotovostní servisní tým připraven k zásahu.",
  },
  {
    icon: "📐",
    title: "Technické poradenství",
    description: "Odborné poradenství při výběru správných komponentů a optimalizaci vzduchotechnických systémů.",
  },
];

export default async function ServisPage() {
  const t = await getTranslations("nav");

  return (
    <main className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="font-eurostile text-4xl sm:text-5xl font-bold text-brand-blue">
            {t("service")}
          </h1>
          <div className="mt-3 w-16 h-1 bg-brand-green" />
          <p className="mt-4 text-gray-600 max-w-2xl text-lg">
            Komplexní servisní podpora pro všechny naše výrobky. Jsme tu pro vás i po dodání.
          </p>
        </div>

        {/* Služby */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {SERVICES.map((service) => (
            <div key={service.title} className="p-6 border border-gray-100 rounded hover:border-brand-green transition-colors hover:shadow-sm">
              <div className="text-3xl mb-3">{service.icon}</div>
              <h2 className="font-eurostile font-bold text-brand-blue text-lg mb-2">{service.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-brand-blue rounded p-8 text-white text-center">
          <h2 className="font-eurostile text-2xl font-bold mb-3">Potřebujete servis?</h2>
          <p className="text-white/80 mb-6">Kontaktujte náš servisní tým — reagujeme do 24 hodin.</p>
          <a
            href="mailto:servis@mandik.cz"
            className="inline-block px-8 py-3 bg-brand-green text-white font-semibold rounded hover:bg-green-500 transition-colors"
          >
            Kontaktovat servis
          </a>
        </div>
      </div>
    </main>
  );
}
