import Link from "next/link";
import { getLocale } from "next-intl/server";

export default async function GDPRPage() {
  const locale = await getLocale();

  return (
    <main className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8 flex gap-2 items-center">
          <Link href={`/${locale}`} className="hover:text-brand-green transition-colors">Domů</Link>
          <span>/</span>
          <span className="text-brand-blue font-medium">Ochrana osobních údajů</span>
        </nav>

        {/* Nadpis */}
        <div className="mb-12">
          <h1 className="font-eurostile text-4xl sm:text-5xl font-bold text-brand-blue mb-4">
            Ochrana Osobních Údajů
          </h1>
          <div className="w-16 h-1 bg-brand-green" />
        </div>

        {/* Obsah */}
        <div className="prose prose-sm max-w-none text-gray-700">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-brand-blue mb-4">Základní Informace</h2>
            <p className="mb-4">
              Společnost <strong>MANDÍK, a.s.</strong> (IČO: 26718405) se sídlem na adrese <strong>Dobříšská 550, 267 24 Hostomice</strong>, Česká republika, vás tímto informuje o tom, jak zpracováváme vaše osobní údaje v souladu s nařízením Evropského parlamentu a Rady (EU) 2016/679 o ochraně fyzických osob a zpracování osobních údajů (GDPR).
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-brand-blue mb-4">Kontaktní Údaje</h2>
            <p className="mb-4">
              Máte-li dotazy ohledně zpracování vašich osobních údajů, kontaktujte nás:
            </p>
            <p className="mb-4">
              <strong>MANDÍK, a.s.</strong><br />
              Dobříšská 550, 267 24 Hostomice<br />
              Telefon: <a href="tel:+420311706706" className="text-brand-green hover:underline">+420 311 706 706</a><br />
              Email: <a href="mailto:mandik@mandik.cz" className="text-brand-green hover:underline">mandik@mandik.cz</a>
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-brand-blue mb-4">Zásady Zpracování Osobních Údajů</h2>
            <p className="mb-4">
              Při zpracování osobních údajů se řídíme těmito sedmi základními zásadami:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li><strong>Zákonnost a transparentnost</strong> – Zpracování je vždy právní a jasně vám sdělujeme, co děláme s vašimi údaji</li>
              <li><strong>Účelové omezení</strong> – Údaje zpracováváme pouze pro jasně definované účely</li>
              <li><strong>Minimalizace údajů</strong> – Sbíráme pouze údaje, které jsou nezbytné pro daný účel</li>
              <li><strong>Přesnost</strong> – Zajišťujeme, aby údaje byly správné a aktuální</li>
              <li><strong>Omezení doby uložení</strong> – Údaje neuchováváme déle, než je nutné</li>
              <li><strong>Integrita a důvěrnost</strong> – Chráníme údaje před neoprávněným přístupem a zneužitím</li>
              <li><strong>Odpovědnost</strong> – Provádíme technická a organizační opatření k ochraně údajů</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-brand-blue mb-4">Kategorie Zpracovávaných Údajů</h2>
            <p className="mb-4">
              Zpracováváme následující kategorie osobních údajů:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Identifikační údaje (jméno, příjmení, datum narození)</li>
              <li>Kontaktní údaje (adresa, telefonní číslo, e-mailová adresa)</li>
              <li>Ověřovací data (hesla, bezpečnostní otázky)</li>
              <li>Finanční a platební údaje (číslo účtu, údaje o platbách)</li>
              <li>Údaje o právních nárocích (smlouvy, objednávky, faktury)</li>
              <li>Profesní údaje (pracovní pozice, kvalifikace)</li>
              <li>Technické údaje (IP adresa, typ prohlížeče, cookies)</li>
              <li>Údaje o komunikaci (korespondenční historie)</li>
              <li>Údaje o lokaci (při poskytnutí souhlasu)</li>
              <li>Údaje z veřejných zdrojů (registrované obchodní údaje)</li>
              <li>Biometrické údaje (pouze pokud jsou poskytnuty)</li>
              <li>Údaje o trestních zápisech (pouze v rámci nezbytných kontrol bezpečnosti)</li>
            </ul>
            <p className="mt-4 p-4 bg-gray-100 rounded">
              <strong>Poznámka:</strong> Je možné, že o vás zpracováváme i další osobní údaje zde výslovně neuvedené, pokud je to nezbytné pro náš oprávněný účel.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-brand-blue mb-4">Právní Důvody Zpracování</h2>
            <p className="mb-4">
              Vaše osobní údaje zpracováváme na základě jednoho z těchto právních důvodů:
            </p>
            <ul className="list-decimal list-inside mb-4 space-y-2">
              <li><strong>Plnění smlouvy</strong> – Zpracování je nezbytné pro výkon smlouvy, kterou máte s námi (např. objednávka, služba)</li>
              <li><strong>Plnění právní povinnosti</strong> – Zpracování je vyžadováno právními předpisy (daňová, účetní povinnosti)</li>
              <li><strong>Oprávněné zájmy</strong> – Zpracování slouží našim oprávněným zájmům nebo zájmům třetích stran (marketing, bezpečnost)</li>
              <li><strong>Souhlas dotčené osoby</strong> – Vyjádřili jste nám svůj výslovný souhlas se zpracováním (cookies, newsletter)</li>
              <li><strong>Ochrana životně důležitých zájmů</strong> – Zpracování je nezbytné pro ochranu života nebo zdraví (zdravotní údaje)</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-brand-blue mb-4">Příjemci Osobních Údajů</h2>
            <p className="mb-4">
              Vaše osobní údaje mohou být předány následujícím kategoriím třetích osob:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li><strong>Zpracovatelé</strong> – Třetí strany, které údaje zpracovávají na náš účet (hostingové služby, platební brány)</li>
              <li><strong>Samostatní správci</strong> – Organizace, které jsou samostatnými správci údajů (daňový úřad, zákonně povinné orgány)</li>
              <li><strong>Právní nástupci</strong> – V případě prodeje nebo fúze společnosti</li>
              <li><strong>Orgány činné v trestním řízení</strong> – Pokud vyžadují údaje pro vyšetřování trestného činu</li>
            </ul>
            <p className="mt-4">
              Údaje předáváme pouze v rozsahu a za účelem nezbytného pro plnění smlouvy, právní povinnosti nebo zpracování údajů.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-brand-blue mb-4">Doba Uložení Údajů</h2>
            <p className="mb-4">
              Dlouhodobě uchováváme vaše osobní údaje pouze po dobu, která je nezbytná pro daný účel:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li><strong>Právní povinnosti</strong> – Určeno právními předpisy (např. účetní podklady se archivují po dobu 11 let)</li>
              <li><strong>Smluvní údaje</strong> – Uchováváme po dobu trvání smlouvy a další 10 let</li>
              <li><strong>Oprávněné zájmy</strong> – Od 1 týdne do 10 let, v závislosti na účelu zpracování</li>
              <li><strong>Souhlas</strong> – Do odvolání souhlasu a následujícího smazání</li>
            </ul>
            <p className="mt-4">
              Po skončení doby uložení údaje smažeme nebo anonymizujeme.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-brand-blue mb-4">Vaša Práva Subjektů Údajů</h2>
            <p className="mb-4">
              V souladu s GDPR máte následující práva:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li><strong>Právo na přístup</strong> – Máte právo vědět, jaké údaje o vás zpracováváme</li>
              <li><strong>Právo na opravu</strong> – Můžete nás požádat o opravu nepřesných údajů</li>
              <li><strong>Právo na výmaz</strong> – Máte právo být zapomenut (právo na výmaz)</li>
              <li><strong>Právo na omezení zpracování</strong> – Můžete požádat o omezení zpracování vašich údajů</li>
              <li><strong>Právo na přenositelnost údajů</strong> – Máte právo obdržet své údaje v strojově čitelné podobě</li>
              <li><strong>Právo na námitku</strong> – Můžete se opřít proti zpracování vašich údajů v určitých případech</li>
              <li><strong>Právo na odvolání souhlasu</strong> – Souhlas se zpracováním můžete kdykoli odvolat</li>
              <li><strong>Právo na náhradu újmy</strong> – Máte právo na náhradu újmy způsobené nezákonným zpracováním</li>
              <li><strong>Právo na stížnost</strong> – Stížnost můžete podat Úřadu pro ochranu osobních údajů</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-brand-blue mb-4">Jak Uplatnit Vaša Práva</h2>
            <p className="mb-4">
              Chcete-li uplatnit některé z výše uvedených práv, zašlete nám písemný požadavek na následující adresy:
            </p>
            <p className="mb-4">
              <strong>Per poštu:</strong><br />
              MANDÍK, a.s.<br />
              Dobříšská 550<br />
              267 24 Hostomice<br />
              Česká republika
            </p>
            <p className="mb-4">
              <strong>Elektronicky:</strong><br />
              Email: <a href="mailto:mandik@mandik.cz" className="text-brand-green hover:underline">mandik@mandik.cz</a><br />
              Telefon: <a href="tel:+420311706706" className="text-brand-green hover:underline">+420 311 706 706</a>
            </p>
            <p className="mb-4">
              Vaši žádost vyřídíme bez zbytečného odkladu, nejpozději do 1 měsíce. V případě, že bude žádost složitá, můžeme lhůtu prodloužit o dalších 2 měsíce.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-brand-blue mb-4">Cookies</h2>
            <p className="mb-4">
              Detailní informace o cookies, které na našem webu používáme, a o tom, jak je můžete spravovat, najdete v naší{" "}
              <Link href={`/${locale}/cookies`} className="text-brand-green font-semibold hover:underline">
                zásadách o cookies
              </Link>
              .
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-brand-blue mb-4">Předávání do Třetích Zemí</h2>
            <p className="mb-4">
              Vaše osobní údaje se standardně do zemí mimo Evropský ekonomický prostor nepředávají. V případě, že by došlo k takovému předání, zajistíme, aby byla splněna příslušná ochranná opatření v souladu s GDPR, jako je:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Rozhodnutí o odpovídající ochraně Evropské komise</li>
              <li>Vhodné záruky (standardní smluvní doložky)</li>
              <li>Výjimky pro specifické situace</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-brand-blue mb-4">Bezpečnost Údajů</h2>
            <p className="mb-4">
              Implementovali jsme technická a organizační opatření k ochraně vašich osobních údajů proti neoprávněnému přístupu, zničení, změně, zveřejnění nebo ztrátě, včetně:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Šifrování údajů v přenosu a v klidu</li>
              <li>Přístupu řídícího se principem nejmenších práv</li>
              <li>Pravidelného testování bezpečnosti</li>
              <li>Školení zaměstnanců v oblasti ochrany dat</li>
              <li>Plánů na řešení porušení bezpečnosti</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-brand-blue mb-4">Kontakt na Úřad pro Ochranu Osobních Údajů</h2>
            <p className="mb-4">
              Máte-li pocit, že došlo k porušení vaší ochrany osobních údajů, můžete podat stížnost:
            </p>
            <p className="mb-4">
              <strong>Úřad pro ochranu osobních údajů</strong><br />
              Pplk. Sochora 27<br />
              170 00 Praha 7<br />
              Česká republika<br />
              Web: <a href="https://www.uoou.cz/" target="_blank" rel="noopener noreferrer" className="text-brand-green hover:underline">www.uoou.cz</a>
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-brand-blue mb-4">Poslední Aktualizace</h2>
            <p className="text-gray-600">
              Tyto zásady ochrany osobních údajů byly naposledy aktualizovány v lednu 2024. Vyhrazujeme si právo je změnit. O všech podstatných změnách vás budeme informovat.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
