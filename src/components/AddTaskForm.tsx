"use client";

import { useState } from "react";
import { Priority, Task } from "@/types";



interface AddTaskFormProps {
  onAddTask: (task: Task) => void;
}

const PRIORITY_OPTIONS: { value: Priority; label: string; activeClass: string }[] = [
  {
    value: "low",
    label: " ต่ำ",
    activeClass: "border-emerald-500 bg-emerald-50 text-emerald-600",
  },
  {
    value: "medium",
    label: " กลาง",
    activeClass: "border-amber-400 bg-amber-50 text-amber-500",
  },
  {
    value: "high",
    label: " สูง",
    activeClass: "border-red-400 bg-red-50 text-red-500 ",
  },
];

export default function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState<Priority>("low");
  const [nameError, setNameError] = useState(false);

  const handleSubmit = () => {
    if (!name.trim()) {
      setNameError(true);
      setTimeout(() => setNameError(false), 1500);
      return;
    }

    onAddTask({
      id: Date.now(),
      name: name.trim(),
      desc: desc.trim(),
      priority,
      done: false,
    });

    setName("");
    setDesc("");
    setPriority("low");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-6">
      {/* Card Title */}
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
        เพิ่ม Task ใหม่
      </p>

      <div className="flex flex-col gap-4">
        {/* Task Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-500">
            ชื่อ Task <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="เช่น ออกแบบหน้า Dashboard"
            className={`w-full px-4 py-2.5 rounded-xl border-[1.5px] text-sm text-gray-800 bg-gray-50 outline-none transition-all
              focus:bg-white focus:border-violet-600
              ${nameError ? "border-red-400 bg-red-50" : "border-gray-200"}`}
          />
          {nameError && (
            <p className="text-xs text-red-400 mt-0.5">กรุณากรอกชื่อ Task</p>
          )}
        </div>

        {/* Task Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-500">
            รายละเอียด{" "}
            <span className="text-gray-300 font-normal">(ไม่บังคับ)</span>
          </label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="เพิ่มรายละเอียดของ task..."
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl border-[1.5px] border-gray-200 text-sm text-gray-800 bg-gray-50 outline-none resize-none transition-all focus:bg-white focus:border-violet-600"
          />
        </div>

        {/* Priority */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-500">
            ความสำคัญ
          </label>
          <div className="flex gap-2">
            {PRIORITY_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setPriority(option.value)}
                className={`flex-1 py-2 rounded-lg border-[1.5px] text-sm font-medium transition-all cursor-pointer
                  ${
                    priority === option.value
                      ? option.activeClass
                      : "border-gray-200 bg-gray-50 text-gray-400 hover:border-violet-300 hover:text-violet-500"
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={handleSubmit}
        className="mt-5 w-full py-3 bg-violet-700 hover:bg-violet-800 active:scale-[0.98] text-white text-sm font-semibold rounded-xl transition-all cursor-pointer"
      >
        + เพิ่ม Task
      </button>
    </div>
  );
}