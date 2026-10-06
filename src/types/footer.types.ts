export interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface FooterSocialLink {
  name: string;
  href: string;
  icon: "facebook" | "instagram" | "linkedin";
}

export interface FooterContactItem {
  type: "address" | "phone" | "email";
  label: string;
  href: string;
  isPrimary?: boolean;
}

export interface FooterData {
  companyName: string;
  subtitle: string;
  description: string;
  socials: FooterSocialLink[];
  quickLinks: FooterLink[];
  brandLinks: FooterLink[];
  contacts: FooterContactItem[];
  certificationsBadge: string;
  distributorBadge: string;
  attribution: {
    text: string;
    creditName: string;
    creditUrl: string;
  };
}
