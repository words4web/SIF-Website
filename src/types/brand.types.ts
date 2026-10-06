export interface DistributedBrand {
  id: string;
  name: string;
  logo: string;
  alt: string;
  tagline?: string;
  description?: string;
  category?: string;
  accentColor?: string;
  href?: string;
}

export interface BrandCertification {
  id: string;
  badge: string;
  title: string;
  description: string;
}
