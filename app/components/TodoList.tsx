"use client";

import { useState } from "react";
import { Todo } from "../types";
import { addTodo, deleteTodo, updateTodo } from "../api/todos";
import TodoItem from "./TodoItem";
import AddTaskDialog from "./AddTaskDialog";

interface TodoListProps {
  initialTodos: Todo[];
}

export default function TodoList({ initialTodos }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  async function handleAdd(title: string) {
    const saved = await addTodo(title);
    setTodos((current) => [...current, saved]);
  }

  async function handleToggle(todo: Todo) {
    const saved = await updateTodo(todo.id, { isDone: !todo.isDone });
    setTodos((current) => current.map((t) => (t.id === saved.id ? saved : t)));
  }

  async function handleDelete(id: string) {
    await deleteTodo(id);
    setTodos((current) => current.filter((t) => t.id !== id));
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
            onToggle={() => handleToggle(todo)}
            onDelete={() => handleDelete(todo.id)}
          />
        ))}
      </ul>
    </>
  );
}
