import { z } from 'zod';

export function today() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}

export const propertyInterestOptions = ['Residential plots', 'Apartments', 'Commercial land', 'Farm land', 'Villas'] as const;

export const enquirySchema = z.object({
  name: z.string().trim().min(2, 'Enter your full name.').max(100, 'Use at most 100 characters.'),
  phone: z.string().trim().regex(/^[+0-9 ()-]{7,20}$/, 'Enter a valid phone number.')
    .refine(value => value.replace(/\D/g, '').length >= 7, 'Enter at least 7 digits.'),
  date: z.iso.date('Choose a valid date.').refine(value => value >= today(), 'Choose today or a future date.'),
  interest: z.enum(propertyInterestOptions),
  consent: z.boolean().refine(value => value, 'Your consent is required to save these details.'),
});

export const contactSchema = z.object({
  email: z.email('Enter a valid email address.').max(254, 'Email address is too long.'),
  name: z.string().trim().min(2, 'Enter your name.').max(100, 'Use at most 100 characters.'),
  message: z.string().trim().max(2000, 'Use at most 2,000 characters.').optional(),
  phone: z.string().trim().regex(/^[+0-9 ()-]{7,20}$/, 'Enter a valid phone number.')
    .refine(value => value.replace(/\D/g, '').length >= 7, 'Enter at least 7 digits.'),
  preferredDate: z.union([z.literal(''), z.iso.date()])
    .refine(value => !value || value >= today(), 'Choose today or a future date.'),
});

export type EnquiryValues = z.infer<typeof enquirySchema>;
export type ContactValues = z.infer<typeof contactSchema>;
