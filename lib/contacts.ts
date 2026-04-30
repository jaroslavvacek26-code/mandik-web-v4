/**
 * Kontaktní data pro stránku Kontakt.
 *
 * EDITACE: Pro přidání/odebrání kontaktu stačí upravit pole LOCATIONS a PEOPLE.
 * Každá lokace má souřadnice pro mapu. Každá osoba je přiřazena k lokaci přes locationId.
 */

export interface Location {
  id: string;
  name: string;
  company: string;
  address: string;
  city: string;
  country: string;
  phone?: string;
  email?: string;
  lat: number;
  lng: number;
  zoom?: number;
}

export interface Person {
  name: string;
  position: string;
  department: string;
  phone?: string;
  mobile?: string;
  email: string;
  locationId: string;
}

// ──────────────────────────────────────────────
// LOKACE (pobočky)
// ──────────────────────────────────────────────
export const LOCATIONS: Location[] = [
  {
    id: "hostomice",
    name: "Sídlo a výrobní závod",
    company: "MANDÍK a.s.",
    address: "Dobříšská 550",
    city: "267 24 Hostomice",
    country: "Česká republika",
    phone: "+420 318 591 111",
    email: "mandik@mandik.cz",
    lat: 49.8093,
    lng: 14.0440,
    zoom: 15,
  },
  {
    id: "praha",
    name: "Obchodní kancelář Praha",
    company: "MANDÍK a.s.",
    address: "Geologická 575/2",
    city: "152 00 Praha 5 – Barrandov",
    country: "Česká republika",
    phone: "+420 251 019 207",
    email: "mandik@mandik.cz",
    lat: 50.0334,
    lng: 14.3859,
    zoom: 15,
  },
  {
    id: "de",
    name: "Zastoupení Německo",
    company: "Mandik GmbH",
    address: "Zschopauer Str. 216",
    city: "09126 Chemnitz",
    country: "Deutschland",
    phone: "+49 371 539 898 12",
    email: "info@mandik.de",
    lat: 50.8098,
    lng: 12.9480,
    zoom: 15,
  },
];

// ──────────────────────────────────────────────
// LIDÉ (kontakty)
// ──────────────────────────────────────────────
export const PEOPLE: Person[] = [
  // Vedení
  {
    name: "Ing. Jan Bartoň",
    position: "Generální ředitel",
    department: "Vedení společnosti",
    phone: "+420 318 591 101",
    email: "barton@mandik.cz",
    locationId: "hostomice",
  },
  // Obchod
  {
    name: "Pavel Plavec",
    position: "Obchodní ředitel",
    department: "Obchod",
    phone: "+420 318 591 120",
    mobile: "+420 724 291 025",
    email: "plavec@mandik.cz",
    locationId: "hostomice",
  },
  {
    name: "Lukáš Hájek",
    position: "Vedoucí obchodního oddělení",
    department: "Obchod",
    phone: "+420 318 591 131",
    email: "hajek@mandik.cz",
    locationId: "hostomice",
  },
  // Technické oddělení
  {
    name: "Ing. Jiří Šanda",
    position: "Technický ředitel",
    department: "Technika",
    phone: "+420 318 591 140",
    email: "sanda@mandik.cz",
    locationId: "hostomice",
  },
  // Servis
  {
    name: "Zdeněk Havlíček",
    position: "Vedoucí servisu",
    department: "Servis",
    phone: "+420 318 591 170",
    mobile: "+420 602 428 585",
    email: "havlicek@mandik.cz",
    locationId: "hostomice",
  },
  // Praha
  {
    name: "Ing. Radek Valenta",
    position: "Obchodní manažer",
    department: "Obchod",
    phone: "+420 251 019 207",
    email: "valenta@mandik.cz",
    locationId: "praha",
  },
  // Německo
  {
    name: "Robert Heinrich",
    position: "Geschäftsführer",
    department: "Obchod",
    phone: "+49 371 539 898 12",
    email: "heinrich@mandik.de",
    locationId: "de",
  },
];

// Seskupení lidí dle oddělení
export function getPeopleByDepartment(): { department: string; people: Person[] }[] {
  const map = new Map<string, Person[]>();
  for (const p of PEOPLE) {
    if (!map.has(p.department)) map.set(p.department, []);
    map.get(p.department)!.push(p);
  }
  return Array.from(map.entries()).map(([department, people]) => ({ department, people }));
}

// Seskupení lidí dle lokace
export function getPeopleByLocation(): { location: Location; people: Person[] }[] {
  return LOCATIONS.map((loc) => ({
    location: loc,
    people: PEOPLE.filter((p) => p.locationId === loc.id),
  }));
}
