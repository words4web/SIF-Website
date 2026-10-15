"use client";

import { useTranslations } from "next-intl";
import { Award, ShieldCheck, Truck } from "lucide-react";

export function FeaturesSection() {
  const t = useTranslations("featuresSection");

  return (
    <section className="border-t border-border/70 bg-card">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:grid-cols-3 lg:px-8">
        <div className="flex gap-3">
          <Truck className="mt-1 size-5 text-primary shrink-0" />
          <div>
            <p className="font-bold">{t("nationwideTitle")}</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {t("nationwideDesc")}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Award className="mt-1 size-5 text-primary shrink-0" />
          <div>
            <p className="font-bold">{t("authorizedTitle")}</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {t("authorizedDesc")}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <ShieldCheck className="mt-1 size-5 text-primary shrink-0" />
          <div>
            <p className="font-bold">{t("heritageTitle")}</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {t("heritageDesc")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
