"use client";

import type { TaskFilter, Category, Priority } from "@/types";

interface TaskFilterProps {
  filter: TaskFilter;
  onChange: (f: TaskFilter) => void;
  counts: { all: number; todo: number; done: number };
}

const STATUS_TABS = [
  { value: "all",  label: "ทั้งหมด" },
  { value: "todo", label: "ยังไม่เสร็จ" },
  { value: "done", label: "เสร็จแล้ว" },
] as const;

const CATEGORIES: { value: Category | "all"; label: string }[] = [
  { value: "all",         label: "ทุกประเภท" },
  { value: "design",      label: "🎨 Design" },
  { value: "development", label: "💻 Dev" },
  { value: "marketing",   label: "📣 Marketing" },
  { value: "research",    label: "🔍 Research" },
  { value: "meeting",     label: "🤝 Meeting" },
  { value: "other",       label: "📌 Other" },
];

const PRIORITIES: { value: Priority | "all"; label: string }[] = [
  { value: "all",    label: "ทุกระดับ" },
  { value: "high",   label: "🔴 สูง" },
  { value: "medium", label: "🟡 กลาง" },
  { value: "low",    label: "🟢 ต่ำ" },
];

export default function TaskFilter({ filter, onChange, counts }: TaskFilterProps) {
  return (
    <div className="flex flex-col gap-3">

      {/* Status Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onChange({ ...filter, status: tab.value })}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer
              ${filter.status === tab.value
                ? "bg-white text-violet-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
              }`}
          >
            {tab.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-md font-semibold
              ${filter.status === tab.value ? "bg-violet-100 text-violet-600" : "bg-gray-200 text-gray-400"}`}
            >
              {counts[tab.value]}
            </span>
          </button>
        ))}
      </div>

      {/* Category + Priority Filters */}
      <div className="flex gap-2 flex-wrap">
        {/* Category Dropdown */}
        <select
          value={filter.category}
          onChange={(e) => onChange({ ...filter, category: e.target.value as Category | "all" })}
          className="text-sm text-gray-600 bg-white border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-violet-400 cursor-pointer"
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>

        {/* Priority Dropdown */}
        <select
          value={filter.priority}
          onChange={(e) => onChange({ ...filter, priority: e.target.value as Priority | "all" })}
          className="text-sm text-gray-600 bg-white border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-violet-400 cursor-pointer"
        >
          {PRIORITIES.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </div>

    </div>
  );
}