import { Todo } from "../types";

const API_URL = "http://localhost:3001/todos";

export async function getAllTodos(): Promise<Todo[]> {
  const res = await fetch(API_URL, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to load to-dos");
  }
  return res.json();
}

export async function addTodo(title: string, dueDate?: string): Promise<Todo> {
  const newTodo: Todo = {
    id: crypto.randomUUID(),
    title,
    isDone: false,
    createdAt: new Date().toLocaleDateString("en-CA"), // "YYYY-MM-DD" in local time
    ...(dueDate ? { dueDate } : {}),
  };
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

export async function updateTodo(id: string, changes: Partial<Todo>): Promise<Todo> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(changes),
  });
  if (!res.ok) {
    throw new Error("Failed to update to-do");
  }
  return res.json();
}

export async function deleteTodo(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    throw new Error("Failed to delete to-do");
  }
}

export async function clearDoneTodos(): Promise<void> {
  const res = await fetch(`${API_URL}?isDone=true`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to load done to-dos");
  }
  const doneTodos: Todo[] = await res.json();
  await Promise.all(doneTodos.map((todo) => deleteTodo(todo.id)));
}
