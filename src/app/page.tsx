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

export default function DashboardPage() {
  const [projects] = useState<Project[]>(MOCK_PROJECTS);

  const totalTasks = projects.reduce((acc, p) => acc + p.tasks.length, 0);
  const doneTasks  = projects.reduce((acc, p) => acc + p.tasks.filter(t => t.status === "done").length, 0);

  return (
    <div className="min-h-screen bg-canvas">

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 nav-bar">
        <div className="max-w-5xl mx-auto flex justify-between items-center px-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-purple-500 rounded-md flex items-center justify-center">
              <RiTodoFill className="text-canvas" size={14} />
            </div>
            <span className="font-bold text-ink text-body-md">
              To-do <span className="text-purple-500">List</span>
            </span>
          </div>
          <Link
            href="/project/new"
            className="btn-primary text-sm"
          >
            <FaPlus size={11} />
            โปรเจกต์ใหม่
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col gap-10">

        {/* ── Hero Stats ── */}
        <div className="flex flex-col gap-1">
          <p className="text-overline font-medium text-purple-500 uppercase tracking-widest">
            ภาพรวมทั้งหมด
          </p>
          <h1 className="text-display-xl font-semibold text-ink">
            สวัสดี 👋 วันนี้มีอะไรต้องทำ?
          </h1>

          {/* Stat Pills */}
          <div className="flex flex-wrap gap-3 mt-4">
            {[
              { label: "โปรเจกต์ทั้งหมด", value: projects.length,            color: "bg-surface-1 text-purple-500" },
              { label: "Tasks ทั้งหมด",   value: totalTasks,                 color: "bg-surface-1 text-ink"   },
              { label: "เสร็จแล้ว",        value: doneTasks,                  color: "bg-surface-1 text-success"},
              { label: "ยังค้างอยู่",       value: totalTasks - doneTasks,     color: "bg-surface-1 text-warning"  },
            ].map((s) => (
              <div key={s.label} className={`flex items-center gap-2 px-4 py-2 rounded-md text-body-sm font-medium ${s.color}`}>
                <span className="text-lg font-bold">{s.value}</span>
                <span className="text-neutral-600">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Project Grid ── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-body-sm font-medium text-neutral-600">
              <HiOutlineViewGrid size={16} />
              <span>โปรเจกต์ของฉัน</span>
            </div>
            <span className="text-caption-sm text-neutral-500">{projects.length} โปรเจกต์</span>
          </div>

          {projects.length === 0 ? (
            <EmptyState
              emoji="🗂️"
              title="ยังไม่มีโปรเจกต์"
              desc="สร้างโปรเจกต์แรกของคุณ แล้วเริ่มจัดการ tasks ได้เลย!"
              action={
                <Link
                  href="/project/new"
                  className="btn-primary text-sm"
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
                href="/project/new"
                className="flex flex-col items-center justify-center gap-2 border border-hairline rounded-lg p-8 text-neutral-500 hover:border-purple-500 hover:text-purple-500 hover:bg-surface-1 transition-all group min-h-[180px]"
              >
                <div className="w-10 h-10 rounded-md border border-hairline group-hover:border-purple-500 flex items-center justify-center transition-all">
                  <FaPlus size={14} />
                </div>
               
                <span className="text-body-sm font-medium">เพิ่มโปรเจกต์ใหม่</span>
                 
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}