import TodoItem from "./components/TodoItem";
import { Todo } from "./types";

const todos: Todo[] = [
  { id: "1", title: "Read the Next.js docs", isDone: true },
  { id: "2", title: "Build the to-do list", isDone: false },
  { id: "3", title: "Open a PR", isDone: false },
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-xl px-6 py-12">
      <h1 className="mb-6 text-3xl font-bold text-zinc-900">My To-dos</h1>
      <ul className="flex flex-col gap-3">
        {todos.map((todo) => (
          <TodoItem key={todo.id} title={todo.title} isDone={todo.isDone} />
        ))}
      </ul>
    </main>
  );
}
