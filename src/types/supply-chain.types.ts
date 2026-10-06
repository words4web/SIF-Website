export interface SupplyChainStep {
  id: string;
  stepNumber: string;
  title: string;
  tag: string;
  description: string;
  badge: string;
  iconName: "Sprout" | "Warehouse" | "ShieldCheck" | "Truck";
}

export interface SupplyChainData {
  badge: string;
  title: string;
  description: string;
  steps: SupplyChainStep[];
}
