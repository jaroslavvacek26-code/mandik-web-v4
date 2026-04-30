import Link from "next/link";
import { getLocale } from "next-intl/server";
import OpenCookieSettings from "@/components/ui/OpenCookieSettings";

export default async function CookiesPage() {
  const locale = await getLocale();

  return (
    <main className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8 flex gap-2 items-center">
          <Link href={`/${locale}`} className="hover:text-brand-green transition-colors">Domů</Link>
          <span>/</span>
          <span className="text-brand-blue font-medium">Cookies</span>
        </nav>

        {/* Nadpis */}
        <div className="mb-12">
          <h1 className="font-eurostile text-4xl sm:text-5xl font-bold text-brand-blue mb-4">
            Cookies
          </h1>
          <div className="w-16 h-1 bg-brand-green" />
        </div>

        {/* Rychlé nastavení */}
        <div className="mb-10 p-5 rounded-xl bg-brand-blue/5 border border-brand-blue/10 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold text-brand-blue">Chcete upravit své cookies nastavení?</p>
            <p className="text-sm text-gray-600 mt-1">Klikněte na tlačítko a váš aktuální souhlas se resetuje – zobrazí se panel s nastavením.</p>
          </div>
          <OpenCookieSettings />
        </div>

        {/* Obsah */}
        <div className="prose prose-sm max-w-none text-gray-700">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-brand-blue mb-4">Co jsou Cookies?</h2>
            <p className="mb-4">
              Cookies (soubory cookies) jsou malé textové soubory, které se ukládají ve vašem prohlížeči. Tyto soubory napomáhají pamatovat si vaše aktivity a preference, aby se vám web lépe přizpůsobil a zlepšil jeho funkčnost.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-brand-blue mb-4">Účel Cookies a Souhlas Uživatele</h2>
            <p className="mb-4">
              Používáme cookies k různým účelům:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li><strong>Technické cookies</strong> – nezbytné pro fungování webu, vyžadují vás souhlas</li>
              <li><strong>Preference cookies</strong> – zapamatují si vaše nastavení a preference</li>
              <li><strong>Analytické cookies</strong> – pomáhají nám analyzovat, jak web používáte</li>
              <li><strong>Marketingové cookies</strong> – slouží k zobrazování vám relevantního obsahu a reklam</li>
            </ul>
            <p className="mb-4">
              Některé cookies jsou technicky nezbytné a použijeme je automaticky. Ostatní vyžadují váš výslovný souhlas, který můžete dát nebo odmítnout prostřednictvím cookie lišty na webu.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-brand-blue mb-4">Cookies, které využíváme na našich webových stránkách</h2>
            <p className="mb-4">
              Na našem webu používáme cookies od těchto třetích stran:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>
                <strong>Google Analytics</strong> – analýza návštěvnosti webu
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-green hover:underline ml-2">
                  (Zásady ochrany osobních údajů)
                </a>
              </li>
              <li>
                <strong>Microsoft (Bing)</strong> – sledování konverzí a analýza
                <a href="https://privacy.microsoft.com/" target="_blank" rel="noopener noreferrer" className="text-brand-green hover:underline ml-2">
                  (Zásady ochrany osobních údajů)
                </a>
              </li>
              <li>
                <strong>Facebook Pixel</strong> – sledování konverzí a targeting
                <a href="https://www.facebook.com/policy.php" target="_blank" rel="noopener noreferrer" className="text-brand-green hover:underline ml-2">
                  (Zásady ochrany osobních údajů)
                </a>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-brand-blue mb-4">Správa a Deaktivace Cookies</h2>
            <p className="mb-4">
              Cookies můžete v každém okamžiku spravovat nebo deaktivovat v nastavení svého prohlížeče. Zde je postup pro nejčastěji používané prohlížeče:
            </p>

            <h3 className="text-lg font-semibold text-brand-blue mb-2 mt-6">Google Chrome</h3>
            <p className="mb-4">
              1. Klikněte na ikonu hamburger menu (tři svislé čáry) v pravém horním rohu<br />
              2. Vyberte <strong>Nastavení</strong><br />
              3. Klikněte na <strong>Ochrana osobních údajů a zabezpečení</strong><br />
              4. Vyberte <strong>Soubory cookies a jiná data webů</strong><br />
              5. Vyberte požadované nastavení
            </p>

            <h3 className="text-lg font-semibold text-brand-blue mb-2 mt-6">Mozilla Firefox</h3>
            <p className="mb-4">
              1. Klikněte na ikonu menu (tři vodorovné čáry) v pravém horním rohu<br />
              2. Vyberte <strong>Možnosti</strong><br />
              3. Přejděte na kartu <strong>Ochrana</strong><br />
              4. V sekci <strong>Cookies a data webů</strong> vyberte požadované nastavení
            </p>

            <h3 className="text-lg font-semibold text-brand-blue mb-2 mt-6">Microsoft Edge</h3>
            <p className="mb-4">
              1. Klikněte na ikonu menu (tři tečky) v pravém horním rohu<br />
              2. Vyberte <strong>Nastavení</strong><br />
              3. Klikněte na <strong>Ochrana osobních údajů a služby</strong><br />
              4. V sekci <strong>Soubory cookies a jiná data webů</strong> vyberte požadované nastavení
            </p>

            <h3 className="text-lg font-semibold text-brand-blue mb-2 mt-6">Safari</h3>
            <p className="mb-4">
              1. Klikněte na <strong>Safari</strong> v horní nabídce<br />
              2. Vyberte <strong>Předvolby</strong><br />
              3. Přejděte na kartu <strong>Ochrana soukromí</strong><br />
              4. V sekci <strong>Cookies a data webů</strong> vyberte požadované nastavení
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-brand-blue mb-4">Odvolání Souhlasu</h2>
            <p className="mb-4">
              Souhlas s cookies můžete kdykoliv změnit nebo odvolat. Můžete to udělat prostřednictvím cookie lišty na našem webu nebo v nastavení svého prohlížeče.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-brand-blue mb-4">Ochrana Osobních Údajů</h2>
            <p className="mb-4">
              Další informace o tom, jak chápeme a chráníme vaše osobní údaje, najdete v naší{" "}
              <Link href={`/${locale}/ochrana-osobnich-udaju`} className="text-brand-green font-semibold hover:underline">
                zásadách ochrany osobních údajů
              </Link>
              .
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-brand-blue mb-4">Kontakt</h2>
            <p className="mb-4">
              Máte-li jakékoliv otázky ohledně cookies nebo naší ochrany osobních údajů, kontaktujte nás:
            </p>
            <p className="mb-2">
              <strong>MANDÍK, a.s.</strong><br />
              Dobříšská 550, 267 24 Hostomice<br />
              Telefon: +420 311 706 706<br />
              Email:{" "}
              <a href="mailto:mandik@mandik.cz" className="text-brand-green hover:underline">
                mandik@mandik.cz
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
