"use client";

import { createContext, useContext } from "react";

type MessageValue = string | number | boolean | null | MessageObject | MessageValue[];
type MessageObject = { [key: string]: MessageValue };

type TranslationValues = Record<string, string | number>;

interface I18nContextValue {
  locale: string;
  messages: MessageObject;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function getNestedValue(source: MessageValue | undefined, path: string): MessageValue | undefined {
  return path.split(".").reduce<MessageValue | undefined>((current, key) => {
    if (!current || typeof current !== "object" || Array.isArray(current)) {
      return undefined;
    }

    return (current as MessageObject)[key];
  }, source);
}

function interpolate(message: string, values?: TranslationValues) {
  if (!values) return message;

  return message.replace(/\{(\w+)\}/g, (_, key: string) => {
    const value = values[key];
    return value === undefined ? `{${key}}` : String(value);
  });
}

export function I18nProvider({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: MessageObject;
}) {
  return (
    <I18nContext.Provider value={{ locale, messages }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useLocale must be used within I18nProvider");
  }

  return context.locale;
}

export function useTranslations(namespace?: string) {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useTranslations must be used within I18nProvider");
  }

  const root = namespace
    ? getNestedValue(context.messages, namespace)
    : context.messages;

  return (key: string, values?: TranslationValues) => {
    const value = getNestedValue(root, key);
    return typeof value === "string" ? interpolate(value, values) : key;
  };
}
