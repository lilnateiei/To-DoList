import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";
import ProgressBar from "@/components/ui/ProgressBar";
import Badge from "@/components/ui/Badge";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const done  = project.tasks.filter((t) => t.status === "done").length;
  const total = project.tasks.length;

  // หา top categories
  const categories = [...new Set(project.tasks.map((t) => t.category))].slice(0, 2);

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group flex flex-col gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-200"
    >
      {/* Top Row */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Color Dot */}
          <div
            className="w-3 h-3 rounded-full flex-shrink-0 mt-0.5"
            style={{ backgroundColor: project.color }}
          />
          <div>
            <p className="font-semibold text-gray-900 text-sm leading-snug group-hover:text-violet-600 transition-colors">
              {project.name}
            </p>
            {project.desc && (
              <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                {project.desc}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={(e) => e.preventDefault()}
          className="text-gray-300 hover:text-gray-500 p-1 rounded-lg transition-colors"
        >
          <BsThreeDots size={16} />
        </button>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="flex gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <Badge key={cat} type="category" value={cat} />
          ))}
          {project.tasks.length === 0 && (
            <span className="text-xs text-gray-300">ยังไม่มี task</span>
          )}
        </div>
      )}

      {/* Progress */}
      <div className="mt-auto">
        {total > 0 ? (
          <ProgressBar total={total} done={done} />
        ) : (
          <p className="text-xs text-gray-300">ยังไม่มี task</p>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <span className="text-xs text-gray-400">
          {total} tasks
        </span>
        {done === total && total > 0 ? (
          <span className="text-xs font-semibold text-emerald-500">✅ เสร็จแล้ว!</span>
        ) : (
          <span className="text-xs text-gray-400">
            เหลือ{" "}
            <span className="font-semibold text-amber-500">{total - done}</span>{" "}
            รายการ
          </span>
        )}
      </div>
    </Link>
  );
}