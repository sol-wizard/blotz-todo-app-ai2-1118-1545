import { Button } from "@/components/ui/button";

interface TodoItemProps {
  title: string;
  isDone: boolean;
  createdAt: string;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TodoItem({
  title,
  isDone,
  createdAt,
  onToggle,
  onDelete,
}: TodoItemProps) {
  return (
    <li className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 shadow-sm">
      <Button variant="ghost" size="icon" onClick={onToggle} aria-label="Mark as done">
        {isDone ? "✅" : "⬜"}
      </Button>
      <span className={`flex-1 ${isDone ? "text-zinc-400 line-through" : "text-zinc-800"}`}>
        {title}
      </span>
      <span className="text-xs text-zinc-400">{createdAt}</span>
      <Button variant="destructive" size="sm" onClick={onDelete}>
        Delete
      </Button>
    </li>
  );
}
