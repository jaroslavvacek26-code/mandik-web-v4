import type { Category, NewsItem, Certification, Resource } from "./types";

const API_BASE = "https://mandik.info/api/v1/ltu";

function serverHeaders(): HeadersInit {
  return { Authorization: `Bearer ${process.env.PORTFOLIO_TOKEN ?? ""}` };
}

/** Portfolio – kategorie výrobků */
export async function fetchPortfolio(locale: string): Promise<Category[]> {
  try {
    const res = await fetch(`${API_BASE}/portfolio/?locale=${locale}`, {
      headers: serverHeaders(),
      next: { revalidate: 600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : data.results ?? [];
  } catch {
    return [];
  }
}

/** Novinky */
export async function fetchNews(locale: string): Promise<NewsItem[]> {
  try {
    const res = await fetch(`${API_BASE}/news/?locale=${locale}`, {
      headers: serverHeaders(),
      next: { revalidate: 600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : data.results ?? [];
  } catch {
    return [];
  }
}

/** Certifikace */
export async function fetchCertifications(locale: string): Promise<Certification[]> {
  try {
    const res = await fetch(`${API_BASE}/certifications/?locale=${locale}`, {
      headers: serverHeaders(),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : data.results ?? [];
  } catch {
    return [];
  }
}

/** Ke stažení – programy a soubory */
export async function fetchDownloads(locale: string): Promise<Resource[]> {
  try {
    const res = await fetch(`${API_BASE}/resources/downloads`, {
      headers: serverHeaders(),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data: Resource[] = await res.json();
    return data.filter((r) => r.locale === locale);
  } catch {
    return [];
  }
}

/** Dokumenty */
export async function fetchDocuments(locale: string): Promise<Resource[]> {
  try {
    const res = await fetch(`${API_BASE}/resources/documents`, {
      headers: serverHeaders(),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data: Resource[] = await res.json();
    const filtered = data.filter((r) => r.locale === locale);
    return filtered.length > 0 ? filtered : data.filter((r) => r.locale === "cs");
  } catch {
    return [];
  }
}

/** EPD – Environmentální prohlášení o produktu */
export async function fetchEpd(locale: string): Promise<Resource[]> {
  try {
    const res = await fetch(`${API_BASE}/resources/epd`, {
      headers: serverHeaders(),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data: Resource[] = await res.json();
    const filtered = data.filter((r) => r.locale === locale);
    return filtered.length > 0 ? filtered : data.filter((r) => r.locale === "cs");
  } catch {
    return [];
  }
}

/** Certifikáty ISO */
export async function fetchCertificates(locale: string): Promise<Resource[]> {
  try {
    const res = await fetch(`${API_BASE}/resources/certificates`, {
      headers: serverHeaders(),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data: Resource[] = await res.json();
    // Certifikáty jsou locale-agnostic, fallback na cs
    const filtered = data.filter((r) => r.locale === locale);
    return filtered.length > 0 ? filtered : data.filter((r) => r.locale === "cs");
  } catch {
    return [];
  }
}
