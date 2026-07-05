 "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RiTodoFill } from "react-icons/ri";
import { FaArrowLeft, FaArrowRight, FaPlus, FaSpinner } from "react-icons/fa";
import type { Task, Category, Priority } from "@/types";

// ── Sub Components ────────────────────────
import StepIndicator  from "./_components/StepIndicator";
import Step1ProjectInfo from "./_components/Step1ProjectInfo";
import Step2AddTasks  from "./_components/Step2AddTasks";
import Step3Confirm   from "./_components/Step3Confirm";

// ── Types ─────────────────────────────────
export interface ProjectDraft {
  name:  string;
  desc:  string;
  color: string;
  tasks: Task[];
}

const INITIAL_DRAFT: ProjectDraft = {
  name:  "",
  desc:  "",
  color: "#7c3aed",
  tasks: [],
};

export default function NewProjectPage() {
  const router = useRouter();
  const [step,    setStep]    = useState<1 | 2 | 3>(1);
  const [draft,   setDraft]   = useState<ProjectDraft>(INITIAL_DRAFT);
  const [loading, setLoading] = useState(false);

  // ── Handlers ────────────────────────────
  const handleNext = () => {
    if (step === 1 && !draft.name.trim()) return;
    setStep((s) => Math.min(s + 1, 3) as 1 | 2 | 3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setStep((s) => Math.max(s - 1, 1) as 1 | 2 | 3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // TODO: เรียก API POST /api/projects
      await new Promise((r) => setTimeout(r, 1000)); // mock delay
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-violet-600 rounded-lg flex items-center justify-center">
              <RiTodoFill className="text-white" size={13} />
            </div>
            <span className="font-bold text-gray-900">
              Todo<span className="text-violet-600">Flow</span>
            </span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-violet-600 hover:bg-violet-50 px-3 py-1.5 rounded-lg transition-all"
          >
            <FaArrowLeft size={11} /> กลับ
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 pb-20 flex flex-col gap-8">

        {/* Step Indicator */}
        <StepIndicator currentStep={step} />

        {/* Pages */}
        {step === 1 && (
          <Step1ProjectInfo
            draft={draft}
            onChange={(d) => setDraft({ ...draft, ...d })}
          />
        )}
        {step === 2 && (
          <Step2AddTasks
            tasks={draft.tasks}
            onChange={(tasks) => setDraft({ ...draft, tasks })}
          />
        )}
        {step === 3 && (
          <Step3Confirm draft={draft} />
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-gray-700 hover:bg-gray-100 px-4 py-2.5 rounded-xl transition-all cursor-pointer"
            >
              <FaArrowLeft size={11} /> ย้อนกลับ
            </button>
          ) : <div />}

          {step < 3 ? (
            <button
              onClick={handleNext}
              disabled={step === 1 && !draft.name.trim()}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-sm shadow-violet-100 transition-all cursor-pointer"
            >
              {step === 1 ? "ถัดไป — เพิ่ม Tasks" : "ถัดไป — ยืนยัน"}
              <FaArrowRight size={12} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 active:scale-95 disabled:opacity-70 text-white font-bold text-sm px-8 py-3 rounded-xl shadow-md shadow-violet-200 transition-all cursor-pointer"
            >
              {loading
                ? <><FaSpinner className="animate-spin" size={13} /> กำลังสร้าง...</>
                : <>✦ สร้างโปรเจกต์เลย!</>
              }
            </button>
          )}
        </div>

      </div>
    </div>
  );
}