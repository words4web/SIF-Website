export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  defaultOpen?: boolean;
}

export interface FAQCategory {
  id: string;
  name: string;
  count: number;
}

export interface FAQData {
  badge: string;
  title: string;
  subtitle: string;
  faqs: FAQItem[];
}
