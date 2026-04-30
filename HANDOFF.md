# MANDÍK Web – Handoff dokument pro AI asistenta

> Tento dokument popisuje stav projektu, architekturu, hotové i nedokončené části.
> Slouží jako kontext pro jakoukoli AI/vývojáře, který bude na projektu pokračovat.
>
> **Poslední aktualizace:** duben 2026

---

## 1. O projektu

Firemní web pro **MANDÍK, a.s.** – českého výrobce vzduchotechnických komponentů,
protipožárních prvků a průmyslového vytápění.

- **Cílová doména:** `mandik.com/cs` (s redirecty z `.cz`, `.at`, `.de`, …)
- **Repozitář:** `C:\Users\WacatkoBeelink\Claude Projects Wacatko\MANDIK web v4\mandik-web`
- **Hosting (plánovaný):** Vercel
- **Referenční web (kopírujeme z něj):** https://mandik-prod.vercel.app/

### Důležitá pravidla projektu

- ❗ Slovo „produkty" NIKDY nepoužívat → vždy **„výrobky"**
- ❗ Logo vždy `.svg` nebo `.webp`, **nikdy `.png`**
- ❗ Mobile-first responzivní design
- ❗ Web musí být přístupný (a11y) – alt texty, sémantické HTML
- Komentáře v kódu česky nebo anglicky (ne mix)

---

## 2. Tech stack

| Vrstva       | Technologie                                          |
|--------------|------------------------------------------------------|
| Framework    | **Next.js 14.2** (App Router)                        |
| Jazyk        | **TypeScript 5**                                     |
| Styling      | **Tailwind CSS 3.4** + brand colors                  |
| i18n         | **next-intl 4.9** (cs / en / de / uk)                |
| Mapy         | **Leaflet 1.9 + react-leaflet 5** (free OSM tiles)   |
| API klient   | Native `fetch` se serverside cache (`revalidate`)    |
| CMS          | **mandik.online** (headless, REST API)               |

**Závislosti** (`package.json`):
```json
"dependencies": {
  "@types/leaflet": "^1.9.21",
  "leaflet": "^1.9.4",
  "next": "14.2.35",
  "next-intl": "^4.9.1",
  "react": "^18",
  "react-dom": "^18",
  "react-leaflet": "^5.0.0"
}
```

> ⚠️ `react-leaflet` v5 vyžaduje React 19. Projekt jede na 18 → instalace běžela s `--legacy-peer-deps`.

---

## 3. Brand manuál

### Barvy (Tailwind config)

| Název             | Hex       | Tailwind class      |
|-------------------|-----------|---------------------|
| Primární modrá    | `#506077` | `brand-blue`        |
| Akcent zelená     | `#26d07c` | `brand-green`       |
| Světlá modrá      | `#74d1ea` | _hardcoded `#74d1ea`_ |
| Oranžová          | `#f2a900` | _hardcoded_         |
| Žlutá             | `#ffd700` | _hardcoded_         |
| Pozadí            | `#ffffff` | `bg-white`          |
| Text hlavní       | `#1a1a1a` | -                   |

### Typografie

- **Tělo:** Arial (systémový)
- **Nadpisy / akcenty:** Eurostile (`font-eurostile`)

### Vizuální styl

- Čisté geometrické tvary
- Zelené akcenty/pruhy pod nadpisy
- Bílá pozadí, světle šedé separátory

---

## 4. Architektura projektu

### Struktura složek

```
mandik-web/
├── app/
│   ├── [locale]/              ← lokalizační segment
│   │   ├── layout.tsx         ← layout (Header, Footer, CookieBanner)
│   │   ├── page.tsx           ← landing page
│   │   ├── cookies/page.tsx
│   │   ├── ke-stazeni/page.tsx
│   │   ├── kontakt/page.tsx
│   │   ├── ochrana-osobnich-udaju/page.tsx
│   │   ├── servis/                ← prázdná složka, není stránka
│   │   ├── spolecnost/
│   │   │   ├── certifikaty/page.tsx
│   │   │   └── o-nas/page.tsx
│   │   └── vyroba/
│   │       ├── page.tsx           ← seznam kategorií
│   │       └── [category]/
│   │           ├── page.tsx       ← detail kategorie
│   │           └── [group]/page.tsx  ← detail skupiny výrobků
│   └── api/
│       ├── news/route.ts          ← proxy na mandik.online
│       ├── portfolio/route.ts     ← proxy
│       └── translate-path/route.ts ← překlad URL mezi locale
├── components/
│   ├── layout/
│   │   ├── Header.tsx            ← navigace + LangSwitcher
│   │   └── Footer.tsx            ← patička 5-sloupcová
│   ├── sections/                 ← sekce landing page
│   │   ├── Hero.tsx              ← fullscreen video
│   │   ├── Products.tsx          ← grid kategorií
│   │   ├── News.tsx              ← novinky
│   │   └── Certifications.tsx
│   └── ui/
│       ├── ContactMap.tsx        ← Leaflet mapa
│       ├── ContactSection.tsx    ← obal mapy + karet
│       ├── CookieBanner.tsx      ← cookie consent + nastavení
│       ├── OpenCookieSettings.tsx ← tlačítko pro otevření nastavení
│       └── ImageGallery.tsx
├── lib/
│   ├── api.ts                    ← všechny fetch fce do mandik.online
│   ├── contacts.ts               ← editovatelná data poboček + osob
│   ├── milestones.ts             ← editovatelná data milníků
│   └── types.ts                  ← TypeScript interface pro API
├── messages/                     ← překlady next-intl
│   ├── cs.json
│   ├── en.json
│   ├── de.json
│   └── uk.json
├── public/                       ← statické soubory, loga, favicon
├── i18n.ts                       ← next-intl konfigurace
├── middleware.ts                 ← next-intl middleware (vyloučeno /api)
├── routing.ts                    ← lokalizační routing
├── tailwind.config.ts
├── next.config.mjs
└── .env.local                    ← PORTFOLIO_TOKEN=<bearer>
```

### Lokalizace (next-intl)

- **Jazyky:** `cs` (výchozí), `en`, `de`, `uk`
- URL: `/cs/...`, `/en/...`, `/de/...`, `/uk/...`
- Auto-detekce jazyka prohlížeče
- Texty UI v `messages/{locale}.json`
- **Server komponenty** používají `getTranslations()` / `getLocale()` z `next-intl/server`
- **Klientské komponenty** používají `useTranslations()` / `useLocale()` z `next-intl`

### Middleware (důležité)

`middleware.ts` matcher **vylučuje `/api`**, jinak by next-intl chytal API requesty:

```ts
matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"]
```

---

## 5. CMS – mandik.online API

**Base URL:** `https://mandik.info/api/v1/ltu`
**Auth:** `Authorization: Bearer <PORTFOLIO_TOKEN>` (v `.env.local`)

Všechny fetch funkce jsou v `lib/api.ts`:

| Funkce                | Endpoint                          | Vrací               | Cache    |
|-----------------------|-----------------------------------|---------------------|----------|
| `fetchPortfolio`      | `/portfolio/?locale={l}`          | `Category[]`        | 600 s    |
| `fetchNews`           | `/news/?locale={l}`               | `NewsItem[]`        | 600 s    |
| `fetchCertifications` | `/certifications/?locale={l}`     | `Certification[]`   | 3600 s   |
| `fetchDownloads`      | `/resources/downloads`            | `Resource[]`        | 3600 s   |
| `fetchDocuments`      | `/resources/documents`            | `Resource[]` (s fallbackem na cs) | 3600 s |
| `fetchEpd`            | `/resources/epd`                  | `Resource[]` (s fallbackem na cs) | 3600 s |
| `fetchCertificates`   | `/resources/certificates`         | `Resource[]` (s fallbackem na cs) | 3600 s |

### Důležitá vlastnost API

- Některé endpointy nevrací `?locale=`, místo toho vrací všechno + filtruje se na frontendu (`r.locale === locale`)
- Pokud chybí `cs` fallback → prázdné pole
- `public_id` je stabilní napříč locale → použito pro **URL translate** (viz `app/api/translate-path/route.ts`)

---

## 6. Hotové funkcionality (✅)

### Layout
- ✅ Header – fixní, transparentní pozadí, dropdown menu (Naše společnost, Výrobky), přepínač jazyků s vlajkami (flagcdn.com)
- ✅ Footer – 5 sloupců (Logo+popis, Výrobky, Podpora, Společnost, Právní), brand-blue pozadí
- ✅ Mobilní navigace – hamburger menu s rozbalovacími sekcemi
- ✅ Cookie banner + nastavení (4 kategorie: nutné/preferenční/analytické/marketingové), localStorage persistence

### Stránky
| URL                                | Status | Poznámka                                       |
|------------------------------------|--------|------------------------------------------------|
| `/[locale]`                        | ✅     | Hero + Výrobky + Novinky + Certifikace         |
| `/[locale]/spolecnost/o-nas`       | ✅     | Text + vertikální timeline z `lib/milestones.ts` |
| `/[locale]/spolecnost/certifikaty` | ✅     | EPD banner + EPD karty + ISO certifikáty + dokumenty |
| `/[locale]/vyroba`                 | ✅     | Grid kategorií                                 |
| `/[locale]/vyroba/[category]`      | ✅     | Grid skupin výrobků (image cover, no text)     |
| `/[locale]/vyroba/[category]/[group]` | ✅  | Detail skupiny + galerie + parametry + downloads |
| `/[locale]/ke-stazeni`             | ✅     | Programy + dokumenty                           |
| `/[locale]/kontakt`                | ✅     | Interaktivní mapa (Leaflet) + karty poboček    |
| `/[locale]/cookies`                | ✅     | Texty + tlačítko pro otevření cookie nastavení |
| `/[locale]/ochrana-osobnich-udaju` | ✅     | GDPR text                                      |

### UI komponenty
- ✅ Language switcher s flagcdn.com vlajkami
- ✅ Translate-path API (`/api/translate-path`) – při změně jazyka přeloží URL slug podle `public_id`
- ✅ Hover dropdowny na desktopu (s 150ms delay)
- ✅ Click dropdowny na mobilu

---

## 7. Nedokončené stránky (❌)

- ❌ `/[locale]/servis` – složka existuje, **prázdná**
- ❌ `/[locale]/spolecnost/novinky` – v navigaci, neexistuje
- ❌ `/[locale]/spolecnost/reference` – v patičce, neexistuje
- ❌ `/[locale]/spolecnost/kariera` – v navigaci, neexistuje
- ❌ `/[locale]/spolecnost/za-podpory-eu` – v patičce, neexistuje
- ❌ `/[locale]/whistleblowing` – v patičce, neexistuje
- ❌ Lokalizace – řada hardcoded českých textů na stránkách (Cookies, GDPR, breadcrumby) by měla projít přes next-intl
- ❌ Vercel deployment + nastavení domén

---

## 8. Editovatelná data (mimo CMS)

Jsou v souborech, které edituje vývojář (později migrace do mandik.online):

### `lib/milestones.ts`
Pole milníků pro stránku „O nás" (timeline). Struktura:
```ts
{ year: number, title: string, description?: string }
```
Aktuálně 16 záznamů 1989-2023.

### `lib/contacts.ts`
Lokace + osoby pro stránku „Kontakt". Struktura:
```ts
Location { id, company, name, address, city, lat, lng, phone, email }
Person { name, position, email, phone?, mobile?, locationId, department? }
```
Helper fce: `getPeopleByLocation()`, `getPeopleByDepartment()`.

---

## 9. Cookie consent systém

### Komponenta `CookieBanner.tsx`
- Zobrazí se při první návštěvě (žádný `mandik_cookie_consent` v localStorage)
- 3 hlavní akce: **Přijmout vše** / **Odmítnout** / **Nastavení**
- Modal s nastavením má 4 přepínače:
  1. **Technické** (necessary) – vždy `true`, nelze vypnout
  2. **Preferenční** (preferences)
  3. **Analytické** (analytics)
  4. **Marketingové** (marketing)
- Souhlas se ukládá jako JSON v `localStorage` pod klíčem `mandik_cookie_consent`

### Stránka `/cookies` má tlačítko `OpenCookieSettings.tsx`
- Po kliknutí smaže `localStorage` → `window.location.reload()` → banner se znovu zobrazí

> ⚠️ **Není zatím napojené na žádné GA / FB Pixel skripty.** Až budou skripty přidány, je třeba je inicializovat podle hodnot v `mandik_cookie_consent`.

---

## 10. Architektonická rozhodnutí

### Server vs. Client komponenty
- **Default = Server Component** (žádné `"use client"`)
- `"use client"` jen tam, kde je interaktivita: Header (dropdowny), CookieBanner, ContactMap, ContactSection, ImageGallery, OpenCookieSettings
- Layout (`app/[locale]/layout.tsx`) je server, fetchuje portfolio a předává do Headeru/Footeru

### Translate-path API endpoint
Důvod existence: když uživatel změní jazyk z `/cs/vyroba/pozarni-technika` na EN, slug `pozarni-technika` se v EN jmenuje jinak. API načte portfolio pro všechny locale, najde kategorii podle stabilního `public_id` a vrátí mapu `{cs, en, de, uk}` s novými URL.

### `next.config.mjs` – obrázky z externích domén
Whitelistované domény pro `<Image>`: `flagcdn.com`, `wi1rvkmguv1ndwwa.public.blob.vercel-storage.com`, `mandik.info` apod. Při přidávání nového zdroje obrázků **přidat do `images.remotePatterns`**.

### Leaflet CSS import
V `ContactMap.tsx` je dynamický import s `@ts-expect-error` komentářem (CSS modul nemá typy). Nepřidávat zpátky `@ts-ignore` – ESLint chyba.

---

## 11. Známé problémy / gotchas

1. **`.next` cache se občas poškodí** – projevuje se jako `Cannot find module ./vendor-chunks/...`. Řešení: smazat složku `.next` a restartovat dev server.

2. **Next.js 14 + React 18 + react-leaflet 5** – peer dependency conflict. Instalovat jen s `npm install --legacy-peer-deps`.

3. **next-intl middleware vs. API routes** – pokud někdo přidá novou API route a nebude fungovat, ověřit matcher v `middleware.ts`.

4. **API mandik.info** – některé endpointy vrací HTML místo JSON při chybě. `lib/api.ts` má všude `try/catch` s fallbackem na `[]`.

5. **Hardcoded české texty** – stránky Cookies, GDPR a breadcrumby jsou jen česky. EN/DE/UK ještě nemá překlad. Při přidávání nových stránek **používat `useTranslations`** od začátku.

6. **Server musí běžet na portu 3000 (preview tool)** – pokud port obsadí jiný proces, je nutné ho killnout přes PowerShell:
   ```powershell
   Get-NetTCPConnection -LocalPort 3000 -State Listen | Select -Exp OwningProcess | % { Stop-Process -Id $_ -Force }
   ```

---

## 12. Otevřená rozhodnutí (čekají na klienta)

### a) Centralizovaný překlad textů
Diskutovaná architektura:
- **Krátké UI texty** → `messages/*.json` (next-intl)
  - Dočasně synchronizováno z **Google Sheets** přes build-time skript
  - Cílově endpoint na `mandik.online`: `GET /api/i18n/keys`
- **Dlouhé texty stránek** (Cookies, GDPR, O nás, …) → CMS dokumenty
  - Endpoint: `GET /api/pages/{slug}` s rich textem v `body`
- Důvod rozdělení: 50 klíčů GDPR v JSON je neudržitelné, rich text v CMS je editovatelnější

### b) Mapa kontaktu – tmavý styl
Klient ukázal ref. web s **MapLibre + MapTiler** (vektorové dlaždice, tmavá mapa, zvýraznění hranic ČR).
- Aktuálně Leaflet + OSM (free)
- MapTiler má free tier (100k tile loads/měsíc) – pravděpodobně by stačil
- Alternativa: **OpenFreeMap** (úplně zdarma, bez API klíče)
- Klient si „promyslí, dořešíme později"

---

## 13. Spuštění projektu

```bash
cd mandik-web
npm install --legacy-peer-deps
npm run dev      # dev server na portu 3000
npm run build    # production build
npm run lint     # ESLint check
```

### Environment proměnné (`.env.local`)
```
PORTFOLIO_TOKEN=<bearer token od mandik.info>
```

---

## 14. Užitečné externí odkazy

- **CMS:** https://mandik.online
- **Hero video:** https://wi1rvkmguv1ndwwa.public.blob.vercel-storage.com/homepage-video-YI4aAQqFws1Ehk0wH1mSUkGcwAaCDC.webm
- **Virtuální showroom:** https://my.matterport.com/show/?m=MW8NFZmbZoo
- **Referenční web 1:** https://mandik-prod.vercel.app/cz/kontakt
- **Referenční web 2:** https://mandik-web-34065183408.europe-west1.run.app/#/
- **flagcdn.com** – vlajky pro language switcher
- **OpenStreetMap** – tile provider pro Leaflet

---

## 15. Doporučený další postup

V tomto pořadí (od nejvyšší priority):

1. **Vytvořit chybějící stránky** se zástupným obsahem (servis, novinky, reference, kariéra, whistleblowing, EU podpora) – aby nebyly v navigaci/patičce mrtvé linky
2. **Lokalizace existujících stránek** – Cookies, GDPR, breadcrumby přes `useTranslations`
3. **Vyřešit centralizaci textů** – napojit Google Sheets jako dočasný translation source
4. **Dokončit mapu** – rozhodnout free vs. MapTiler, případně přejít na MapLibre
5. **Stránka Novinky** – fetch z `mandik.info` (existuje endpoint), detail článku
6. **Reference** – pravděpodobně další CMS endpoint
7. **Vercel deploy + custom doména** mandik.com

---

## 16. Tipy pro AI asistenta

- Používej **Glob/Grep** předtím než cokoli edituješ – struktura projektu je zavedená, držte se konvencí
- **Server Components** jsou default, `"use client"` jen pokud opravdu třeba
- Tlačítka, karty, dropdowny – sjednotit s existujícími styly: `rounded-lg`, `border border-gray-100`, `hover:border-brand-green`, `transition-colors`
- Při novém UI prvku se podívat na existující komponenty (`ContactSection`, `Header`) jako referenci stylů
- **Nikdy nekomitovat `.env.local`**
- Při Tailwindu preferovat brand-* třídy před hardcoded hex (kromě `#74d1ea` který v configu chybí)
- **CLAUDE.md** v parent dir (`MANDIK web v4/CLAUDE.md`) má pravidla projektu z pohledu klienta – respektovat
