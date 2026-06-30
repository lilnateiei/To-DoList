interface TaskSummaryProps {
  total: number;
  done: number;
}

export default function TaskSummary({ total, done }: TaskSummaryProps) {
  const progress = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="pt-4 mt-2 border-t border-gray-100">
      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-gray-100 rounded-full mb-3 overflow-hidden">
        <div
          className="h-full bg-violet-600 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-400">
        <span>
          ทั้งหมด{" "}
          <span className="font-semibold text-violet-600">{total}</span> รายการ
        </span>
        <span>
          เสร็จแล้ว{" "}
          <span className="font-semibold text-violet-600">{done}</span> รายการ
          {total > 0 && (
            <span className="ml-1 text-gray-300">({progress}%)</span>
          )}
        </span>
      </div>
    </div>
  );
}