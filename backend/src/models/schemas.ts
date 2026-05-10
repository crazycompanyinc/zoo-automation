import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(1, 'Name is required').max(100),
  company: z.string().max(200).optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

export const createLeadSchema = z.object({
  serviceId: z.string().optional(),
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email'),
  company: z.string().max(200).optional(),
  description: z.string().min(10, 'Description must be at least 10 characters').max(5000),
  budget: z.string().max(100).optional(),
});

export const updateLeadSchema = z.object({
  status: z.enum(['new', 'contacted', 'qualified', 'converted', 'lost']).optional(),
  description: z.string().min(10).max(5000).optional(),
  budget: z.string().max(100).optional(),
});

export const createProjectSchema = z.object({
  leadId: z.string(),
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  budget: z.number().positive().optional(),
});

export const updateProjectSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().min(10).optional(),
  status: z.enum(['planning', 'in_progress', 'review', 'completed', 'cancelled']).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  budget: z.number().positive().optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
