import { SupplyChainData } from "@/types/supply-chain.types";

export const getSupplyChainData = (
  t: (key: string, values?: Record<string, string | number>) => string,
): SupplyChainData => ({
  badge: t("badge"),
  title: t("title"),
  description: t("description"),
  steps: [
    {
      id: "step-1",
      stepNumber: "01",
      title: t("steps.step-1.title"),
      tag: t("steps.step-1.tag"),
      description: t("steps.step-1.description"),
      badge: t("steps.step-1.badge"),
      iconName: "Sprout",
    },
    {
      id: "step-2",
      stepNumber: "02",
      title: t("steps.step-2.title"),
      tag: t("steps.step-2.tag"),
      description: t("steps.step-2.description"),
      badge: t("steps.step-2.badge"),
      iconName: "Warehouse",
    },
    {
      id: "step-3",
      stepNumber: "03",
      title: t("steps.step-3.title"),
      tag: t("steps.step-3.tag"),
      description: t("steps.step-3.description"),
      badge: t("steps.step-3.badge"),
      iconName: "ShieldCheck",
    },
    {
      id: "step-4",
      stepNumber: "04",
      title: t("steps.step-4.title"),
      tag: t("steps.step-4.tag"),
      description: t("steps.step-4.description"),
      badge: t("steps.step-4.badge"),
      iconName: "Truck",
    },
  ],
});
