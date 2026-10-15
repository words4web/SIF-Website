import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALES, LOCALE_COOKIE, Locale } from "./config";
import enMessages from "../messages/en.json";
import itMessages from "../messages/it.json";

const messagesMap: Record<Locale, any> = {
  en: enMessages,
  it: itMessages,
};

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale: Locale = LOCALES.includes(localeCookie as Locale)
    ? (localeCookie as Locale)
    : DEFAULT_LOCALE;

  return {
    locale,
    messages: messagesMap[locale] || enMessages,
  };
});
