import type { BlogPost } from "@/types/blog.types";
import { whyChooseSifBlog } from "./blogs/why-choose-sif";

export type { BlogPost } from "@/types/blog.types";
export * from "@/types/blog.types";

export const BLOG_POSTS: BlogPost[] = [whyChooseSifBlog];

export { whyChooseSifBlog };
