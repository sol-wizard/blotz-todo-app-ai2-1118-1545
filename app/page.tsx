import { Suspense } from "react";
import TodoList from "./components/TodoList";
import { getAllTodos } from "./api/todos";

async function TodoSection() {
  const todos = await getAllTodos();
  return <TodoList initialTodos={todos} />;
}

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-xl px-6 py-12">
      <h1 className="mb-6 text-3xl font-bold text-zinc-900">My To-dos</h1>
      <Suspense fallback={<p className="text-zinc-500">Loading...</p>}>
        <TodoSection />
      </Suspense>
    </main>
  );
}
