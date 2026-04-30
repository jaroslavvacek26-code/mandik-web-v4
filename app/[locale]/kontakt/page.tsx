import { getTranslations } from "next-intl/server";
import { getPeopleByLocation } from "@/lib/contacts";
import ContactSection from "@/components/ui/ContactSection";

export default async function KontaktPage() {
  const t = await getTranslations("contact");
  const groups = getPeopleByLocation();

  return (
    <main className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="font-eurostile text-4xl sm:text-5xl font-bold text-brand-blue">
            {t("title")}
          </h1>
          <div className="mt-3 w-16 h-1 bg-brand-green" />
          <p className="mt-4 text-gray-600 max-w-2xl">
            Jsme připraveni pomoci s jakýmkoli dotazem. Kontaktujte nás přímo nebo nás navštivte v jedné z našich poboček.
          </p>
        </div>

        <ContactSection groups={groups} />
      </div>
    </main>
  );
}
