interface TodoItemProps {
  title: string;
  isDone: boolean;
}

export default function TodoItem({ title, isDone }: TodoItemProps) {
  return (
    <li className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 shadow-sm">
      <span className="text-lg">{isDone ? "✅" : "⬜"}</span>
      <span className={isDone ? "text-zinc-400 line-through" : "text-zinc-800"}>
        {title}
      </span>
    </li>
  );
}
