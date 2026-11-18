import { z } from "zod";

// All the rules for the Add Task form live here.
export const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Please enter a title.")
    .max(50, "Keep the title to 50 characters or less."),
});

// The form's TypeScript type comes straight from the schema.
export type TaskFormValues = z.infer<typeof taskSchema>;
