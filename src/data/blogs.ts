import type { BlogPost } from "@/types/blog.types";
import { whyChooseSifBlog } from "./blogs/why-choose-sif";
import { tataDistributorItalyBlog } from "./blogs/tata-distributor-italy";

export type { BlogPost } from "@/types/blog.types";
export * from "@/types/blog.types";

export const BLOG_POSTS: BlogPost[] = [
  tataDistributorItalyBlog,
  whyChooseSifBlog,
];

export { whyChooseSifBlog, tataDistributorItalyBlog };
