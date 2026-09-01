import { z } from "zod";

export function createViewingStep1Schema(messages: {
  nameRequired: string;
  emailRequired: string;
  emailInvalid: string;
  phoneRequired: string;
  phoneInvalid: string;
}) {
  return z.object({
    name: z.string().trim().min(2, messages.nameRequired),
    email: z
      .string()
      .trim()
      .min(1, messages.emailRequired)
      .email(messages.emailInvalid),
    phone: z
      .string()
      .trim()
      .min(7, messages.phoneRequired)
      .regex(/^[+\d][\d\s().-]{6,}$/, messages.phoneInvalid),
  });
}

export function createViewingStep2Schema(messages: {
  dateRequired: string;
}) {
  return z.object({
    preferredAt: z.string().trim().min(1, messages.dateRequired),
    message: z.string().trim().max(1000).optional().or(z.literal("")),
  });
}

export function createContactSchema(messages: {
  nameRequired: string;
  emailRequired: string;
  emailInvalid: string;
  phoneRequired: string;
  phoneInvalid: string;
  vehicleRequired: string;
  messageRequired: string;
}) {
  return z.object({
    name: z.string().trim().min(2, messages.nameRequired),
    email: z
      .string()
      .trim()
      .min(1, messages.emailRequired)
      .email(messages.emailInvalid),
    phone: z
      .string()
      .trim()
      .min(7, messages.phoneRequired)
      .regex(/^[+\d][\d\s().-]{6,}$/, messages.phoneInvalid),
    vehicleType: z.string().trim().min(1, messages.vehicleRequired),
    message: z.string().trim().min(10, messages.messageRequired),
  });
}

export type ViewingStep1Values = z.infer<
  ReturnType<typeof createViewingStep1Schema>
>;
export type ViewingStep2Values = z.infer<
  ReturnType<typeof createViewingStep2Schema>
>;
export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;
