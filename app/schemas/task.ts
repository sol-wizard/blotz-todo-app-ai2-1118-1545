import { z } from "zod";

// Today as "YYYY-MM-DD" in local time, the same format the date input gives.
function today() {
  return new Date().toLocaleDateString("en-CA");
}

// All the rules for the Add Task form live here.
export const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Please enter a title.")
    .max(50, "Keep the title to 50 characters or less."),
  // Optional: "" means no due date. A date before today is not allowed.
  dueDate: z
    .string()
    .refine((date) => date === "" || date >= today(), "The due date can't be before today."),
});

// The form's TypeScript type comes straight from the schema.
export type TaskFormValues = z.infer<typeof taskSchema>;
