"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FaPlus, FaArrowLeft } from "react-icons/fa";
import { RiTodoFill } from "react-icons/ri";
import TaskItem from "@/components/task/TaskItem";
import TaskFilter from "@/components/task/TaskFilter";
import TaskForm from "@/components/task/TaskForm";
import ProgressBar from "@/components/ui/ProgressBar";
import EmptyState from "@/components/ui/EmptyState";
import type { Task, Project, TaskFilter as TFilter } from "@/types";

// ── Mock ────────────────────────────────
const MOCK_PROJECT: Project = {
  id: "1",
  name: "Website Redesign",
  desc: "ออกแบบหน้าเว็บใหม่ทั้งหมด ให้ทันสมัยและใช้งานง่าย",
  color: "#8b5cf6",
  createdAt: new Date().toISOString(),
  tasks: [
    { id: "t1", name: "วาด Wireframe หน้าหลัก", category: "design",       priority: "high",   status: "done", createdAt: new Date().toISOString(), dueDate: "2024-12-20" },
    { id: "t2", name: "ทำ Prototype",            category: "design",       priority: "high",   status: "todo", createdAt: new Date().toISOString(), dueDate: "2024-12-25" },
    { id: "t3", name: "เขียน Component CSS",     category: "development",  priority: "medium", status: "todo", createdAt: new Date().toISOString() },
    { id: "t4", name: "ประชุมทีม UX",             category: "meeting",      priority: "low",    status: "done", createdAt: new Date().toISOString() },
    { id: "t5", name: "Research Competitor",     category: "research",     priority: "medium", status: "todo", createdAt: new Date().toISOString() },
  ],
};

export default function ProjectPage() {
  const [project, setProject]   = useState<Project>(MOCK_PROJECT);
  const [filter, setFilter]     = useState<TFilter>({ status: "all", category: "all", priority: "all" });
  const [showForm, setShowForm] = useState(false);

  // ── Handlers ────────────────────────────
  const handleAddTask = (task: Task) => {
    setProject((p) => ({ ...p, tasks: [task, ...p.tasks] }));
    setShowForm(false);
  };

  const handleToggle = (id: string) => {
    setProject((p) => ({
      ...p,
      tasks: p.tasks.map((t) =>
        t.id === id ? { ...t, status: t.status === "done" ? "todo" : "done" } : t
      ),
    }));
  };

  const handleDelete = (id: string) => {
    setProject((p) => ({ ...p, tasks: p.tasks.filter((t) => t.id !== id) }));
  };

  // ── Filter ──────────────────────────────
  const filtered = useMemo(() => {
    return project.tasks.filter((t) => {
      if (filter.status   !== "all" && t.status   !== filter.status)   return false;
      if (filter.category !== "all" && t.category !== filter.category) return false;
      if (filter.priority !== "all" && t.priority !== filter.priority) return false;
      return true;
    });
  }, [project.tasks, filter]);

  const counts = {
    all:  project.tasks.length,
    todo: project.tasks.filter((t) => t.status === "todo").length,
    done: project.tasks.filter((t) => t.status === "done").length,
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100 px-6 py-4">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-violet-600 rounded-lg flex items-center justify-center">
              <RiTodoFill className="text-white" size={14} />
            </div>
            <span className="font-bold text-gray-900">
              To-do <span className="text-violet-600">List</span>
            </span>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 active:scale-95 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <FaPlus size={11} />
            เพิ่ม Task
          </button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col gap-6">

        {/* Back */}
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-violet-600 transition-colors w-fit"
        >
          <FaArrowLeft size={11} />
          กลับหน้าหลัก
        </Link>

        {/* Project Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: project.color }} />
            <h1 className="text-xl font-bold text-gray-900">{project.name}</h1>
          </div>
          {project.desc && (
            <p className="text-sm text-gray-400">{project.desc}</p>
          )}
          <ProgressBar total={counts.all} done={counts.done} />
        </div>

        {/* Task Form (inline) */}
        {showForm && (
          <TaskForm
            onAdd={handleAddTask}
            onCancel={() => setShowForm(false)}
          />
        )}

        {/* Filter */}
        <TaskFilter filter={filter} onChange={setFilter} counts={counts} />

        {/* Task List */}
        {filtered.length === 0 ? (
          <EmptyState
            emoji={filter.status === "done" ? "🎉" : "📋"}
            title={filter.status === "done" ? "ยังไม่มี task ที่เสร็จ" : "ไม่มี task ตรงเงื่อนไข"}
            desc="ลองเปลี่ยน filter หรือเพิ่ม task ใหม่ได้เลย"
            action={
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                <FaPlus size={11} />
                เพิ่ม Task
              </button>
            }
          />
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}