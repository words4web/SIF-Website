import { DistributedBrand, BrandCertification } from "@/types/brand.types";

export const getDistributedBrands = (
  t: (key: string) => string,
): DistributedBrand[] => [
  {
    id: "tata-tea",
    name: t("items.tata-tea.name"),
    tagline: t("items.tata-tea.tagline"),
    logo: "/brands/tata-tea.png",
    alt: t("items.tata-tea.alt"),
    description: t("items.tata-tea.description"),
    category: t("items.tata-tea.category"),
    accentColor: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    href: "/catalogue?category=tata-tea",
  },
  {
    id: "tata-salt",
    name: t("items.tata-salt.name"),
    tagline: t("items.tata-salt.tagline"),
    logo: "/brands/tata-salt.png",
    alt: t("items.tata-salt.alt"),
    description: t("items.tata-salt.description"),
    category: t("items.tata-salt.category"),
    accentColor: "from-blue-500/20 via-blue-500/5 to-transparent",
    href: "/catalogue?category=tata-salt",
  },
  {
    id: "tata-sampann-legumes",
    name: t("items.tata-sampann-legumes.name"),
    tagline: t("items.tata-sampann-legumes.tagline"),
    logo: "/brands/tata-sampann.png",
    alt: t("items.tata-sampann-legumes.alt"),
    description: t("items.tata-sampann-legumes.description"),
    category: t("items.tata-sampann-legumes.category"),
    accentColor: "from-amber-500/20 via-amber-500/5 to-transparent",
    href: "/catalogue?category=tata-sampann-legumes",
  },
];

export const getBrandCertifications = (
  t: (key: string) => string,
): BrandCertification[] => [
  {
    id: "cert-registered-structure",
    badge: t("certifications.cert-registered-structure.badge"),
    title: t("certifications.cert-registered-structure.title"),
    description: t("certifications.cert-registered-structure.description"),
  },
  {
    id: "cert-brcgs",
    badge: t("certifications.cert-brcgs.badge"),
    title: t("certifications.cert-brcgs.title"),
    description: t("certifications.cert-brcgs.description"),
  },
  {
    id: "cert-iso-haccp",
    badge: t("certifications.cert-iso-haccp.badge"),
    title: t("certifications.cert-iso-haccp.title"),
    description: t("certifications.cert-iso-haccp.description"),
  },
];
