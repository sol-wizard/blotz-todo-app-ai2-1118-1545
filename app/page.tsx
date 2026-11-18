import { Suspense } from "react";
import TodoItem from "./components/TodoItem";
import { getAllTodos } from "./api/todos";

async function TodoList() {
  const todos = await getAllTodos();
  return (
    <ul className="flex flex-col gap-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} title={todo.title} isDone={todo.isDone} />
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-xl px-6 py-12">
      <h1 className="mb-6 text-3xl font-bold text-zinc-900">My To-dos</h1>
      <Suspense fallback={<p className="text-zinc-500">Loading...</p>}>
        <TodoList />
      </Suspense>
    </main>
  );
}
