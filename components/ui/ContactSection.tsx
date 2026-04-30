"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { Location, Person } from "@/lib/contacts";

// Dynamický import mapy (SSR-off) – Leaflet vyžaduje window
const ContactMap = dynamic(() => import("./ContactMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-xl bg-gray-100 flex items-center justify-center min-h-[400px]">
      <span className="text-gray-400 text-sm">Načítám mapu…</span>
    </div>
  ),
});

interface LocationGroup {
  location: Location;
  people: Person[];
}

export default function ContactSection({
  groups,
}: {
  groups: LocationGroup[];
}) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="space-y-16">
      {/* Mapa */}
      <div className="h-[450px] sm:h-[500px] rounded-xl overflow-hidden shadow-sm border border-gray-100">
        <ContactMap
          locations={groups.map((g) => g.location)}
          activeId={activeId}
          onMarkerClick={(id) => {
            setActiveId(id);
            // Scrolluj na odpovídající kontakt kartu
            const el = document.getElementById(`loc-${id}`);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
          }}
        />
      </div>

      {/* Pobočky + kontakty */}
      <div className="space-y-12">
        {groups.map(({ location, people }) => (
          <section
            key={location.id}
            id={`loc-${location.id}`}
            className={`rounded-xl border transition-all duration-300 ${
              activeId === location.id
                ? "border-brand-green shadow-md bg-green-50/30"
                : "border-gray-100 bg-white"
            }`}
          >
            {/* Hlavička pobočky */}
            <button
              onClick={() => setActiveId(location.id)}
              className="w-full text-left p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 cursor-pointer hover:bg-gray-50/50 transition-colors rounded-t-xl"
            >
              <div className="flex items-center gap-3">
                {/* Pin ikona */}
                <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-eurostile text-xl font-bold text-brand-blue">{location.company}</h2>
                  <p className="text-sm text-brand-green font-medium">{location.name}</p>
                </div>
              </div>

              <div className="sm:ml-auto flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-600">
                <span>{location.address}, {location.city}</span>
                {location.phone && (
                  <a href={`tel:${location.phone.replace(/\s/g, "")}`} className="hover:text-brand-green transition-colors" onClick={(e) => e.stopPropagation()}>
                    {location.phone}
                  </a>
                )}
                {location.email && (
                  <a href={`mailto:${location.email}`} className="hover:text-brand-green transition-colors" onClick={(e) => e.stopPropagation()}>
                    {location.email}
                  </a>
                )}
              </div>

              {/* Zobrazit na mapě text */}
              <span className="text-xs text-brand-green font-semibold shrink-0 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Zobrazit na mapě
              </span>
            </button>

            {/* Kontakty v pobočce */}
            {people.length > 0 && (
              <div className="border-t border-gray-100 p-6 sm:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {people.map((person) => (
                    <div
                      key={person.email}
                      className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <p className="font-semibold text-brand-blue text-sm">{person.name}</p>
                      <p className="text-xs text-brand-green font-medium mt-0.5">{person.position}</p>
                      <div className="mt-3 space-y-1 text-xs text-gray-600">
                        {person.phone && (
                          <p className="flex items-center gap-2">
                            <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <a href={`tel:${person.phone.replace(/\s/g, "")}`} className="hover:text-brand-green transition-colors">
                              {person.phone}
                            </a>
                          </p>
                        )}
                        {person.mobile && (
                          <p className="flex items-center gap-2">
                            <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            <a href={`tel:${person.mobile.replace(/\s/g, "")}`} className="hover:text-brand-green transition-colors">
                              {person.mobile}
                            </a>
                          </p>
                        )}
                        <p className="flex items-center gap-2">
                          <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <a href={`mailto:${person.email}`} className="hover:text-brand-green transition-colors">
                            {person.email}
                          </a>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
