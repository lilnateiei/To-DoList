"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import { RiTodoFill } from "react-icons/ri";
import { User, LogOut, ChevronDown, Repeat } from "lucide-react";

type UserProfile = {
  name: string;
  email: string;
  avatar?: string;
};

const PRESET_USERS: UserProfile[] = [
  {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
];

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncUser = () => {
      const storedUser = window.localStorage.getItem("todo-user");
      if (!storedUser) {
        setUser(null);
        return;
      }
      try {
        setUser(JSON.parse(storedUser) as UserProfile);
      } catch {
        window.localStorage.removeItem("todo-user");
        setUser(null);
      }
    };

    syncUser();

    // Close dropdown on outside click
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSwitchUser = (selected: UserProfile) => {
    window.localStorage.setItem("todo-user", JSON.stringify(selected));
    setUser(selected);
    setDropdownOpen(false);
    router.refresh();
  };

  const handleLogout = () => {
    window.localStorage.removeItem("todo-user");
    setUser(null);
    setDropdownOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100 px-6 py-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-violet-600 rounded-lg flex items-center justify-center">
            <RiTodoFill className="text-white" size={14} />
          </div>
          <span className="font-bold text-gray-900">
            To-do <span className="text-violet-600">List</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
     

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2.5 rounded-2xl border border-gray-200 bg-white px-3 py-1.5 shadow-sm hover:border-violet-300 transition-all cursor-pointer"
              >
                {user.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-700">
                    {user.name ? user.name.slice(0, 1).toUpperCase() : "U"}
                  </div>
                )}
                <div className="hidden text-left sm:block">
                  <p className="text-xs font-semibold text-gray-900 leading-tight">{user.name}</p>
                  <p className="text-[10px] text-gray-500 leading-tight">{user.email}</p>
                </div>
                <ChevronDown size={14} className={`text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white p-1.5 shadow-lg border border-gray-100 z-50 animate-in fade-in-50 zoom-in-95">
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition-colors"
                  >
                    <User size={15} />
                    <span>จัดการโปรไฟล์</span>
                  </Link>

                  <div className="my-1 border-t border-gray-100" />

                  <div className="px-3 py-1">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                      สลับบัญชีด่วน
                    </p>
                    {PRESET_USERS.map((preset) => {
                      if (preset.email === user.email) return null;
                      return (
                        <button
                          key={preset.email}
                          type="button"
                          onClick={() => handleSwitchUser(preset)}
                          className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer"
                        >
                          <Repeat size={12} className="text-violet-500" />
                          <span className="truncate">{preset.name}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="my-1 border-t border-gray-100" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <LogOut size={15} />
                    <span>ออกจากระบบ</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-violet-200 bg-violet-50 text-sm font-medium text-violet-700 hover:bg-violet-100 h-9 px-4 py-2 transition-colors"
            >
              เข้าสู่ระบบ
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}