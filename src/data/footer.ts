import { FooterData } from "@/types/footer.types";

export const FOOTER_DATA: FooterData = {
  companyName: "Shelly Indian Foods",
  subtitle: "Exclusive Tata Distributor in Italy",
  description:
    "Authorized B2B importer and wholesale distributor of Tata Consumer Products, authentic Indian tea, legumes, and pantry staples throughout Italy since 1998.",
  socials: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/shellyindianfoods",
      icon: "facebook",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/shellyindianfoods/",
      icon: "instagram",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/shelly-indian-foods/",
      icon: "linkedin",
    },
  ],
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "Who We Are", href: "/about" },
    { label: "Catalogue", href: "/catalogue" },
    { label: "Orders", href: "/orders" },
    { label: "FAQs", href: "/faq" },
  ],
  brandLinks: [
    { label: "Tata Tea Premium & Gold", href: "/catalog?search=tata+tea" },
    { label: "Tata Salt (Desh Ka Namak)", href: "/catalog?search=tata+salt" },
    {
      label: "Tata Sampann Pulses & Spices",
      href: "/catalog?search=tata+sampann",
    },
    { label: "View All 500+ SKUs", href: "/catalog" },
  ],
  contacts: [
    {
      type: "address",
      label: "Via Giuseppina, 149, 26100 Cremona (CR), Italy",
      href: "https://www.google.com/maps/place/Shelly+Indian+Foods+Di+Grover+Shelly+C.+Sas/@45.1267794,10.0517679,17z",
    },
    {
      type: "phone",
      label: "+39 0372 432787",
      href: "tel:+390372432787",
      isPrimary: true,
    },
    {
      type: "phone",
      label: "+39 389 022 0807",
      href: "tel:+393890220807",
    },
    {
      type: "email",
      label: "shellyindianfoods.sas@gmail.com",
      href: "mailto:shellyindianfoods.sas@gmail.com",
    },
  ],
  certificationsBadge: "BRCGS Grade A & ISO 22000",
  distributorBadge: "Exclusive Tata Distributor • Italy",
  attribution: {
    text: "Copyright © 2026 Shelly Indian Foods | Designed with love by",
    creditName: "Words4Web",
    creditUrl: "https://words4web.com/",
  },
};
