import { z } from "zod"

export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required').max(225, 'Name must be less than 225 characters'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address').max(225, 'Email must be less than 225 characters'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(225, 'Password must be less than 225 characters')
    .regex(/[A-Za-z]/, 'Password must contain at least one letter')
    .regex(/\d/, 'Password must contain at least one number'),
});

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;