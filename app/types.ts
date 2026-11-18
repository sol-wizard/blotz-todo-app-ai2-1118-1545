export interface Todo {
  id: string;
  title: string;
  isDone: boolean;
  createdAt: string; // the day the task was added, e.g. "2026-11-18"
  dueDate?: string; // optional due date, e.g. "2026-11-25"
}
