export type Locale = "en" | "it";

export const LOCALES: Locale[] = ["en", "it"];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const LOCALE_LABELS: Record<
  Locale,
  { label: string; flag: string; nativeName: string }
> = {
  en: {
    label: "English",
    flag: "🇬🇧",
    nativeName: "English",
  },
  it: {
    label: "Italiano",
    flag: "🇮🇹",
    nativeName: "Italiano",
  },
};
