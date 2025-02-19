import { z } from 'zod'

export const HomePageFirstStepSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome deve conter pelo menos 3 caracteres' })
})

export type HomePageFirstStepType = z.infer<typeof HomePageFirstStepSchema>

export const HomePageSecondStepSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve conter pelo menos 8 caracteres' })
    .refine(
      (password) => {
        const hasUpperCase = /[A-Z]/.test(password)
        const hasLowerCase = /[a-z]/.test(password)
        const hasNumber = /\d/.test(password)
        const hasSpecialChar = /[!@#$%^&*]/.test(password)
        return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar
      },
      {
        message:
          'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial'
      }
    )
})

export type HomePageSecondStepType = z.infer<typeof HomePageSecondStepSchema>
