import { z } from 'zod'

export const LoginPageSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export type LoginPageProps = z.infer<typeof LoginPageSchema>
