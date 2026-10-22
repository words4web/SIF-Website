export interface BlogReason {
  number: number;
  title: string;
  paragraphs: string[];
}

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogContent {
  introParagraphs: string[];
  sectionHeading: string;
  sectionIntro: string;
  reasons: BlogReason[];
  finalThoughts: {
    title: string;
    paragraphs: string[];
  };
  faqTitle: string;
  faqs: BlogFAQ[];
}

export interface BlogPost {
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  publishedAt: string;
  featuredImage: string;
  insightImage: string;
  author: {
    name: string;
  };
  content: BlogContent;
}
