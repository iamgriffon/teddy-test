import { z } from 'zod'

export const ClientFormSchema = z.object({
  name: z.string().refine(
    (value) => {
      return value.trim().length >= 3
    },
    {
      message: 'O nome do cliente é obrigatório'
    }
  ),
  sallary: z
    .string()
    .min(0)
    .refine(
      (value) => {
        return value.trim() !== ''
      },
      {
        message: 'O salário do cliente é obrigatório'
      }
    ),
  company_sallary: z
    .string()
    .min(0)
    .refine(
      (value) => {
        return value.trim() !== ''
      },
      {
        message: 'O salário da empresa do cliente é obrigatório'
      }
    )
})

export type ClientFormSchemaType = z.infer<typeof ClientFormSchema>
