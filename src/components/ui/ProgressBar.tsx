interface ProgressBarProps {
  total: number;
  done: number;
  showLabel?: boolean;
}

export default function ProgressBar({ total, done, showLabel = true }: ProgressBarProps) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="w-full flex flex-col gap-1.5">
      {showLabel && (
        <div className="flex justify-between text-caption-sm text-neutral-500">
          <span>{done}/{total} tasks</span>
          <span className="font-medium text-purple-500">{pct}%</span>
        </div>
      )}
      <div className="w-full h-1.5 bg-surface-2 rounded-md overflow-hidden">
        <div
          className="h-full rounded-md transition-all duration-700"
          style={{
            width: `${pct}%`,
            background: pct === 100
              ? "linear-gradient(90deg, var(--color-success), #34d399)"  // สีเขียวเมื่อเสร็จ 100%
              : "linear-gradient(90deg, var(--color-purple-500), #a78bfa)", // สีม่วงปกติ
          }}
        />
      </div>
    </div>
  );
}

 

