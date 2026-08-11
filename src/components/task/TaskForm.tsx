"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import type { Task, Category, Priority } from "@/types";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface TaskFormProps {
  onAdd: (task: Task) => void;
  onCancel: () => void;
}

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "design",      label: "Design" },
  { value: "development", label: "Dev" },
  { value: "marketing",   label: "Marketing" },
  { value: "research",    label: "Research" },
  { value: "meeting",     label: "Meeting" },
  { value: "other",       label: "Other" },
];

const PRIORITIES: { value: Priority; label: string; color: string }[] = [
  { value: "high",   label: "สูง",   color: "border-red-300     bg-red-50     text-red-500"     },
  { value: "medium", label: "กลาง",  color: "border-amber-300   bg-amber-50   text-amber-500"   },
  { value: "low",    label: "ต่ำ",   color: "border-emerald-300 bg-emerald-50 text-emerald-600" },
];

export default function TaskForm({ onAdd, onCancel }: TaskFormProps) {
  const [name,     setName]     = useState("");
  const [desc,     setDesc]     = useState("");
  const [category, setCategory] = useState<Category>("other");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate,  setDueDate]  = useState("");
  const [error,    setError]    = useState(false);

  const handleSubmit = () => {
    if (!name.trim()) { setError(true); return; }
    onAdd({
      id:        crypto.randomUUID(),
      name:      name.trim(),
      desc:      desc.trim(),
      category,
      priority,
      status:    "todo",
      dueDate:   dueDate || undefined,
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <Card className="border-violet-100 bg-violet-50/30 p-5 flex flex-col gap-4">
      <p className="text-xs font-semibold text-violet-500 uppercase tracking-widest">
        เพิ่ม Task ใหม่
      </p>

      {/* Name */}
      <div className="flex flex-col gap-1.5 text-left">
        <Label htmlFor="task-name">ชื่อ task</Label>
        <Input
          id="task-name"
          autoFocus
          type="text"
          value={name}
          onChange={(e) => { setName(e.target.value); setError(false); }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="ชื่อ task..."
          className={error ? "border-red-300 bg-red-50 focus-visible:ring-red-400" : ""}
        />
      </div>

      {/* Desc */}
      <div className="flex flex-col gap-1.5 text-left">
        <Label htmlFor="task-desc">รายละเอียด <span className="text-gray-400 font-normal text-xs">(ไม่บังคับ)</span></Label>
        <Textarea
          id="task-desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="รายละเอียด..."
          rows={2}
          className="resize-none"
        />
      </div>

      {/* Row: Category + DueDate */}
      <div className="flex gap-3 flex-wrap text-left">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="flex-1 min-w-[140px] text-sm text-gray-600 bg-white border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-violet-400 cursor-pointer"
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>

        <Input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="flex-1 min-w-[140px] text-sm text-gray-600 bg-white cursor-pointer"
        />
      </div>

      {/* Priority */}
      <div className="flex gap-2">
        {PRIORITIES.map((p) => (
          <button
            key={p.value}
            type="button"
            onClick={() => setPriority(p.value)}
            className={`flex-1 py-2 rounded-xl border-[1.5px] text-xs font-semibold transition-all cursor-pointer
              ${priority === p.value
                ? p.color
                : "border-gray-200 bg-white text-gray-400 hover:border-gray-300"
              }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2.5 pt-1">
        <Button
          variant="ghost"
          onClick={onCancel}
          className="flex-1"
        >
          ยกเลิก
        </Button>
        <Button
          onClick={handleSubmit}
          className="flex-1 gap-2"
        >
          <FaPlus size={11} />
          เพิ่ม Task
        </Button>
      </div>
    </Card>
  );
}