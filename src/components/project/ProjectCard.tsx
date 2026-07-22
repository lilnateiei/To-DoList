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
      href={`/project/${project.id}`}
      className="group flex flex-col gap-4 bg-canvas border border-hairline rounded-lg p-5 shadow-card hover:shadow-modal hover:-translate-y-0.5 transition-all duration-200"
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
            <p className="font-semibold text-ink text-body-md leading-snug group-hover:text-purple-500 transition-colors">
              {project.name}
            </p>
            {project.desc && (
              <p className="text-caption-sm text-neutral-500 mt-0.5 line-clamp-1">
                {project.desc}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={(e) => e.preventDefault()}
          className="text-neutral-400 hover:text-neutral-600 p-1 rounded-sm transition-colors"
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
            <span className="text-caption-sm text-neutral-400">ยังไม่มี task</span>
          )}
        </div>
      )}

      {/* Progress */}
      <div className="mt-auto">
        {total > 0 ? (
          <ProgressBar total={total} done={done} />
        ) : (
          <p className="text-caption-sm text-neutral-400">ยังไม่มี task</p>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-hairline">
        <span className="text-caption-sm text-neutral-500">
          {total} tasks
        </span>
        {done === total && total > 0 ? (
          <span className="text-caption-sm font-medium text-success">✅ เสร็จแล้ว!</span>
        ) : (
          <span className="text-caption-sm text-neutral-500">
            เหลือ{" "}
            <span className="font-semibold text-warning">{total - done}</span>{" "}
            รายการ
          </span>
        )}
      </div>
    </Link>
  );
}