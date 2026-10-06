export interface CorporateStat {
  number: string;
  suffix: string;
  title: string;
  desc: string;
  iconName: "Ship" | "CalendarDays" | "Building" | "Layers";
  accentBorder: string;
  glowColor: string;
  iconBg: string;
  badge: string;
}

export interface CorporatePillar {
  title: string;
  iconName: "Anchor" | "Compass" | "ShieldCheck" | "FileCheck2";
  iconBg: string;
  textColor: string;
}

export interface CorporateStoryData {
  badge: string;
  headingPrefix: string;
  headingHighlight: string;
  description: string;
  pillars: CorporatePillar[];
  stats: CorporateStat[];
}
