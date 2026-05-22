import { z } from 'zod'

export const projectSchema = z.object({
  title: z.string().min(2, 'Le titre est requis').max(120, 'Titre trop long'),
  slug: z
    .string()
    .min(2, 'Le slug est requis')
    .max(140, 'Slug trop long')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug invalide'),
  description: z.string().min(10, 'Description trop courte').max(500, 'Description trop longue'),
  content: z.string(),
  technologies: z.array(z.string()),
  githubUrl: z.string().url('URL GitHub invalide').optional().or(z.literal('')),
  liveUrl: z.string().url('URL de demo invalide').optional().or(z.literal('')),
  featured: z.boolean(),
  published: z.boolean(),
  order: z.number().int().min(0),
})

export type ProjectFormData = z.input<typeof projectSchema>
