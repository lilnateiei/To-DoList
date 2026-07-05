import type { Category, Priority } from "@/types";

// ── Category Badge ─────────────────────────
const CATEGORY_CONFIG: Record<Category, { label: string; className: string }> = {
  design:      { label: "🎨 Design",      className: "bg-pink-50   text-pink-500"   },
  development: { label: "💻 Dev",         className: "bg-blue-50   text-blue-500"   },
  marketing:   { label: "📣 Marketing",   className: "bg-amber-50  text-amber-500"  },
  research:    { label: "🔍 Research",    className: "bg-teal-50   text-teal-500"   },
  meeting:     { label: "🤝 Meeting",     className: "bg-orange-50 text-orange-500" },
  other:       { label: "📌 Other",       className: "bg-gray-100  text-gray-500"   },
};

// ── Priority Badge ─────────────────────────
const PRIORITY_CONFIG: Record<Priority, { label: string; className: string }> = {
  low:    { label: "ต่ำ",   className: "bg-emerald-50 text-emerald-600" },
  medium: { label: "กลาง", className: "bg-amber-50   text-amber-500"   },
  high:   { label: "สูง",   className: "bg-red-50     text-red-500"     },
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
    <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${config.className}`}>
      {config.label}
    </span>
  );
}