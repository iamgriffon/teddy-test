import { z } from 'zod'

export const HomePageSchema = z.object({
  name: z.string().min(3, { message: 'O nome deve conter pelo menos 3 caracteres' })
})

export type HomePageSchemaType = z.infer<typeof HomePageSchema>