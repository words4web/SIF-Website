"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { useLocale } from "next-intl";
import { ChevronDown, Check } from "lucide-react";
import { LOCALES, LOCALE_LABELS, LOCALE_COOKIE, Locale } from "@/i18n/config";

interface LanguageSwitcherProps {
  className?: string;
  variant?: "desktop" | "mobile";
}

export function LanguageSwitcher({
  className = "",
  variant = "desktop",
}: LanguageSwitcherProps) {
  const currentLocale = useLocale() as Locale;
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeConfig = LOCALE_LABELS[currentLocale] || LOCALE_LABELS.en;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelectLocale = (newLocale: Locale) => {
    setIsOpen(false);
    if (newLocale === currentLocale || isPending) return;

    // Set cookie for 1 year
    document.cookie = `${LOCALE_COOKIE}=${newLocale};path=/;max-age=${
      60 * 60 * 24 * 365
    };SameSite=Lax`;

    startTransition(() => {
      window.location.reload();
    });
  };

  return (
    <div
      ref={dropdownRef}
      className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Select language. Currently ${activeConfig.label}`}
        disabled={isPending}
        className={
          variant === "mobile"
            ? "flex h-9 items-center gap-1 rounded-xl border border-border/60 bg-muted/50 px-2 text-base transition-all hover:bg-muted active:scale-95"
            : "flex h-11 lg:h-12 items-center gap-1.5 rounded-xl border border-border/50 bg-background px-2.5 text-lg shadow-2xs transition-all hover:border-border hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
        }>
        <span className="leading-none select-none">{activeConfig.flag}</span>
        <ChevronDown
          className={`text-muted-foreground transition-transform duration-200 ${
            variant === "mobile" ? "size-3" : "size-3.5"
          } ${isOpen ? "rotate-180 text-primary" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 top-full z-50 mt-2 min-w-[150px] origin-top-right overflow-hidden rounded-2xl border border-border/80 bg-popover/98 p-1.5 shadow-xl backdrop-blur-md animate-in fade-in-50 zoom-in-95">
          {LOCALES.map((locale) => {
            const isActive = currentLocale === locale;
            const config = LOCALE_LABELS[locale];
            return (
              <button
                key={locale}
                type="button"
                role="menuitem"
                onClick={() => handleSelectLocale(locale)}
                title={config.label}
                aria-label={config.label}
                className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-foreground hover:bg-muted"
                }`}>
                <div className="flex items-center gap-2.5">
                  <span className="text-base leading-none select-none">
                    {config.flag}
                  </span>
                  <span className="leading-tight">{config.nativeName}</span>
                </div>
                {isActive && (
                  <Check className="size-3.5 text-primary stroke-[2.5]" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
