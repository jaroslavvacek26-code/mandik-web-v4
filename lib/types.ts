export interface GalleryItem {
  url: string;
  name: string;
  description?: string | null;
  index: number;
  mime_type: string;
  link?: string | null;
}

export interface IconItem {
  url: string;
  name: string;
  description?: string | null;
  index: number;
  mime_type: string;
}

export interface Download {
  type: string;
  slug: string;
  name: string;
  link: string;
  mime_type: string;
  index: number;
}

export interface Characteristic {
  level?: number;
  characteristic?: string;
  // Někdy API vrací string přímo
  [key: string]: unknown;
}

export interface ProductGroup {
  public_id: string;
  name: string;
  slug: string;
  subtitle?: string;
  index: number;
  description?: string;
  specification?: string; // HTML string
  characteristics: (Characteristic | string)[];
  gallery: GalleryItem[];
  icons: IconItem[];
  downloads: Download[];
}

export interface Subcategory {
  public_id: string;
  name: string;
  slug: string;
  description?: string | null;
  index: number;
  gallery: GalleryItem[];
  groups: ProductGroup[];
}

export interface Category {
  public_id: string;
  name: string;
  slug: string;
  description?: string;
  index: number;
  gallery: GalleryItem[];
  icons: GalleryItem[];
  subcategories: Subcategory[];
  groups: ProductGroup[];
}

// Helper: vrátí všechny groups z kategorie (přes subcategories nebo přímo)
export function getAllGroups(cat: Category): { group: ProductGroup; subcategoryName?: string }[] {
  if (cat.groups?.length > 0) {
    return cat.groups.map((group) => ({ group }));
  }
  return cat.subcategories?.flatMap((sub) =>
    sub.groups.map((group) => ({ group, subcategoryName: sub.name }))
  ) ?? [];
}

export interface Resource {
  type: string;
  title: string;
  subtitle?: string;
  description?: string;
  link: string;
  index: number;
  locale: string;
  type_name: string;
  mime_type: string;
  image_link?: string;
  size?: number;
}

export interface NewsItem {
  id: number;
  title: string;
  slug: string;
  perex?: string;
  content?: string;
  published_at?: string;
  image?: GalleryItem;
}

export interface Certification {
  id: number;
  name: string;
  logo_url: string;
  url?: string;
}

// Helper: normalizuje characteristic na string
export function charText(c: Characteristic | string): string {
  if (typeof c === "string") return c;
  return c.characteristic ?? "";
}
