interface Props { currentStep: 1 | 2 | 3 }

const STEPS = [
  { n: 1, label: "ข้อมูลโปรเจกต์" },
  { n: 2, label: "เพิ่ม Tasks"     },
  { n: 3, label: "ยืนยัน"          },
];

export default function StepIndicator({ currentStep }: Props) {
  return (
    <div className="flex items-center justify-center gap-0">
      {STEPS.map((s, i) => (
        <div key={s.n} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
              ${s.n < currentStep  ? "bg-violet-600 text-white shadow-sm shadow-violet-200"
              : s.n === currentStep ? "bg-violet-600 text-white shadow-sm shadow-violet-200"
              : "bg-gray-200 text-gray-400"}`}
            >
              {s.n < currentStep
                ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3}><path d="M5 13l4 4L19 7"/></svg>
                : s.n
              }
            </div>
            <span className={`text-xs font-medium transition-colors whitespace-nowrap
              ${s.n <= currentStep ? "text-violet-600 font-semibold" : "text-gray-400"}`}
            >
              {s.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-12 sm:w-20 h-[2px] rounded-full mb-5 mx-1 transition-all duration-500
              ${currentStep > s.n ? "bg-violet-300" : "bg-gray-200"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}