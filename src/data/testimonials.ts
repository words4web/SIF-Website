import { TestimonialsData } from "@/types/testimonials.types";

export const TESTIMONIALS_DATA: TestimonialsData = {
  badge: "Real Customer Feedback",
  title: "What Our Customers Say",
  description:
    "Hear directly from culinary enthusiasts, supermarket managers, and authentic Indian food lovers across Italy.",
  testimonials: [
    {
      id: "test-1",
      highlight: "The Tata Tea tastes exactly like the one from home in India",
      quote:
        "I've been buying my chai and dal from Shelly Indian Foods for years now. The Tata Tea Premium tastes exactly like the one my mother used to make in India, and deliveries throughout Italy have always been fast and reliable. It's rare to find such an authentic store.",
      author: "Rakesh S.",
      location: "Milan, Lombardy",
      role: "Regular Wholesale Buyer",
      rating: 5,
      avatarInitials: "RS",
      verifiedOrder: "Tata Tea Premium & Pulses",
    },
    {
      id: "test-2",
      highlight: "Everything is carefully chosen, not just imported in bulk",
      quote:
        "I'm not Indian, but I love cooking with these ingredients, and the staff guided me in choosing the right dal for my first dal makhani. Everything seemed carefully chosen, not just imported in bulk. Now it's my go-to shop for that authentic flavor.",
      author: "Chiara B.",
      location: "Cremona, Lombardy",
      role: "Home Chef & Retail Customer",
      rating: 5,
      avatarInitials: "CB",
      verifiedOrder: "Whole Spices & Dal Makhani Kit",
    },
    {
      id: "test-3",
      highlight: "Nothing feels like a random import — genuine quality care",
      quote:
        "I ordered Tata Tea Gold and a bag of rajma online, and both arrived quickly and well-packaged. What I appreciate most is that nothing seems like a random import; you can tell they really care about the brands they carry. I will definitely order again.",
      author: "Anjali D.",
      location: "Rome, Italy",
      role: "Verified B2B & Retail Order",
      rating: 5,
      avatarInitials: "AD",
      verifiedOrder: "Tata Tea Gold & Rajma Premium",
    },
  ],
};
