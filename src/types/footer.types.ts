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
  socials: FooterSocialLink[];
  contacts: FooterContactItem[];
  attribution: {
    creditName: string;
    creditUrl: string;
  };
}
