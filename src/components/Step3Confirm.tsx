"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash, FaCalendar, FaClock } from "react-icons/fa";
import type { ProjectDraft } from "@/page";
import type { Task, Category, Priority } from "@/types";

const CATEGORY_MAP = {
  other:       { label: "Other",      bg: "bg-gray-100",   text: "text-gray-500"   },
  design:      { label: "Design",     bg: "bg-pink-50",    text: "text-pink-500"   }, 
  development: { label: "Development", bg: "bg-blue-50",    text: "text-blue-500"   },
  marketing:   { label: "Marketing",  bg: "bg-amber-50",   text: "text-amber-500"  },
  research:    { label: "Research",   bg: "bg-teal-50",    text: "text-teal-500"   },
  meeting:     { label: "Meeting",    bg: "bg-orange-50",  text: "text-orange-500" },
};

const PRIORITY_MAP = {
  high:   { label: "High",   bg: "bg-red-50",     text: "text-red-500"     },
  medium: { label: "Medium", bg: "bg-amber-50",   text: "text-amber-500"   },
  low:    { label: "Low",    bg: "bg-emerald-50", text: "text-emerald-600" },
};

interface Props {
  draft: ProjectDraft;
}

export default function Step3Confirm({ draft }: Props) {
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [previewMode, setPreviewMode] = useState<'card' | 'list'>('card');

  // ── Calculate Stats ─────────────────────
  const totalTasks      = draft.tasks.length;
  const highPriorityTasks = draft.tasks.filter(t => t.priority === "high").length;
  const mediumPriorityTasks = draft.tasks.filter(t => t.priority === "medium").length;
  const lowPriorityTasks = draft.tasks.filter(t => t.priority === "low").length;
  const hasDueDateTasks = draft.tasks.filter(t => t.dueDate).length;
  const categories      = [...new Set(draft.tasks.map(t => t.category))];
  const firstLetter     = draft.name.charAt(0).toUpperCase() || "P";
  
  // Overdue tasks
  const today = new Date().toISOString().split('T')[0];
  const overdueTasks = draft.tasks.filter(t => t.dueDate && t.dueDate < today).length;
  const upcomingTasks = draft.tasks.filter(t => t.dueDate && t.dueDate >= today).length;

  // Display tasks (show first 5, or all if toggled)
  const displayTasks = showAllTasks ? draft.tasks : draft.tasks.slice(0, 5);
  const hasMoreTasks = draft.tasks.length > 5;

  // ── Get Config Functions ────────────────
  const getCategoryConfig = (cat: Category) => 
    CATEGORY_MAP[cat as Category] || CATEGORY_MAP.other;
  
  const getPriorityConfig = (prio: Priority) => 
    PRIORITY_MAP[prio as Priority] || PRIORITY_MAP.medium;

  // ── Estimate Project Duration ───────────
  const getProjectEstimate = () => {
    const taskCount = draft.tasks.length;
    if (taskCount === 0) return "ไม่มีงาน";
    if (taskCount <= 3) return "1-2 วัน";
    if (taskCount <= 7) return "3-5 วัน";
    if (taskCount <= 15) return "1-2 สัปดาห์";
    return "2+ สัปดาห์";
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">

      {/* Header */}
      <div>
        <p className="text-xs font-semibold text-violet-500 uppercase tracking-widest mb-1">
          ขั้นตอนที่ 3
        </p>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          ยืนยันโปรเจกต์ ✅
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          ตรวจสอบข้อมูลก่อนสร้างโปรเจกต์ของคุณ
        </p>
      </div>

      {/* Project Summary Card */}
      <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm bg-white">

        {/* Project Header */}
        <div 
          className="p-6 flex items-center gap-4 relative overflow-hidden"
          style={{ 
            background: `linear-gradient(135deg, ${draft.color}15, ${draft.color}25)` 
          }}
        >
          {/* Background Pattern */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, ${draft.color} 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${draft.color} 0%, transparent 50%)`
            }}
          />
          
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-lg relative z-10"
            style={{ background: `linear-gradient(135deg, ${draft.color}, ${draft.color}cc)` }}
          >
            {firstLetter}
          </div>
          
          <div className="flex-1 min-w-0 relative z-10">
            <h3 className="font-bold text-gray-900 text-xl truncate mb-1">
              {draft.name}
            </h3>
            {draft.desc ? (
              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                {draft.desc}
              </p>
            ) : (
              <p className="text-sm text-gray-400 italic">
                ไม่มีคำอธิบาย
              </p>
            )}
            
            {/* Project Meta */}
            <div className="flex items-center gap-3 mt-2">
              <span 
                className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full"
                style={{ 
                  background: `${draft.color}20`, 
                  color: draft.color 
                }}
              >
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ background: draft.color }}
                />
                โปรเจกต์ใหม่
              </span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <FaClock size={10} />
                ประมาณ {getProjectEstimate()}
              </span>
            </div>
          </div>

        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 divide-x divide-gray-100 border-t border-gray-100">
          
          <div className="p-4 text-center hover:bg-gray-50 transition-colors">
            <p className="text-2xl font-bold text-gray-900 mb-1">{totalTasks}</p>
            <p className="text-xs text-gray-500 font-medium">Tasks ทั้งหมด</p>
          </div>

          <div className="p-4 text-center hover:bg-gray-50 transition-colors">
            <p className="text-2xl font-bold text-red-500 mb-1">{highPriorityTasks}</p>
            <p className="text-xs text-gray-500 font-medium">สำคัญสูง</p>
          </div>

          <div className="p-4 text-center hover:bg-gray-50 transition-colors">
            <p className="text-2xl font-bold text-blue-500 mb-1">{hasDueDateTasks}</p>
            <p className="text-xs text-gray-500 font-medium">มีกำหนดส่ง</p>
          </div>

          <div className="p-4 text-center hover:bg-gray-50 transition-colors">
            <p className="text-2xl font-bold text-violet-500 mb-1">{categories.length}</p>
            <p className="text-xs text-gray-500 font-medium">ประเภทงาน</p>
          </div>

        </div>

      </div>

      {/* Priority Breakdown */}
      {totalTasks > 0 && (
        <div className="grid sm:grid-cols-3 gap-4">
          
          <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🔴</span>
              <p className="text-sm font-bold text-red-700">สำคัญสูง</p>
            </div>
            <p className="text-2xl font-bold text-red-600 mb-1">{highPriorityTasks}</p>
            <p className="text-xs text-red-500">
              {totalTasks > 0 ? Math.round((highPriorityTasks / totalTasks) * 100) : 0}% ของงานทั้งหมด
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🟡</span>
              <p className="text-sm font-bold text-amber-700">สำคัญกลาง</p>
            </div>
            <p className="text-2xl font-bold text-amber-600 mb-1">{mediumPriorityTasks}</p>
            <p className="text-xs text-amber-500">
              {totalTasks > 0 ? Math.round((mediumPriorityTasks / totalTasks) * 100) : 0}% ของงานทั้งหมด
            </p>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🟢</span>
              <p className="text-sm font-bold text-emerald-700">สำคัญต่ำ</p>
            </div>
            <p className="text-2xl font-bold text-emerald-600 mb-1">{lowPriorityTasks}</p>
            <p className="text-xs text-emerald-500">
              {totalTasks > 0 ? Math.round((lowPriorityTasks / totalTasks) * 100) : 0}% ของงานทั้งหมด
            </p>
          </div>

        </div>
      )}

      {/* Tasks Preview */}
      <div className="border border-gray-100 rounded-2xl bg-white overflow-hidden">
        
        {/* Header with Toggle */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-1">
              รายการ Tasks ({totalTasks})
            </h4>
            {totalTasks > 0 && (
              <p className="text-xs text-gray-500">
                แสดง {displayTasks.length} จาก {totalTasks} รายการ
              </p>
            )}
          </div>
          
          {totalTasks > 0 && (
            <div className="flex items-center gap-2">
              {hasMoreTasks && (
                <button
                  onClick={() => setShowAllTasks(!showAllTasks)}
                  className="flex items-center gap-1 text-xs font-medium text-violet-600 hover:text-violet-700 bg-violet-50 hover:bg-violet-100 px-3 py-2 rounded-lg transition-all"
                >
                  {showAllTasks ? <FaEyeSlash size={10} /> : <FaEye size={10} />}
                  {showAllTasks ? 'แสดงน้อยลง' : 'แสดงทั้งหมด'}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Tasks List */}
        {totalTasks === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📋</span>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">
              ยังไม่มี task
            </p>
            <p className="text-xs text-gray-400">
              สามารถเพิ่มได้ภายหลังเมื่อสร้างโปรเจกต์เรียบร้อยแล้ว
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {displayTasks.map((task, i) => {
              const catConfig  = getCategoryConfig(task.category);
              const prioConfig = getPriorityConfig(task.priority);
              const isOverdue  = task.dueDate && task.dueDate < today;
              
              return (
                <div
                  key={task.id}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors"
                >
                  {/* Number */}
                  <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-gray-500 font-bold">{i + 1}</span>
                  </div>

                  {/* Priority */}
                  <span 
                    className="text-base flex-shrink-0" 
                    title={`ความสำคัญ${prioConfig.label}`}
                  >
                    {prioConfig.emoji}
                  </span>

                  {/* Task Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate mb-1">
                      {task.name}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Category */}
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${catConfig.bg} ${catConfig.text}`}>
                        {catConfig.label}
                      </span>
                      {/* Due Date */}
                      {task.dueDate && (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1
                          ${isOverdue 
                            ? 'bg-red-50 text-red-600' 
                            : 'bg-blue-50 text-blue-600'
                          }`}
                        >
                          <FaCalendar size={8} />
                          {new Date(task.dueDate + "T00:00:00").toLocaleDateString("th-TH", {
                            day: "numeric",
                            month: "short",
                          })}
                          {isOverdue && <span className="text-red-600">⚠️</span>}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Priority Badge */}
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${prioConfig.bg} ${prioConfig.text} flex-shrink-0`}>
                    {prioConfig.label}
                  </span>

                </div>
              );
            })}
            
            {!showAllTasks && hasMoreTasks && (
              <div className="p-4 text-center border-t border-gray-100">
                <button
                  onClick={() => setShowAllTasks(true)}
                  className="text-xs text-violet-600 hover:text-violet-700 font-medium"
                >
                  และอีก {draft.tasks.length - 5} รายการ...
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Additional Info Grid */}
      <div className="grid sm:grid-cols-2 gap-4">

        {/* Category Breakdown */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-base">📊</span>
            <p className="text-sm font-bold text-gray-700">ประเภทงาน</p>
          </div>
          
          {categories.length > 0 ? (
            <div className="space-y-2">
              {categories.map(cat => {
                const config = getCategoryConfig(cat);
                const count  = draft.tasks.filter(t => t.category === cat).length;
                const percentage = Math.round((count / totalTasks) * 100);
                
                return (
                  <div key={cat} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${config.bg} ${config.text}`}>
                        {config.label}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-gray-700">{count}</span>
                      <span className="text-xs text-gray-400 ml-1">({percentage}%)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">
              ไม่มีการจัดประเภทงาน
            </p>
          )}
        </div>

        {/* Timeline & Summary */}
        <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-base">⏱️</span>
            <p className="text-sm font-bold text-violet-700">สรุปโปรเจกต์</p>
          </div>
          
          <div className="space-y-3">
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-violet-600">ชื่อโปรเจกต์:</span>
              <span className="text-sm font-semibold text-violet-800 truncate ml-2 max-w-[140px]" title={draft.name}>
                {draft.name}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-violet-600">จำนวน Tasks:</span>
              <span className="text-sm font-semibold text-violet-800">
                {totalTasks} รายการ
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-violet-600">ระยะเวลาประมาณ:</span>
              <span className="text-sm font-semibold text-violet-800">
                {getProjectEstimate()}
              </span>
            </div>
            
            {hasDueDateTasks > 0 && (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-violet-600">มีกำหนดส่ง:</span>
                  <span className="text-sm font-semibold text-blue-600">
                    {hasDueDateTasks} tasks
                  </span>
                </div>
                
                {overdueTasks > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-red-600">เกินกำหนด:</span>
                    <span className="text-sm font-semibold text-red-600">
                      {overdueTasks} tasks ⚠️
                    </span>
                  </div>
                )}
              </>
            )}
            
            <div className="flex justify-between items-center pt-2 border-t border-violet-200">
              <span className="text-sm text-violet-600">สีธีม:</span>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                  style={{ background: draft.color }}
                />
                <span className="text-xs font-mono text-violet-700">
                  {draft.color.toUpperCase()}
                </span>
              </div>
            </div>
            
          </div>
        </div>

      </div>

      {/* Live Preview Card */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            ตัวอย่างการ์ดในหน้าหลัก
          </p>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            Live Preview
          </span>
        </div>
        
        <div className="border border-gray-100 rounded-2xl p-5 bg-white shadow-sm">
          
          {/* Card Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0 mt-0.5 animate-pulse"
                style={{ background: draft.color }}
              />
              <div>
                <p className="text-sm font-semibold text-gray-900 leading-snug">
                  {draft.name}
                </p>
                {draft.desc && (
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                    {draft.desc}
                  </p>
                )}
              </div>
            </div>
            <div className="text-gray-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="5" r="1"/>
                <circle cx="12" cy="12" r="1"/>
                <circle cx="12" cy="19" r="1"/>
              </svg>
            </div>
          </div>

          {/* Categories Preview */}
          {categories.length > 0 && (
            <div className="flex gap-1.5 flex-wrap mb-4">
              {categories.slice(0, 3).map(cat => {
                const config = getCategoryConfig(cat);
                return (
                  <span 
                    key={cat} 
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${config.bg} ${config.text}`}
                  >
                    {config.label}
                  </span>
                );
              })}
              {categories.length > 3 && (
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-400">
                  +{categories.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>{totalTasks} tasks</span>
              <span 
                className="font-bold animate-pulse" 
                style={{ color: draft.color }}
              >
                0% • เริ่มใหม่
              </span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: "0%",
                  background: `linear-gradient(90deg, ${draft.color}, ${draft.color}88)`
                }}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-50">
            <span className="text-xs text-gray-400">เพิ่งสร้าง</span>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></div>
              <span className="text-xs font-semibold text-amber-600">
                รอเริ่มงาน
              </span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}