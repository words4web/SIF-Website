import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Lexend, Lato } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ReduxProvider } from "@/providers/redux-provider";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "sonner";
import { NotificationListener } from "@/components/common/notification-listener";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-lexend",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Shelly Indian Foods — B2B Wholesale Ordering Portal",
  description:
    "Exclusive distributor of Tata Consumer Products in Italy. Browse the authentic Shelly Indian Foods wholesale catalogue, build your order, and arrange delivery to your business.",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8f2" },
    { media: "(prefers-color-scheme: dark)", color: "#1a201c" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`bg-background ${lexend.variable} ${lato.variable}`}>
      <body className="font-sans antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ReduxProvider>
            <QueryProvider>
              <NotificationListener />
              {children}
            </QueryProvider>
          </ReduxProvider>
        </NextIntlClientProvider>
        <Toaster position="top-right" richColors />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
