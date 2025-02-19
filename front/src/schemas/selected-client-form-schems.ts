import { z } from "zod";

export const SelectedClientFormSchema = z.object({
  clients: z.array(z.string()),
})

export type SelectedClientFormSchemaType = z.infer<typeof SelectedClientFormSchema>
