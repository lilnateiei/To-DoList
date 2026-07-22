import type { Category, Priority } from "@/types";

// ── Category Badge ─────────────────────────
const CATEGORY_CONFIG: Record<Category, { label: string; className: string }> = {
  design:      { label: "Design",      className: "bg-surface-1 text-ink border border-hairline"   },
  development: { label: "Development", className: "bg-surface-1 text-ink border border-hairline"   },
  marketing:   { label: "Marketing",   className: "bg-surface-1 text-ink border border-hairline"  },
  research:    { label: "Research",    className: "bg-surface-1 text-ink border border-hairline"   },
  meeting:     { label: "Meeting",     className: "bg-surface-1 text-ink border border-hairline" },
  other:       { label: "Other",       className: "bg-surface-1 text-neutral-600 border border-hairline"   },
};

// ── Priority Badge ─────────────────────────
const PRIORITY_CONFIG: Record<Priority, { label: string; className: string }> = {
  low:    { label: "Low",    className: "bg-surface-1 text-success border border-hairline" },
  medium: { label: "Medium", className: "bg-surface-1 text-warning border border-hairline"   },
  high:   { label: "High",   className: "bg-surface-1 text-error border border-hairline"     },
};

interface BadgeProps {
  type: "category" | "priority";
  value: Category | Priority;
}

export default function Badge({ type, value }: BadgeProps) {
  const config =
    type === "category"
      ? CATEGORY_CONFIG[value as Category]
      : PRIORITY_CONFIG[value as Priority];

  return (
    <span className={`inline-flex items-center text-overline font-medium px-2.5 py-1 rounded-full ${config.className}`}>
      {config.label}
    </span>
  );
}