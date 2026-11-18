import { z } from "zod";

// All the rules for the Add Task form live here.
export const taskSchema = z.object({
  title: z.string().min(1).max(50),
});

// The form's TypeScript type comes straight from the schema.
export type TaskFormValues = z.infer<typeof taskSchema>;
