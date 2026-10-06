import {
  CorporateStat,
  CorporatePillar,
  CorporateStoryData,
} from "@/types/corporate.types";

export const CORPORATE_STATS: CorporateStat[] = [
  {
    number: "100",
    suffix: "+",
    title: "Annual Container Volume",
    desc: "Temperature-controlled container shipments direct from Indian origins",
    iconName: "Ship",
    accentBorder: "group-hover:border-primary/50",
    glowColor: "from-primary/10 via-primary/5 to-transparent",
    iconBg: "bg-primary/10 text-primary border-primary/20",
    badge: "FREIGHT",
  },
  {
    number: "25",
    suffix: "+",
    title: "Years of Experience",
    desc: "Pioneering authentic food import and wholesale trade across Italy",
    iconName: "CalendarDays",
    accentBorder: "group-hover:border-amber-400/50",
    glowColor: "from-[#ffd230]/20 via-[#ffd230]/5 to-transparent",
    iconBg: "bg-amber-50 text-amber-700 border-amber-200",
    badge: "SINCE 1998",
  },
  {
    number: "500",
    suffix: "+",
    title: "Partners",
    desc: "Distribution Wholesalers and Supermarket retail chains",
    iconName: "Building",
    accentBorder: "group-hover:border-blue-500/50",
    glowColor: "from-blue-500/15 via-blue-500/5 to-transparent",
    iconBg: "bg-blue-50 text-blue-700 border-blue-200",
    badge: "NETWORK",
  },
  {
    number: "500",
    suffix: "+",
    title: "Active B2B Products",
    desc: "Authentic SKUs of Indian food staples, spices and grocery lines",
    iconName: "Layers",
    accentBorder: "group-hover:border-emerald-500/50",
    glowColor: "from-emerald-500/15 via-emerald-500/5 to-transparent",
    iconBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    badge: "CATALOG",
  },
];

export const CORPORATE_PILLARS: CorporatePillar[] = [
  {
    title: "Direct Import Lines",
    iconName: "Anchor",
    iconBg: "bg-primary/10 text-primary",
    textColor: "text-stone-800",
  },
  {
    title: "Pan-Italian Delivery",
    iconName: "Compass",
    iconBg: "bg-amber-500/10 text-amber-700",
    textColor: "text-stone-800",
  },
  {
    title: "BRCGS Grade A Audit",
    iconName: "ShieldCheck",
    iconBg: "bg-emerald-500/10 text-emerald-700",
    textColor: "text-stone-800",
  },
  {
    title: "ISO 22000 Certified",
    iconName: "FileCheck2",
    iconBg: "bg-blue-500/10 text-blue-700",
    textColor: "text-stone-800",
  },
];

export const CORPORATE_STORY_DATA: CorporateStoryData = {
  badge: "Corporate Scale & Heritage",
  headingPrefix: "A quarter of a century of excellence in wholesale trade",
  headingHighlight: "throughout Italy.",
  description:
    "We work directly with world-renowned brands to offer you teas, legumes, and pantry staples that retain their authentic flavor, just like those found in India. Finding the right lentils, sourced from the right supplier, packaged correctly, and offered at a fair price is the most complex challenge: and this is precisely what we've been focusing on for over 25 years.",
  pillars: CORPORATE_PILLARS,
  stats: CORPORATE_STATS,
};
