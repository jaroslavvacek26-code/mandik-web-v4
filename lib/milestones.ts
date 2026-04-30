/**
 * Firemní milníky pro stránku "O nás".
 *
 * EDITACE: Pro přidání/odebrání milníku stačí upravit pole MILESTONES níže.
 * Milníky se na stránce zobrazí od nejnovějšího po nejstarší.
 */

export interface Milestone {
  year: number;
  title: string;
  description?: string;
}

export const MILESTONES: Milestone[] = [
  {
    year: 2023,
    title: "Miliardový obrat",
    description: "Poprvé v historii společnosti překročen roční obrat 1 mld Kč.",
  },
  {
    year: 2022,
    title: "Nové vedení společnosti",
    description: "Řízení společnosti přebírá Mgr. Jan Mičan.",
  },
  {
    year: 2016,
    title: "Export dosahuje 70 % obratu",
    description: "Výrobky MANDÍK směřují do desítek zemí po celém světě.",
  },
  {
    year: 2015,
    title: "Dodávka pro Černobyl",
    description: "Dodávka speciálních komponentů pro nový bezpečnostní kryt v Černobylu. Počet zaměstnanců přesahuje 200.",
  },
  {
    year: 2012,
    title: "Mezinárodní projekt ITER",
    description: "MANDÍK se stává dodavatelem pro mezinárodní termonukleární experimentální reaktor ITER ve Francii.",
  },
  {
    year: 2010,
    title: "Švýcarské tunely",
    description: "Osazování požárních klapek do švýcarských dopravních tunelů.",
  },
  {
    year: 2009,
    title: "Obrat 239 mil Kč",
    description: "Výrazná expanze na evropské trhy.",
  },
  {
    year: 2008,
    title: "Generační změna",
    description: "Řízení společnosti přebírá Mgr. Marcel Mandík, syn zakladatele.",
  },
  {
    year: 2006,
    title: "Stěhování do nových prostor",
    description: "Přesun výroby do moderního areálu v Hostomicích.",
  },
  {
    year: 2005,
    title: "Finská jaderná elektrárna Olkiluoto",
    description: "Dodávka požárních a vzduchotechnických komponentů pro jadernou elektrárnu ve Finsku.",
  },
  {
    year: 2004,
    title: "Pražské metro",
    description: "Dodávka požárních klapek pro stanice pražského metra.",
  },
  {
    year: 2002,
    title: "Transformace na akciovou společnost",
    description: "MANDÍK se transformuje na a.s. a posiluje svou pozici na trhu.",
  },
  {
    year: 1996,
    title: "Jaderná elektrárna Temelín",
    description: "První velká zakázka – dodávka komponentů pro jadernou elektrárnu Temelín.",
  },
  {
    year: 1993,
    title: "Zahájení výroby protipožárních klapek",
    description: "Obrat dosahuje 79 mil Kč. Začíná specializace na protipožární techniku.",
  },
  {
    year: 1991,
    title: "Růst firmy",
    description: "Obrat cca 5 mil Kč, 10 zaměstnanců, drobné zámečnické a vzduchotechnické práce.",
  },
  {
    year: 1989,
    title: "Založení firmy",
    description: "Vlastimil Mandík začíná podnikat jako OSVČ v garáži s půjčkou 20 tisíc Kč.",
  },
];
