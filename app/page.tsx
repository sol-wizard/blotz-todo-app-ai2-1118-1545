import Link from "next/link";
import TodoList from "./components/TodoList";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-xl px-6 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-zinc-900">My To-dos</h1>
        <Link href="/about" className="font-medium text-blue-600 hover:underline">
          About
        </Link>
      </div>
      <TodoList />
    </main>
  );
}
