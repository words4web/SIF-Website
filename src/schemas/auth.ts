import { z } from "zod";
import { IT_MOBILE_REGEX } from "@/constants/validation";

export const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

export const signupSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters."),
  businessName: z
    .string()
    .trim()
    .min(2, "Business name must be at least 2 characters."),
  email: z.string().trim().email("Please enter a valid email address."),
  mobileNumber: z
    .string()
    .trim()
    .regex(
      IT_MOBILE_REGEX,
      "Please enter a valid Italian mobile number (e.g. 3890220807 or +393890220807).",
    ),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
