"use client";

import type { ProjectDraft } from "@/types";

const COLORS = [
  "#7c3aed","#3b82f6","#10b981",
  "#f59e0b","#ef4444","#ec4899",
  "#06b6d4","#f97316",
];

interface Props {
  draft:    Partial<ProjectDraft>;
  onChange: (d: Partial<ProjectDraft>) => void;
}

export default function Step1ProjectInfo({ draft, onChange }: Props) {
  const first = (draft.name ?? "").charAt(0).toUpperCase() || "P";

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">

      {/* Header */}
      <div>
        <p className="text-xs font-semibold text-violet-500 uppercase tracking-widest mb-1">ขั้นตอนที่ 1</p>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">ตั้งชื่อโปรเจกต์ 🗂️</h1>
        <p className="text-sm text-gray-400 mt-1">กรอกข้อมูลพื้นฐานให้โปรเจกต์ของคุณ</p>
      </div>

      {/* Form Card */}
      <div className="border border-gray-100 rounded-2xl p-6 flex flex-col gap-5 shadow-sm">

        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">
            ชื่อโปรเจกต์ <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={draft.name ?? ""}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="เช่น Website Redesign, แอปจัดการเงิน..."
            className={`w-full px-4 py-3 rounded-xl border bg-gray-50 text-sm text-gray-800
              placeholder:text-gray-400 outline-none transition-all
              focus:border-violet-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(124,58,237,.08)]
              ${!draft.name?.trim() && draft.name !== undefined && draft.name !== ""
                ? "border-red-300 bg-red-50"
                : "border-gray-200"
              }`}
          />
        </div>

        {/* Desc */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">
            คำอธิบาย{" "}
            <span className="text-gray-400 font-normal text-xs">(ไม่บังคับ)</span>
          </label>
          <textarea
            value={draft.desc ?? ""}
            onChange={(e) => onChange({ desc: e.target.value })}
            rows={3}
            placeholder="อธิบายเป้าหมายของโปรเจกต์..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm
              text-gray-800 placeholder:text-gray-400 outline-none resize-none
              focus:border-violet-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(124,58,237,.08)] transition-all"
          />
        </div>

        {/* Color */}
        <div className="flex flex-col gap-2.5">
          <label className="text-sm font-semibold text-gray-700">สีธีมโปรเจกต์</label>
          <div className="flex gap-2.5 flex-wrap">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => onChange({ color: c })}
                className={`w-9 h-9 rounded-full cursor-pointer border-[3px] border-white shadow-md transition-all
                  ${draft.color === c ? "ring-2 ring-offset-1 ring-gray-900 scale-110" : "ring-2 ring-transparent hover:scale-105"}`}
                style={{ background: c }}
              />
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">ตัวอย่างการ์ด</label>
          <div className="flex items-center gap-3 border border-gray-100 rounded-2xl p-4 bg-gray-50">
            <div
              className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-white font-bold"
              style={{ background: draft.color ?? "#7c3aed" }}
            >
              {first}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {draft.name?.trim() || "ชื่อโปรเจกต์"}
              </p>
              <p className="text-xs text-gray-400 truncate mt-0.5">
                {draft.desc?.trim() || "คำอธิบายโปรเจกต์..."}
              </p>
            </div>
            <div
              className="text-xs px-2.5 py-1 rounded-full font-semibold text-white flex-shrink-0"
              style={{ background: draft.color ?? "#7c3aed" }}
            >
              0 tasks
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}