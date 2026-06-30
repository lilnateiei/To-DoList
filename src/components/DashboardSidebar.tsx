// components/Sidebar.tsx
import { RiTodoFill } from "react-icons/ri";
import { IoStatsChartSharp } from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="flex flex-col w-64 bg-slate-950 p-6 h-screen text-white">
      <h1 className="text-xl font-bold mb-8 tracking-wider">Dashboard</h1>
      
      <ul className="space-y-2 font-medium cursor-pointer">
        <MenuItem href="/todos" icon={<RiTodoFill />} label="รายการสิ่งที่ต้องทำ" />
        <MenuItem href="/stats" icon={<IoStatsChartSharp />} label="สถิติรวม" />
        <MenuItem href="/backlog" icon={<LuClipboardList />} label="งานที่ยังคงค้างอยู่" />
      </ul>
    </aside>
  );
}

// ย่อย Component ลงไปอีกเพื่อความสะอาด
function MenuItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} className="flex items-center p-3 rounded-lg hover:bg-gray-800 transition-all duration-300">
      <span className="mr-3">{icon}</span>
      {label}
    </Link>
  );
}