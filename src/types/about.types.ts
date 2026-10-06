export interface ValueCard {
  id: string;
  title: string;
  description: string;
  iconName: "Eye" | "Target" | "HeartHandshake" | "ShieldCheck";
}

export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
}

export interface AboutUsData {
  badge: string;
  title: string;
  heroImage: string;
  heroTagline: string;
  storyHeading: string;
  storyParagraphs: string[];
  vision: {
    title: string;
    description: string;
  };
  mission: {
    title: string;
    description: string;
  };
  values: ValueCard[];
}
