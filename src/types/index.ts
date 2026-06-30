// src/types/index.ts

export type Priority = "low" | "medium" | "high";

export type Category =
  | "design"
  | "development"
  | "marketing"
  | "research"
  | "meeting"
  | "other";

export type TaskStatus = "todo" | "done";

// ── Task ──────────────────────────────────
export interface Task {
  id: string;
  name: string;
  desc?: string;
  category: Category;
  priority: Priority;
  status: TaskStatus;
  dueDate?: string;        // ISO string "2024-12-31"
  createdAt: string;
}

// ── Project ───────────────────────────────
export interface Project {
  id: string;
  name: string;
  desc?: string;
  color: string;           // hex เช่น "#8b5cf6"
  tasks: Task[];
  createdAt: string;
}

// ── Filter State ──────────────────────────
export interface TaskFilter {
  status: "all" | "todo" | "done";
  category: Category | "all";
  priority: Priority | "all";
}