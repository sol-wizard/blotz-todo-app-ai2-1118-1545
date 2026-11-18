import { Todo } from "../types";

const API_URL = "http://localhost:3001/todos";

export async function getAllTodos(): Promise<Todo[]> {
  const res = await fetch(API_URL, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to load to-dos");
  }
  return res.json();
}

export async function addTodo(title: string): Promise<Todo> {
  const newTodo: Todo = { id: crypto.randomUUID(), title, isDone: false };
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  });
  if (!res.ok) {
    throw new Error("Failed to add to-do");
  }
  return res.json();
}
