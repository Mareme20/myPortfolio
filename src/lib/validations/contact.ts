// lib/validations/contact.ts
import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, { message: 'Le nom doit contenir au moins 2 caractères' })
    .max(50, { message: 'Le nom ne peut pas dépasser 50 caractères' }),
  email: z.string()
    .email({ message: 'Adresse email invalide' }),
  subject: z.string()
    .min(5, { message: 'Le sujet doit contenir au moins 5 caractères' })
    .max(100, { message: 'Le sujet ne peut pas dépasser 100 caractères' }),
  message: z.string()
    .min(10, { message: 'Le message doit contenir au moins 10 caractères' })
    .max(1000, { message: 'Le message ne peut pas dépasser 1000 caractères' }),
  honeypot: z.string().max(0).optional() // Anti-spam
})

export type ContactFormData = z.infer<typeof contactFormSchema>