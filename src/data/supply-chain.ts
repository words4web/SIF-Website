import { SupplyChainData } from "@/types/supply-chain.types";

export const SUPPLY_CHAIN_DATA: SupplyChainData = {
  badge: "Quality Assurance Protocol",
  title: "Our 4-Step Supply Chain Process",
  description:
    "From direct farm sourcing to door-to-door delivery to stores, every step is checked for food safety, barcode compliance, and cold chain integrity.",
  steps: [
    {
      id: "step-1",
      stepNumber: "01",
      title: "Direct Procurement and Processing",
      tag: "100% Traceable",
      description:
        "We collaborate with over 100 selected processing units and agricultural cooperatives, with distribution in Lombardy, Lazio, Campania, and Sicily.",
      badge: "Verified Phase",
      iconName: "Sprout",
    },
    {
      id: "step-2",
      stepNumber: "02",
      title: "Dry and Refrigerated Port Storage",
      tag: "Air-conditioned",
      description:
        "Multi-zone, temperature-controlled storage at ports of origin to prevent moisture deterioration and pest infestations.",
      badge: "Verified Phase",
      iconName: "Warehouse",
    },
    {
      id: "step-3",
      stepNumber: "03",
      title: "Multi-Agency Quality Control and Compliance",
      tag: "FDA & EU Standards",
      description:
        "100% testing of every batch for pesticide residues, heavy metals, microbiological contamination and compliance with FDA/EU labels.",
      badge: "Verified Phase",
      iconName: "ShieldCheck",
    },
    {
      id: "step-4",
      stepNumber: "04",
      title: "Direct delivery to wholesalers",
      tag: "Door to Door",
      description:
        "Delivery with vehicles equipped with hydraulic tail lifts, directly to the distribution centers of wholesalers and supermarkets.",
      badge: "Verified Phase",
      iconName: "Truck",
    },
  ],
};
