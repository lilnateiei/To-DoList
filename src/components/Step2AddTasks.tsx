import { useState } from "react";
import { FaPlus, FaTrash, FaCalendar } from "react-icons/fa";
import { MdDragIndicator } from "react-icons/md";
import type { Task, Category, Priority } from "@/types";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/Badge";
import Back from "@/components/ui/Back"

const CATEGORIES = [
  { value: "other",       label: "ประเภท", bg: "bg-gray-100",   text: "text-gray-500"   },
  { value: "design",      label: "Design",   bg: "bg-pink-50",    text: "text-pink-500"   },
  { value: "development", label: "Dev",      bg: "bg-blue-50",    text: "text-blue-500"   },
  { value: "marketing",   label: "Marketing", bg: "bg-amber-50",   text: "text-amber-500"  },
  { value: "research",    label: "Research",  bg: "bg-teal-50",    text: "text-teal-500"   },
  { value: "meeting",     label: "Meeting",   bg: "bg-orange-50",  text: "text-orange-500" },
] as const;

const PRIORITIES = [
  { value: "high",   label: "สูง",   bg: "bg-red-50",     text: "text-red-500",     border: "border-red-300"     },
  { value: "medium", label: "กลาง", bg: "bg-amber-50",   text: "text-amber-500",   border: "border-amber-300"   },
  { value: "low",    label: "ต่ำ",   bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-300" },
] as const;

interface Props {
  tasks: Task[];
  onChange: (tasks: Task[]) => void;
}

export default function Step2AddTasks({ tasks, onChange }: Props) {
  const [taskName, setTaskName] = useState("");
  const [category, setCategory] = useState<Category>("other");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate,  setDueDate]  = useState("");
  const [error,    setError]    = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // ── Add Task Handler ────────────────────
  const addTask = async () => {
    const name = taskName.trim();
    if (!name) {
      setError("กรุณาใส่ชื่อ task");
      setTimeout(() => setError(""), 2000);
      return;
    }

    if (name.length > 100) {
      setError("ชื่อ task ยาวเกินไป (สูงสุด 100 ตัวอักษร)");
      setTimeout(() => setError(""), 2000);
      return;
    }

    setIsAdding(true);

    try {
      const newTask: Task = {
        id:        crypto.randomUUID(),
        name,
        desc:      "",
        category,
        priority,
        status:    "todo",
        dueDate:   dueDate || undefined,
        createdAt: new Date().toISOString(),
      };

      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 300));
      
      onChange([...tasks, newTask]);
      
      // Reset form
      setTaskName("");
      setDueDate("");
      setError("");
      
      // Show success feedback
      showToast(`เพิ่ม "${name}" เรียบร้อย`);
      
    } catch (err) {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่");
      setTimeout(() => setError(""), 2000);
    } finally {
      setIsAdding(false);
    }
  };

  const deleteTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    onChange(tasks.filter(t => t.id !== id));
    if (task) {
      showToast(`ลบ "${task.name}" แล้ว`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addTask();
    }
  };

  // ── Get Config ──────────────────────────
  const getCategoryConfig = (cat: Category) => 
    CATEGORIES.find(c => c.value === cat) || CATEGORIES[0];

  const getPriorityConfig = (prio: Priority) => 
    PRIORITIES.find(p => p.value === prio) || PRIORITIES[1];

  // ── Toast (Simple) ──────────────────────
  const showToast = (message: string) => {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-6 right-6 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm font-medium';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
  };

  // ── Calculate Stats ─────────────────────
  const highPriorityCount = tasks.filter(t => t.priority === "high").length;
  const dueDateCount = tasks.filter(t => t.dueDate).length;
  const categories = [...new Set(tasks.map(t => t.category))];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold text-violet-500 uppercase tracking-widest mb-1">
          ขั้นตอนที่ 2
        </p>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          เพิ่ม Tasks
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          เพิ่มงานที่ต้องทำในโปรเจกต์นี้ ข้ามได้ถ้ายังไม่พร้อม
        </p>
      </div>

      {/* Add Task Form */}
      <Card className="p-5 flex flex-col gap-4 shadow-sm border border-gray-100 bg-white">
        
        {/* Header with Task Count */}
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            เพิ่ม Task ใหม่
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-violet-600 bg-violet-50 px-2.5 py-1 rounded-full font-semibold">
              {tasks.length} tasks
            </span>
            {tasks.length > 0 && (
              <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full font-medium">
                {highPriorityCount} สำคัญ
              </span>
            )}
          </div>
        </div>

        {/* Task Name Input */}
        <div className="flex gap-2.5 text-left">
          <div className="flex-1 relative">
            <Input
              type="text"
              value={taskName}
              onChange={(e) => {
                setTaskName(e.target.value);
                if (error) setError("");
              }}
              onKeyDown={handleKeyDown}
              placeholder="ชื่อ task... (กด Enter เพื่อเพิ่ม)"
              className={`py-3 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none pr-16 ${error ? "border-red-300 bg-red-50 focus-visible:ring-red-400" : ""}`}
              disabled={isAdding}
              maxLength={100}
            />
            {taskName && (
              <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs flex-shrink-0 transition-colors
                ${taskName.length > 80 ? 'text-amber-500' : 'text-gray-300'}
                ${taskName.length > 95 ? 'text-red-500 font-semibold' : ''}`}
              >
                {taskName.length}/100
              </span>
            )}
          </div>
          <Button
            onClick={addTask}
            disabled={isAdding || !taskName.trim()}
            className="shadow-sm shadow-violet-200"
          >
            {isAdding ? (
              <div className="animate-spin w-3 h-3 border border-white border-t-transparent rounded-full" />
            ) : (
              <FaPlus size={10} />
            )}
            {isAdding ? "กำลังเพิ่ม..." : "เพิ่ม"}
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="px-3 py-2 bg-red-50 border border-red-100 rounded-lg animate-in fade-in slide-in-from-top-1 duration-200">
            <p className="text-xs text-red-600 font-medium">{error}</p>
          </div>
        )}

        {/* Meta Controls */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">

          {/* Category Selector */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="col-span-2 sm:col-span-1 text-xs text-gray-600 bg-white border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-violet-400 focus:shadow-[0_0_0_3px_rgba(124,58,237,.08)] cursor-pointer font-medium transition-all"
            disabled={isAdding}
          >
            {CATEGORIES.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>

          {/* Priority Buttons */}
          <div className="flex gap-1">
            {PRIORITIES.map(p => (
              <Button
                key={p.value}
                type="button"
                variant={priority === p.value ? "default" : "outline"}
                onClick={() => setPriority(p.value as Priority)}
                disabled={isAdding}
                className={`flex-1 text-xs py-2.5 font-semibold transition-all cursor-pointer ${
                  priority === p.value ? p.bg + " " + p.text + " " + p.border : ""
                }`}
                title={`ความสำคัญ${p.label}`}
                size="sm"
              >
                {p.label}
              </Button>
            ))}
          </div>

          {/* Due Date */}
          <div className="col-span-2 sm:col-span-2 relative">
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full text-xs text-gray-600 bg-white cursor-pointer transition-all pr-8"
              disabled={isAdding}
              min={new Date().toISOString().split('T')[0]}
            />
            <FaCalendar 
              size={10} 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>

        </div>

        {/* Quick Stats */}
        {tasks.length > 0 && (
          <div className="flex gap-3 pt-2 border-t border-gray-100">
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <span className="font-medium">{categories.length} ประเภท</span>
            </span>
            {dueDateCount > 0 && (
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <span className="font-medium">{dueDateCount} มีกำหนด</span>
              </span>
            )}
            {highPriorityCount > 0 && (
              <span className="text-xs text-red-500 flex items-center gap-1 font-medium">
                {highPriorityCount} สำคัญสูง
              </span>
            )}
          </div>
        )}

      </Card>

      {/* Task List */}
      {tasks.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50/30 animate-in fade-in duration-300">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 font-semibold text-xs">
              0
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">ยังไม่มี task</p>
              <p className="text-xs text-gray-400 mt-1">เพิ่มงานด้านบน หรือข้ามไปก่อนก็ได้</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          
          {/* List Header */}
          <div className="flex items-center justify-between px-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
              รายการ Tasks ({tasks.length})
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <MdDragIndicator size={12} />
              <span>ลากเพื่อเรียงลำดับ</span>
            </div>
          </div>

          {/* Task Items */}
          <div className="flex flex-col gap-2">
            {tasks.map((task, index) => {
              const catConfig  = getCategoryConfig(task.category);
              const prioConfig = getPriorityConfig(task.priority);
              const isOverdue  = task.dueDate && new Date(task.dueDate) < new Date();

              return (
                <div
                  key={task.id}
                  className="group flex items-center gap-3 px-4 py-3.5 rounded-xl border border-gray-100 bg-white hover:shadow-sm hover:border-gray-200 transition-all animate-in fade-in slide-in-from-left-2 duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >

                  {/* Drag Handle */}
                  <MdDragIndicator
                    size={14}
                    className="text-gray-200 group-hover:text-gray-300 cursor-grab active:cursor-grabbing flex-shrink-0 hidden sm:block"
                    title="ลากเพื่อเรียงลำดับ"
                  />

                  {/* Number Badge */}
                  <div className="w-6 h-6 rounded-lg border-2 border-gray-200 flex-shrink-0 flex items-center justify-center bg-gray-50 group-hover:border-violet-300 transition-colors">
                    <span className="text-[10px] text-gray-400 font-bold">{index + 1}</span>
                  </div>

                  {/* Task Name */}
                  <span className="flex-1 text-sm font-medium text-gray-700 min-w-0 truncate group-hover:text-gray-900 transition-colors">
                    {task.name}
                  </span>

                  {/* Badges */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    
                    {/* Category Badge */}
                    <Badge variant={task.category}>
                      {catConfig.label}
                    </Badge>
                    
                    {/* Priority Badge */}
                    <Badge variant={task.priority}>
                      {prioConfig.label}
                    </Badge>
                    
                    {/* Due Date Badge */}
                    {task.dueDate && (
                      <Badge variant={isOverdue ? "destructive" : "outline"} className="gap-1">
                        <FaCalendar size={8} />
                        {new Date(task.dueDate + "T00:00:00").toLocaleDateString("th-TH", {
                          day: "numeric",
                          month: "short",
                        })}
                      </Badge>
                    )}
                    
                  </div>

                  {/* Delete Button */}
                  <Button
                    onClick={() => deleteTask(task.id)}
                    variant="ghost"
                    className="opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-red-50 p-2 h-8 w-8 transition-all"
                    title="ลบ task นี้"
                    size="icon"
                  >
                    <FaTrash size={11} />
                  </Button>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Progress Summary */}
      {tasks.length > 0 && (
        <div className="bg-gradient-to-r from-violet-50 to-blue-50 border border-violet-100 rounded-2xl p-5 flex items-center gap-4 animate-in fade-in duration-300">
          
          <div className="w-12 h-12 rounded-2xl bg-violet-600 flex items-center justify-center flex-shrink-0 shadow-lg">
            <span className="text-white text-xl font-bold">{tasks.length}</span>
          </div>
          
          <div className="flex-1">
            <p className="text-sm font-bold text-violet-800 mb-1">
              เพิ่มงานไปแล้ว <span className="text-violet-600">{tasks.length}</span> รายการ
            </p>
            <div className="flex gap-4 text-xs text-violet-600">
              <span>{categories.length} ประเภท</span>
              {dueDateCount > 0 && <span>{dueDateCount} มีกำหนด</span>}
              {highPriorityCount > 0 && <span>{highPriorityCount} สำคัญสูง</span>}
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-xs text-violet-500 mb-1">ความพร้อม</p>
            <div className="w-20 h-2 bg-violet-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-violet-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(tasks.length * 10, 100)}%` }}
              />
            </div>
          </div>

        </div>
      )}

    </div>
  );
}