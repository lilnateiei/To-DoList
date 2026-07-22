"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
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
const MOCK_PROJECT: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    desc: "ออกแบบหน้าเว็บใหม่ทั้งหมด",
    color: "#6c47ff",
    createdAt: new Date().toISOString(),
    tasks: [
      { id: "t1", name: "วาด Wireframe", category: "design",       priority: "high",   status: "done", createdAt: new Date().toISOString() },
      { id: "t2", name: "ทำ Prototype",  category: "design",       priority: "high",   status: "todo", createdAt: new Date().toISOString() },
      { id: "t3", name: "เขียน CSS",     category: "development",  priority: "medium", status: "todo", createdAt: new Date().toISOString() },
    ],
  },
  {
    id: "2",
    name: "Marketing Q1",
    desc: "แคมเปญการตลาดไตรมาสแรก",
    color: "#ea520c",
    createdAt: new Date().toISOString(),
    tasks: [
      { id: "t4", name: "วางแผนงบ",      category: "marketing",   priority: "high",   status: "done", createdAt: new Date().toISOString() },
      { id: "t5", name: "ทำ Content",     category: "marketing",   priority: "medium", status: "done", createdAt: new Date().toISOString() },
    ],
  },
];

   
export default function ProjectPage() {
  const params = useParams();
  const idFromUrl = params.id as string;
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECT);
  const [selectedId, setSelectedId] = useState<string>(idFromUrl);
  const [filter, setFilter] = useState<TFilter>({ status: "all", category: "all", priority: "all" });
  const [showForm, setShowForm] = useState(false);

  // ── หาโปรเจกต์ที่กำลังเลือกอยู่ ──────────
  const project = useMemo(
    () => projects.find((p) => p.id === selectedId),
    [projects, selectedId]
  );

  // ── Handlers ────────────────────────────
  const handleAddTask = (task: Task) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === selectedId ? { ...p, tasks: [task, ...p.tasks] } : p
      )
    );
    setShowForm(false);
  };

  const handleToggle = (id: string) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === selectedId
          ? {
              ...p,
              tasks: p.tasks.map((t) =>
                t.id === id ? { ...t, status: t.status === "done" ? "todo" : "done" } : t
              ),
            }
          : p
      )
    );
  };

  const handleDelete = (id: string) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === selectedId ? { ...p, tasks: p.tasks.filter((t) => t.id !== id) } : p
      )
    );
  };

  // ── Filter ──────────────────────────────
  const filtered = useMemo(() => {
    if (!project) return [];
    return project.tasks.filter((t) => {
      if (filter.status !== "all" && t.status !== filter.status) return false;
      if (filter.category !== "all" && t.category !== filter.category) return false;
      if (filter.priority !== "all" && t.priority !== filter.priority) return false;
      return true;
    });
  }, [project, filter]);

  const counts = {
    all: project?.tasks.length ?? 0,
    todo: project?.tasks.filter((t) => t.status === "todo").length ?? 0,
    done: project?.tasks.filter((t) => t.status === "done").length ?? 0,
  };

  if (!project) return null; // กันไว้เผื่อยังไม่มีโปรเจกต์ถูกเลือก
  return (
    <div className="min-h-screen bg-canvas">

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 nav-bar">
        <div className="max-w-3xl mx-auto flex justify-between items-center px-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-purple-500 rounded-md flex items-center justify-center">
              <RiTodoFill className="text-canvas" size={14} />
            </div>
            <span className="font-bold text-ink text-body-md">
              To-do <span className="text-purple-500">List</span>
            </span>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary text-sm cursor-pointer"
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
          className="flex items-center gap-1.5 text-body-sm text-neutral-500 hover:text-purple-500 transition-colors w-fit"
        >
          <FaArrowLeft size={11} />
          กลับหน้าหลัก
        </Link>

        {/* Project Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: project?.color }} />
            <h1 className="text-display-xl font-semibold text-ink">{project?.name}</h1>
          </div>
          {project?.desc && (
            <p className="text-body-sm text-neutral-500">{project?.desc}</p>
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
                className="btn-primary text-sm cursor-pointer"
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