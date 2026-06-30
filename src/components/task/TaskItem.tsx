 "use client";

import { useState } from "react";
import { FaTrash, FaChevronDown } from "react-icons/fa";
import { MdDragIndicator } from "react-icons/md";
import { BsCalendar3 } from "react-icons/bs";
import Badge from "@/components/ui/Badge";
import type { Task } from "@/types";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const [expanded, setExpanded] = useState(false);

  const isDue = task.dueDate
    ? new Date(task.dueDate) < new Date()
    : false;

  return (
    <div className={`group border rounded-xl transition-all duration-200
      ${task.status === "done"
        ? "bg-gray-50/50 border-gray-100"
        : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm"
      }`}
    >
      {/* Main Row */}
      <div className="flex items-center gap-3 px-4 py-3.5">

        {/* Drag Handle */}
        <MdDragIndicator
          size={16}
          className="text-gray-200 group-hover:text-gray-300 flex-shrink-0 cursor-grab hidden sm:block"
        />

        {/* Checkbox */}
        <button
          onClick={() => onToggle(task.id)}
          className={`w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all cursor-pointer
            ${task.status === "done"
              ? "bg-violet-500 border-violet-500"
              : "border-gray-300 hover:border-violet-400"
            }`}
        >
          {task.status === "done" && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        {/* Task Name */}
        <span className={`flex-1 text-sm font-medium transition-all
          ${task.status === "done" ? "line-through text-gray-400" : "text-gray-800"}`}
        >
          {task.name}
        </span>

        {/* Badges (desktop) */}
        <div className="hidden sm:flex items-center gap-2">
          <Badge type="category" value={task.category} />
          <Badge type="priority" value={task.priority} />

          {/* Due Date */}
          {task.dueDate && (
            <span className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium
              ${isDue && task.status !== "done"
                ? "bg-red-50 text-red-500"
                : "bg-gray-50 text-gray-400"
              }`}
            >
              <BsCalendar3 size={10} />
              {new Date(task.dueDate).toLocaleDateString("th-TH", { day: "numeric", month: "short" })}
            </span>
          )}
        </div>

        {/* Expand (mobile) */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="sm:hidden text-gray-300 p-1"
        >
          <FaChevronDown
            size={12}
            className={`transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </button>

        {/* Delete */}
        <button
          onClick={() => onDelete(task.id)}
          className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 p-1 rounded-lg transition-all cursor-pointer ml-1"
        >
          <FaTrash size={12} />
        </button>
      </div>

      {/* Expand on mobile */}
      {expanded && (
        <div className="sm:hidden px-4 pb-3 flex flex-wrap gap-1.5 border-t border-gray-50 pt-2.5">
          <Badge type="category" value={task.category} />
          <Badge type="priority" value={task.priority} />
          {task.dueDate && (
            <span className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium
              ${isDue ? "bg-red-50 text-red-500" : "bg-gray-50 text-gray-400"}`}
            >
              <BsCalendar3 size={10} />
              {new Date(task.dueDate).toLocaleDateString("th-TH")}
            </span>
          )}
          {task.desc && (
            <p className="w-full text-xs text-gray-400 mt-1">{task.desc}</p>
          )}
        </div>
      )}
    </div>
  );
}