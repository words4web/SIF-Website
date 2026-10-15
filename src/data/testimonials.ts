import { TestimonialsData } from "@/types/testimonials.types";

export const getTestimonialsData = (
  t: (key: string, values?: Record<string, string | number>) => string,
): TestimonialsData => ({
  badge: t("badge"),
  title: t("title"),
  description: t("description"),
  testimonials: [
    {
      id: "test-1",
      highlight: t("items.test-1.highlight"),
      quote: t("items.test-1.quote"),
      author: t("items.test-1.author"),
      location: t("items.test-1.location"),
      role: t("items.test-1.role"),
      rating: 5,
      avatarInitials: "RS",
      verifiedOrder: t("items.test-1.verifiedOrder"),
    },
    {
      id: "test-2",
      highlight: t("items.test-2.highlight"),
      quote: t("items.test-2.quote"),
      author: t("items.test-2.author"),
      location: t("items.test-2.location"),
      role: t("items.test-2.role"),
      rating: 5,
      avatarInitials: "CB",
      verifiedOrder: t("items.test-2.verifiedOrder"),
    },
    {
      id: "test-3",
      highlight: t("items.test-3.highlight"),
      quote: t("items.test-3.quote"),
      author: t("items.test-3.author"),
      location: t("items.test-3.location"),
      role: t("items.test-3.role"),
      rating: 5,
      avatarInitials: "AD",
      verifiedOrder: t("items.test-3.verifiedOrder"),
    },
  ],
});
