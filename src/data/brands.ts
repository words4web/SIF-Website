import { DistributedBrand, BrandCertification } from "@/types/brand.types";

export const DISTRIBUTED_BRANDS: DistributedBrand[] = [
  {
    id: "tata-tea",
    name: "Tata Tea",
    tagline: "India's #1 Packaged Tea Heritage",
    logo: "/brands/tata-tea.png",
    alt: "Tata Tea - Premium Indian Tea",
    description:
      "Rich aroma and signature blends crafted from selected leaf estates across Assam & Darjeeling.",
    category: "Tata Tea",
    accentColor: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    href: "/catalogue?category=tata-tea",
  },
  {
    id: "tata-salt",
    name: "Tata Salt",
    tagline: "Desh Ka Namak — Guaranteed Purity",
    logo: "/brands/tata-salt.png",
    alt: "Tata Salt - Desh Ka Namak",
    description:
      "Pioneer of vacuum-evaporated iodised salt, unmatched in pristine purity and consistent taste.",
    category: "Tata Salt",
    accentColor: "from-blue-500/20 via-blue-500/5 to-transparent",
    href: "/catalogue?category=tata-salt",
  },
  {
    id: "tata-sampann-legumes",
    name: "Tata Sampann Legumes",
    tagline: "100% Wholesome Unpolished Legumes",
    logo: "/brands/tata-sampann.png",
    alt: "Tata Sampann Legumes - Pure Dals & Pulses",
    description:
      "Unpolished natural dals and pulses retaining wholesome plant protein, natural nutrients, and authentic taste.",
    category: "Tata Sampann Legumes",
    accentColor: "from-amber-500/20 via-amber-500/5 to-transparent",
    href: "/catalogue?category=tata-sampann-legumes",
  },
];

export const BRAND_CERTIFICATIONS: BrandCertification[] = [
  {
    id: "cert-registered-structure",
    badge: "GLOBAL",
    title: "Internationally Registered Structure",
    description:
      "Certified logistics & trade entity registered across the European Union.",
  },
  {
    id: "cert-brcgs",
    badge: "GRADE A",
    title: "BRCGS Food Safety Grade A Certification",
    description:
      "Gold standard compliance for quality, safety, and rigorous audit protocols.",
  },
  {
    id: "cert-iso-haccp",
    badge: "ISO 22000",
    title: "International Standards ISO 22000 & HACCP",
    description:
      "End-to-end hazard prevention from overseas source to Italian warehouse shelves.",
  },
];
