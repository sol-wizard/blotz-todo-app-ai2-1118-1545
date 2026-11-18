"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { taskSchema, TaskFormValues } from "../schemas/task";

interface AddTaskDialogProps {
  onAdd: (title: string) => Promise<void>;
}

export default function AddTaskDialog({ onAdd }: AddTaskDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: { title: "" },
  });

  // Only runs when the form passed the schema check.
  async function onSubmit(values: TaskFormValues) {
    try {
      await onAdd(values.title);
      form.reset();
      setIsOpen(false);
    } catch {
      // Keep the dialog open and the text in it, so the user can try again.
      form.setError("root", { message: "Could not save the task. Please try again." });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<Button className="mb-6" />}>Add Task</DialogTrigger>
      <DialogContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>New task</DialogTitle>
          </DialogHeader>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="task-title">Title</FieldLabel>
                <Input
                  {...field}
                  id="task-title"
                  autoFocus
                  aria-invalid={fieldState.invalid}
                  placeholder="What do you need to do?"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          {form.formState.errors.root && (
            <p role="alert" className="text-sm text-destructive">
              {form.formState.errors.root.message}
            </p>
          )}
          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>
              Cancel
            </DialogClose>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
