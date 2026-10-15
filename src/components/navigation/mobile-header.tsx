"use client";

import Link from "next/link";
import Image from "next/image";
import { Bell, Search } from "lucide-react";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { RootState } from "@/lib/store";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";
import { HEADER_UTILITIES } from "@/data/navigation";
import { LanguageSwitcher } from "@/components/common/language-switcher";

export function MobileHeader() {
  const t = useTranslations("navigation");
  const { user } = useAuth();
  const unreadCount = useSelector(
    (state: RootState) => state?.notification?.unreadCount,
  );

  return (
    <header className="sticky top-0 z-40 block md:hidden border-b border-border/60 bg-background/95 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-3">
        <Link
          href={ROUTES.HOME}
          className="flex min-w-0 items-center py-1"
          aria-label="Shelly Indian Foods home">
          <Image
            src="/logo.png"
            alt="Shelly Indian Foods Logo"
            width={72}
            height={72}
            className="h-10 w-auto shrink-0 object-contain"
            priority
          />
        </Link>

        <div className="flex items-center gap-1.5">
          <LanguageSwitcher variant="mobile" />

          <Link
            href={HEADER_UTILITIES.search.href}
            aria-label={t("searchAria")}
            className="flex size-9 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground active:scale-95 transition-all">
            <Search className="size-4" />
          </Link>

          {user && (
            <Link
              href={ROUTES.NOTIFICATIONS}
              className="relative flex size-9 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground active:scale-95 transition-all"
              aria-label={t("notificationsAria", {
                count: unreadCount > 0 ? `(${unreadCount} unread)` : "",
              })}>
              <Bell className="size-4" />
              {unreadCount > 0 && (
                <span className="absolute top-0.5 right-0.5 flex min-w-4 h-4 items-center justify-center rounded-full bg-accent px-1 text-[9px] font-extrabold text-accent-foreground shadow-xs animate-in zoom-in-50">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
