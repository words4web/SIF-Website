export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  role?: string;
  rating?: number;
  highlight?: string;
  avatarInitials: string;
  verifiedOrder?: string;
}

export interface TestimonialsData {
  badge: string;
  title: string;
  description?: string;
  testimonials: Testimonial[];
}
