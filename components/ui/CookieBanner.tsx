"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "@/lib/i18n-client";

interface CookieConsent {
  necessary: boolean;     // vždy true, nelze vypnout
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

const STORAGE_KEY = "mandik_cookie_consent";

function loadConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveConsent(consent: CookieConsent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
}

export default function CookieBanner() {
  const locale = useLocale();
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    const saved = loadConsent();
    if (!saved) {
      // Žádný uložený souhlas → zobrazit banner
      setVisible(true);
    } else {
      setConsent(saved);
    }
  }, []);

  function acceptAll() {
    const full: CookieConsent = { necessary: true, analytics: true, marketing: true, preferences: true };
    saveConsent(full);
    setConsent(full);
    setVisible(false);
    setSettingsOpen(false);
  }

  function rejectAll() {
    const minimal: CookieConsent = { necessary: true, analytics: false, marketing: false, preferences: false };
    saveConsent(minimal);
    setConsent(minimal);
    setVisible(false);
    setSettingsOpen(false);
  }

  function saveSettings() {
    saveConsent(consent);
    setVisible(false);
    setSettingsOpen(false);
  }

  if (!visible) return null;

  return (
    <>
      {/* Overlay pro nastavení */}
      {settingsOpen && (
        <div className="fixed inset-0 z-[9998] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 sm:p-8">
              {/* Hlavička */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-eurostile text-xl font-bold text-brand-blue">
                  Nastavení cookies
                </h2>
                <button
                  onClick={() => setSettingsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Zavřít"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-6">
                Vyberte, které kategorie cookies chcete povolit. Technické cookies jsou nezbytné pro fungování webu a nelze je vypnout.
              </p>

              {/* Kategorie */}
              <div className="space-y-4">
                {/* Nutné */}
                <div className="flex items-start justify-between p-4 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="flex-1 pr-4">
                    <p className="font-semibold text-brand-blue text-sm">Technické (nutné)</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Zajišťují základní funkčnost webu – přihlášení, bezpečnost, jazykové nastavení. Nelze je vypnout.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <div className="w-11 h-6 rounded-full bg-brand-green flex items-center justify-end px-1 cursor-not-allowed">
                      <div className="w-4 h-4 rounded-full bg-white shadow" />
                    </div>
                  </div>
                </div>

                {/* Preferenční */}
                <CookieToggle
                  label="Preferenční"
                  description="Pamatují si vaše nastavení a preference (jazyk, region, zobrazení)."
                  checked={consent.preferences}
                  onChange={(v) => setConsent((c) => ({ ...c, preferences: v }))}
                />

                {/* Analytické */}
                <CookieToggle
                  label="Analytické"
                  description="Pomáhají nám porozumět, jak návštěvníci web používají (Google Analytics). Všechna data jsou anonymizovaná."
                  checked={consent.analytics}
                  onChange={(v) => setConsent((c) => ({ ...c, analytics: v }))}
                />

                {/* Marketingové */}
                <CookieToggle
                  label="Marketingové"
                  description="Slouží k zobrazení relevantní reklamy na základě vašich zájmů (Facebook Pixel, Bing Ads)."
                  checked={consent.marketing}
                  onChange={(v) => setConsent((c) => ({ ...c, marketing: v }))}
                />
              </div>

              {/* Tlačítka */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={saveSettings}
                  className="flex-1 px-4 py-2.5 rounded-lg border-2 border-brand-blue text-brand-blue text-sm font-semibold hover:bg-brand-blue hover:text-white transition-colors"
                >
                  Uložit nastavení
                </button>
                <button
                  onClick={rejectAll}
                  className="flex-1 px-4 py-2.5 rounded-lg border-2 border-gray-200 text-gray-600 text-sm font-semibold hover:border-gray-400 transition-colors"
                >
                  Odmítnout vše
                </button>
                <button
                  onClick={acceptAll}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-brand-green text-white text-sm font-semibold hover:bg-brand-green/90 transition-colors"
                >
                  Přijmout vše
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t-2 border-brand-green shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-semibold text-brand-blue">Používáme cookies.</span>{" "}
                Pomáhají nám zlepšovat web a zobrazovat relevantní obsah. Více informací v{" "}
                <Link
                  href={`/${locale}/cookies`}
                  className="text-brand-green font-semibold hover:underline"
                >
                  zásadách cookies
                </Link>
                .
              </p>
            </div>

            {/* Tlačítka */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => setSettingsOpen(true)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm font-medium hover:border-brand-blue hover:text-brand-blue transition-colors"
              >
                Nastavení
              </button>
              <button
                onClick={rejectAll}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm font-medium hover:border-gray-500 transition-colors"
              >
                Odmítnout
              </button>
              <button
                onClick={acceptAll}
                className="px-5 py-2 rounded-lg bg-brand-green text-white text-sm font-semibold hover:bg-brand-green/90 transition-colors"
              >
                Přijmout vše
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* Pomocný toggle komponent */
function CookieToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between p-4 rounded-lg bg-gray-50 border border-gray-100">
      <div className="flex-1 pr-4">
        <p className="font-semibold text-brand-blue text-sm">{label}</p>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`shrink-0 w-11 h-6 rounded-full transition-colors flex items-center px-1 ${
          checked ? "bg-brand-green justify-end" : "bg-gray-300 justify-start"
        }`}
        aria-checked={checked}
        role="switch"
      >
        <div className="w-4 h-4 rounded-full bg-white shadow transition-all" />
      </button>
    </div>
  );
}
