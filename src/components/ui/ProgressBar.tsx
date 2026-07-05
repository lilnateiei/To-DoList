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
        <div className="flex justify-between text-xs text-gray-400">
          <span>{done}/{total} tasks</span>
          <span className="font-semibold text-violet-600">{pct}%</span>
        </div>
      )}
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${pct}%`,
            background: pct === 100
              ? "linear-gradient(90deg, #10b981, #34d399)"  // สีเขียวเมื่อเสร็จ 100%
              : "linear-gradient(90deg, #8b5cf6, #a78bfa)", // สีม่วงปกติ
          }}
        />
      </div>
    </div>
  );
}

 

