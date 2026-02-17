import { z } from "zod";

// Booking form validation
export const bookingFormSchema = z.object({
  sessionId: z.string().uuid("Invalid session ID"),
  parent: z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(6, "Phone number is required"),
  }),
  child: z.object({
    fullName: z.string().min(2, "Child name must be at least 2 characters"),
    dateOfBirth: z.string().optional(),
    swimmingLevel: z.enum(["none", "beginner", "intermediate", "advanced"]).default("none"),
    notes: z.string().optional(),
  }),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;

// Session log form validation
export const sessionLogSchema = z.object({
  sessionId: z.string().uuid("Invalid session ID"),
  trainerId: z.string().uuid("Invalid trainer ID"),
  logDate: z.string().min(1, "Date is required"),
  notes: z.string().optional(),
  attendance: z.array(
    z.object({
      child_id: z.string().uuid(),
      child_name: z.string(),
      present: z.boolean(),
    })
  ),
});

export type SessionLogFormData = z.infer<typeof sessionLogSchema>;

// Course form validation (for trainer dashboard)
export const courseFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  prerequisites: z.string().optional(),
  goals: z.string().optional(),
  priceCents: z.number().min(0, "Price must be positive"),
  currency: z.string().default("SEK"),
  maxParticipants: z.number().min(1).max(20),
  location: z.string().min(3, "Location is required"),
});

export type CourseFormData = z.infer<typeof courseFormSchema>;

// Login form validation
export const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
