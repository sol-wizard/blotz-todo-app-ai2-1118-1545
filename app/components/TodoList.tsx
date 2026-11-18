"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../types";
import { addTodo, clearDoneTodos, deleteTodo, getAllTodos, updateTodo } from "../api/todos";
import { Button } from "@/components/ui/button";
import TodoItem from "./TodoItem";
import AddTaskDialog from "./AddTaskDialog";

export default function TodoList() {
  const queryClient = useQueryClient();
  const { data: todos = [], isPending, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: getAllTodos,
  });

  const addMutation = useMutation({
    mutationFn: ({ title, dueDate }: { title: string; dueDate?: string }) =>
      addTodo(title, dueDate),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  async function handleAdd(title: string, dueDate?: string) {
    await addMutation.mutateAsync({ title, dueDate });
  }

  const toggleMutation = useMutation({
    mutationFn: (todo: Todo) => updateTodo(todo.id, { isDone: !todo.isDone }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const clearDoneMutation = useMutation({
    mutationFn: clearDoneTodos,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  function handleToggle(todo: Todo) {
    toggleMutation.mutate(todo);
  }

  function handleDelete(id: string) {
    deleteMutation.mutate(id);
  }

  if (isPending) {
    return <p className="text-zinc-500">Loading tasks...</p>;
  }

  if (isError) {
    return <p className="text-red-600">Could not load tasks. Is the server running?</p>;
  }

  return (
    <>
      <AddTaskDialog onAdd={handleAdd} />
      <ul className="flex flex-col gap-3">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            title={todo.title}
            isDone={todo.isDone}
            createdAt={todo.createdAt}
            dueDate={todo.dueDate}
            onToggle={() => handleToggle(todo)}
            onDelete={() => handleDelete(todo.id)}
          />
        ))}
      </ul>
      {todos.some((todo) => todo.isDone) && (
        <Button
          variant="outline"
          className="mt-4"
          disabled={clearDoneMutation.isPending}
          onClick={() => clearDoneMutation.mutate()}
        >
          Clear done
        </Button>
      )}
    </>
  );
}
