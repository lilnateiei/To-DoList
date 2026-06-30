"use client";

import { useState } from "react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { RiTodoFill } from "react-icons/ri";
import { HiOutlineViewGrid } from "react-icons/hi";
import ProjectCard from "@/components/project/ProjectCard";
import EmptyState from "@/components/ui/EmptyState";
import type { Project } from "@/types";

// ── Mock Data ────────────────────────────
const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    desc: "ออกแบบหน้าเว็บใหม่ทั้งหมด",
    color: "#8b5cf6",
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
    color: "#f59e0b",
    createdAt: new Date().toISOString(),
    tasks: [
      { id: "t4", name: "วางแผนงบ",      category: "marketing",   priority: "high",   status: "done", createdAt: new Date().toISOString() },
      { id: "t5", name: "ทำ Content",     category: "marketing",   priority: "medium", status: "done", createdAt: new Date().toISOString() },
    ],
  },
];

export default function DashboardPage() {
  const [projects] = useState<Project[]>(MOCK_PROJECTS);

  const totalTasks = projects.reduce((acc, p) => acc + p.tasks.length, 0);
  const doneTasks  = projects.reduce((acc, p) => acc + p.tasks.filter(t => t.status === "done").length, 0);

  return (
    <div className="min-h-screen bg-white">

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-violet-600 rounded-lg flex items-center justify-center">
              <RiTodoFill className="text-white" size={14} />
            </div>
            <span className="font-bold text-gray-900">
              To-do <span className="text-violet-600">List</span>
            </span>
          </div>
          <Link
            href="/projects/new"
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 active:scale-95 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all"
          >
            <FaPlus size={11} />
            โปรเจกต์ใหม่
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col gap-10">

        {/* ── Hero Stats ── */}
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold text-violet-500 uppercase tracking-widest">
            ภาพรวมทั้งหมด
          </p>
          <h1 className="text-2xl font-bold text-gray-900">
            สวัสดี 👋 วันนี้มีอะไรต้องทำ?
          </h1>

          {/* Stat Pills */}
          <div className="flex flex-wrap gap-3 mt-4">
            {[
              { label: "โปรเจกต์ทั้งหมด", value: projects.length,            color: "bg-violet-50 text-violet-600" },
              { label: "Tasks ทั้งหมด",   value: totalTasks,                 color: "bg-blue-50   text-blue-600"   },
              { label: "เสร็จแล้ว",        value: doneTasks,                  color: "bg-emerald-50 text-emerald-600"},
              { label: "ยังค้างอยู่",       value: totalTasks - doneTasks,     color: "bg-amber-50  text-amber-600"  },
            ].map((s) => (
              <div key={s.label} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${s.color}`}>
                <span className="text-lg font-bold">{s.value}</span>
                <span className="opacity-70">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Project Grid ── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
              <HiOutlineViewGrid size={16} />
              <span>โปรเจกต์ของฉัน</span>
            </div>
            <span className="text-xs text-gray-400">{projects.length} โปรเจกต์</span>
          </div>

          {projects.length === 0 ? (
            <EmptyState
              emoji="🗂️"
              title="ยังไม่มีโปรเจกต์"
              desc="สร้างโปรเจกต์แรกของคุณ แล้วเริ่มจัดการ tasks ได้เลย!"
              action={
                <Link
                  href="/projects/new"
                  className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
                >
                  <FaPlus size={11} />
                  สร้างโปรเจกต์แรก
                </Link>
              }
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}

              {/* Add New Project Card */}
              <Link
                href="/projects/new"
                className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-2xl p-8 text-gray-400 hover:border-violet-300 hover:text-violet-500 hover:bg-violet-50 transition-all group min-h-[180px]"
              >
                <div className="w-10 h-10 rounded-xl border-2 border-dashed border-gray-300 group-hover:border-violet-400 flex items-center justify-center transition-all">
                  <FaPlus size={14} />
                </div>
                <span className="text-sm font-medium">เพิ่มโปรเจกต์ใหม่</span>
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}