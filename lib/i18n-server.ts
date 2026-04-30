// Server-side překlady bez next-intl/server.
// next-intl/server interně používá __dirname, který padá na Vercel.
// Tento helper přímo načítá messages z JSON souborů.

const messageLoaders = {
  cs: () => import("@/messages/cs.json"),
  en: () => import("@/messages/en.json"),
  de: () => import("@/messages/de.json"),
  uk: () => import("@/messages/uk.json"),
} as const;

type Locale = keyof typeof messageLoaders;
type MessageValue = string | number | boolean | null | MessageObject | MessageValue[];
type MessageObject = { [key: string]: MessageValue };

const validLocales = ["cs", "en", "de", "uk"] as const;

export function normalizeLocale(locale: string): Locale {
  return (validLocales as readonly string[]).includes(locale)
    ? (locale as Locale)
    : "cs";
}

export async function getMessages(locale: string): Promise<MessageObject> {
  const validLocale = normalizeLocale(locale);
  const mod = await messageLoaders[validLocale]();
  return mod.default as MessageObject;
}

function getNestedValue(source: MessageValue | undefined, path: string): MessageValue | undefined {
  return path.split(".").reduce<MessageValue | undefined>((current, key) => {
    if (!current || typeof current !== "object" || Array.isArray(current)) {
      return undefined;
    }

    return (current as MessageObject)[key];
  }, source);
}

/** Vrátí t() funkci pro danou locale a volitelný namespace. */
export async function getT(locale: string, namespace?: string) {
  const messages = await getMessages(locale);
  const root = namespace
    ? getNestedValue(messages, namespace)
    : messages;

  return function t(key: string): string {
    const value = getNestedValue(root, key);
    return typeof value === "string" ? value : key;
  };
}
