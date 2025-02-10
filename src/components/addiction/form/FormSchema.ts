
import * as z from "zod";

export const addictionFormSchema = z.object({
  addiction_type_id: z.string({
    required_error: "Please select an addiction type",
  }),
  start_date: z.date({
    required_error: "Please select a start date",
  }),
  notes: z.string().optional(),
  status: z.literal("active"),
});

export type AddictionFormValues = z.infer<typeof addictionFormSchema>;
