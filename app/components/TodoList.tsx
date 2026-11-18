"use client";

import { useState } from "react";
import { Todo } from "../types";
import { addTodo } from "../api/todos";
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

  return (
    <>
      <AddTaskDialog onAdd={handleAdd} />
      <ul className="flex flex-col gap-3">
        {todos.map((todo) => (
          <TodoItem key={todo.id} title={todo.title} isDone={todo.isDone} />
        ))}
      </ul>
    </>
  );
}
