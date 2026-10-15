import {
  CorporateStat,
  CorporatePillar,
  CorporateStoryData,
} from "@/types/corporate.types";

export const getCorporateStats = (
  t: (key: string) => string,
): CorporateStat[] => [
  {
    number: "100",
    suffix: "+",
    title: t("stats.containers.title"),
    desc: t("stats.containers.desc"),
    iconName: "Ship",
    accentBorder: "group-hover:border-primary/50",
    glowColor: "from-primary/10 via-primary/5 to-transparent",
    iconBg: "bg-primary/10 text-primary border-primary/20",
    badge: t("stats.containers.badge"),
  },
  {
    number: "25",
    suffix: "+",
    title: t("stats.experience.title"),
    desc: t("stats.experience.desc"),
    iconName: "CalendarDays",
    accentBorder: "group-hover:border-amber-400/50",
    glowColor: "from-[#ffd230]/20 via-[#ffd230]/5 to-transparent",
    iconBg: "bg-amber-50 text-amber-700 border-amber-200",
    badge: t("stats.experience.badge"),
  },
  {
    number: "500",
    suffix: "+",
    title: t("stats.partners.title"),
    desc: t("stats.partners.desc"),
    iconName: "Building",
    accentBorder: "group-hover:border-blue-500/50",
    glowColor: "from-blue-500/15 via-blue-500/5 to-transparent",
    iconBg: "bg-blue-50 text-blue-700 border-blue-200",
    badge: t("stats.partners.badge"),
  },
  {
    number: "500",
    suffix: "+",
    title: t("stats.products.title"),
    desc: t("stats.products.desc"),
    iconName: "Layers",
    accentBorder: "group-hover:border-emerald-500/50",
    glowColor: "from-emerald-500/15 via-emerald-500/5 to-transparent",
    iconBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    badge: t("stats.products.badge"),
  },
];

export const getCorporatePillars = (
  t: (key: string) => string,
): CorporatePillar[] => [
  {
    title: t("pillars.directImport"),
    iconName: "Anchor",
    iconBg: "bg-primary/10 text-primary",
    textColor: "text-stone-800",
  },
  {
    title: t("pillars.panItalian"),
    iconName: "Compass",
    iconBg: "bg-amber-500/10 text-amber-700",
    textColor: "text-stone-800",
  },
  {
    title: t("pillars.brcgs"),
    iconName: "ShieldCheck",
    iconBg: "bg-emerald-500/10 text-emerald-700",
    textColor: "text-stone-800",
  },
  {
    title: t("pillars.iso22000"),
    iconName: "FileCheck2",
    iconBg: "bg-blue-500/10 text-blue-700",
    textColor: "text-stone-800",
  },
];

export const getCorporateStoryData = (
  t: (key: string) => string,
): CorporateStoryData => ({
  badge: t("badge"),
  headingPrefix: t("headingPrefix"),
  headingHighlight: t("headingHighlight"),
  description: t("description"),
  pillars: getCorporatePillars(t),
  stats: getCorporateStats(t),
});
