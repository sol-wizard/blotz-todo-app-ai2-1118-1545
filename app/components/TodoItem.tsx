interface TodoItemProps {
  title: string;
  isDone: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TodoItem({ title, isDone, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 shadow-sm">
      <button onClick={onToggle} className="text-lg" aria-label="Mark as done">
        {isDone ? "✅" : "⬜"}
      </button>
      <span className={`flex-1 ${isDone ? "text-zinc-400 line-through" : "text-zinc-800"}`}>
        {title}
      </span>
      <button
        onClick={onDelete}
        className="rounded-md px-2 py-1 text-sm text-red-600 hover:bg-red-50"
      >
        Delete
      </button>
    </li>
  );
}
