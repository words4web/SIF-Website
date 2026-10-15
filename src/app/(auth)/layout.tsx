import React from "react";
import { useTranslations } from "next-intl";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("authLayout");
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen lg:h-screen w-full flex bg-muted/40 overflow-y-auto lg:overflow-hidden">
      <div className="flex-1 grid lg:grid-cols-2 min-h-screen lg:h-full w-full">
        <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-[#2a0709] via-[#3d0b0e] to-[#1e0506] p-10 xl:p-16 flex-col justify-between text-white border-r border-primary/20">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-primary/25 blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:28px_28px]" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 backdrop-blur-md border border-white/15">
              <span className="size-2 rounded-full bg-primary" />
              <span className="text-xs font-bold uppercase tracking-[.2em] text-white/90">
                {t("badge")}
              </span>
            </div>
          </div>

          <div className="relative z-10 max-w-lg space-y-6 my-auto py-8">
            <h1 className="font-serif text-3xl xl:text-5xl font-extrabold leading-tight tracking-tight text-white drop-shadow-sm">
              {t("titleLine1")} <br />
              <span className="text-white/80">{t("titleLine2")}</span>
            </h1>
            <p className="text-sm xl:text-base text-white/70 leading-relaxed font-normal">
              {t("description")}
            </p>

            <div className="space-y-3.5 pt-6 border-t border-white/15">
              <div className="flex items-start gap-3.5">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-bold shadow-xs">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">
                    {t("benefit1Title")}
                  </h3>
                  <p className="text-xs text-white/60 mt-0.5">
                    {t("benefit1Desc")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-bold shadow-xs">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">
                    {t("benefit2Title")}
                  </h3>
                  <p className="text-xs text-white/60 mt-0.5">
                    {t("benefit2Desc")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-bold shadow-xs">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">
                    {t("benefit3Title")}
                  </h3>
                  <p className="text-xs text-white/60 mt-0.5">
                    {t("benefit3Desc")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-4 text-xs text-white/50 font-medium">
            {t("copyright", { year })}
          </div>
        </div>

        <div className="flex items-center justify-center p-4 sm:p-8 lg:p-10 relative bg-background min-h-screen lg:min-h-0 overflow-y-auto">
          <div className="absolute top-1/3 right-1/4 size-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
          <div className="w-full max-w-[440px] sm:max-w-[480px] z-10 py-6 sm:py-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
