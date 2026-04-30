"use client";

import { useEffect, useRef, useState } from "react";
import type { Location } from "@/lib/contacts";

// Leaflet se importuje dynamicky pouze na klientu
let L: typeof import("leaflet") | null = null;

interface Props {
  locations: Location[];
  activeId?: string | null;
  onMarkerClick?: (id: string) => void;
}

export default function ContactMap({ locations, activeId, onMarkerClick }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const [ready, setReady] = useState(false);

  // Inicializace mapy
  useEffect(() => {
    if (!mapRef.current) return;

    let cancelled = false;

    (async () => {
      // Dynamický import leaflet (SSR-safe)
      const leaflet = await import("leaflet");
      // CSS pro leaflet
      // @ts-expect-error – CSS import nemá typovou deklaraci
      await import("leaflet/dist/leaflet.css");
      L = leaflet;

      if (cancelled || !mapRef.current) return;

      // Defaultní ikona fix pro webpack/next.js
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      // Vytvoření mapy
      const map = leaflet.map(mapRef.current, {
        scrollWheelZoom: false,
      });

      leaflet
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        })
        .addTo(map);

      // Vytvoření vlastní ikony
      const defaultIcon = leaflet.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });

      // Přidání markerů
      const bounds: [number, number][] = [];
      for (const loc of locations) {
        const marker = leaflet.marker([loc.lat, loc.lng], { icon: defaultIcon }).addTo(map);
        marker.bindPopup(
          `<div style="font-family: Arial, sans-serif; min-width: 160px;">
            <strong style="color: #506077;">${loc.company}</strong><br/>
            <span style="font-size: 12px; color: #666;">${loc.name}</span><br/>
            <span style="font-size: 12px;">${loc.address}<br/>${loc.city}</span>
          </div>`
        );
        marker.on("click", () => {
          onMarkerClick?.(loc.id);
        });
        markersRef.current.set(loc.id, marker);
        bounds.push([loc.lat, loc.lng]);
      }

      // Fit bounds na všechny markery
      if (bounds.length > 1) {
        map.fitBounds(bounds as L.LatLngBoundsExpression, { padding: [50, 50] });
      } else if (bounds.length === 1) {
        map.setView(bounds[0] as L.LatLngExpression, 10);
      }

      mapInstance.current = map;
      setReady(true);
    })();

    return () => {
      cancelled = true;
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
      markersRef.current.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reakce na změnu activeId — přelétne na daný marker
  useEffect(() => {
    if (!ready || !activeId || !mapInstance.current || !L) return;
    const loc = locations.find((l) => l.id === activeId);
    const marker = markersRef.current.get(activeId);
    if (loc && marker) {
      mapInstance.current.flyTo([loc.lat, loc.lng], loc.zoom ?? 14, { duration: 0.8 });
      marker.openPopup();
    }
  }, [activeId, ready, locations]);

  return (
    <div
      ref={mapRef}
      className="w-full h-full rounded-xl overflow-hidden bg-gray-100"
      style={{ minHeight: 400 }}
    />
  );
}
