import { FooterData } from "@/types/footer.types";

export const FOOTER_DATA: FooterData = {
  companyName: "Shelly Indian Foods",
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
  attribution: {
    creditName: "Words4Web",
    creditUrl: "https://words4web.com/",
  },
};
