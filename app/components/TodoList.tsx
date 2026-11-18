"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../types";
import { addTodo, deleteTodo, getAllTodos, updateTodo } from "../api/todos";
import TodoItem from "./TodoItem";
import AddTaskDialog from "./AddTaskDialog";

export default function TodoList() {
  const queryClient = useQueryClient();
  const { data: todos = [], isPending, isError, refetch } = useQuery({
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

  async function handleToggle(todo: Todo) {
    await updateTodo(todo.id, { isDone: !todo.isDone });
    await refetch();
  }

  async function handleDelete(id: string) {
    await deleteTodo(id);
    await refetch();
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
    </>
  );
}
