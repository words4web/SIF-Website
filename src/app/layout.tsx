import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Lexend, Lato } from "next/font/google";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`bg-background ${lexend.variable} ${lato.variable}`}>
      <body className="font-sans antialiased">
        <ReduxProvider>
          <QueryProvider>
            <NotificationListener />
            {children}
          </QueryProvider>
        </ReduxProvider>
        <Toaster position="top-right" richColors />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
