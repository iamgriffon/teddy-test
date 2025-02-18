import { z } from "zod";

export const ClientFormSchema = z.object({
  name: z.string().min(3),
  sallary: z.string().min(0),
  company_sallary: z.string().min(0),
})

export type ClientFormSchemaType = z.infer<typeof ClientFormSchema>