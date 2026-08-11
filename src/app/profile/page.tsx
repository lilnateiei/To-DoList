"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Back from "@/components/ui/Back";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, LogOut, CheckCircle2, ShieldAlert, Camera, Users, PlusCircle } from "lucide-react";

type UserProfile = {
  id?: string;
  name: string;
  email: string;
  avatar?: string;
};

const DEFAULT_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
];

const PRESET_USERS: UserProfile[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar: DEFAULT_AVATARS[1],
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: DEFAULT_AVATARS[0],
  },
  {
    id: "3",
    name: "Alex Developer",
    email: "alex@example.com",
    avatar: DEFAULT_AVATARS[3],
  },
];

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAvatarFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const storedUser = window.localStorage.getItem("todo-user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser) as UserProfile;
        setUser(parsed);
        setName(parsed.name || "");
        setEmail(parsed.email || "");
        setAvatar(parsed.avatar || "");
      } catch {
        window.localStorage.removeItem("todo-user");
      }
    }
    setLoading(false);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const updatedUser: UserProfile = {
      ...user,
      name: name.trim(),
      email: email.trim(),
      avatar: avatar || undefined,
    };

    window.localStorage.setItem("todo-user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setSavedSuccess(true);

    setTimeout(() => {
      setSavedSuccess(false);
    }, 3000);
  };

  const handleSwitchUser = (selectedUser: UserProfile) => {
    window.localStorage.setItem("todo-user", JSON.stringify(selectedUser));
    setUser(selectedUser);
    setName(selectedUser.name);
    setEmail(selectedUser.email);
    setAvatar(selectedUser.avatar || "");
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("todo-user");
    setUser(null);
    router.push("/");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-400 text-sm">กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 flex flex-col items-center justify-center">
        <Card className="w-full max-w-md text-center p-6 border-gray-100 shadow-lg">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldAlert size={32} />
          </div>
          <CardTitle className="text-xl font-bold text-gray-900 mb-2">ยังไม่ได้เข้าสู่ระบบ</CardTitle>
          <CardDescription className="text-gray-500 mb-6">
            กรุณาเข้าสู่ระบบก่อนเพื่อดูและจัดการโปรไฟล์ของคุณ
          </CardDescription>
          <div className="flex gap-3 justify-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-lg bg-violet-600 text-white font-medium text-sm px-5 py-2.5 hover:bg-violet-700 transition-colors"
            >
              เข้าสู่ระบบ
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 font-medium text-sm px-5 py-2.5 hover:bg-gray-50 transition-colors"
            >
              กลับหน้าหลัก
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <Back href="/" label="กลับหน้าหลัก" />
          <h1 className="text-lg font-bold text-gray-900">จัดการโปรไฟล์</h1>
          <div className="w-20" />
        </div>

        {/* Profile Info Card */}
        <Card className="border border-gray-100 shadow-sm overflow-hidden bg-white">
          <CardHeader className="bg-violet-500 text-white p-6">
            <div className="flex items-center gap-4">
              <label
                htmlFor="avatar-upload"
                className="group relative cursor-pointer rounded-full border-2 border-white/50 transition-all hover:ring-2 hover:ring-white/60"
                aria-label="เปลี่ยนรูปโปรไฟล์"
              >
                {avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={avatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover shadow-md"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-2xl font-bold text-white shadow-inner">
                    {user.name ? user.name.slice(0, 1).toUpperCase() : "U"}
                  </div>
                )}
                <input
                  id="avatar-upload"
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
                  onChange={handleAvatarFileChange}
                />
                <div className="pointer-events-none absolute inset-0 rounded-full bg-black/0 transition-colors duration-200 group-hover:bg-black/10" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <div className="inline-flex items-center justify-center rounded-full bg-black/40 p-1.5">
                    <Camera size={16} className="text-white opacity-80" />
                  </div>
                </div>
              </label>
              <div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-violet-100 text-sm">{user.email}</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSave} className="space-y-2">
              <div className="flex items-center gap-2 text-violet-600 font-semibold text-sm">
                <User size={18} />
                <span>ข้อมูลส่วนตัว</span>
              </div>
              {/* Avatar Picker */}
             
               
                  <div className="flex items-center gap-3 flex-wrap">
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    {avatar && (
                      <button
                        type="button"
                        onClick={() => setAvatar("")}
                        className="text-xs rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        ล้างรูป
                      </button>
                    )}
                  </div>

              <div className="space-y-1.5">
                <Label htmlFor="name">ชื่อผู้ใช้งาน</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ระบุชื่อของคุณ"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">อีเมล</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end">
                <Button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white">
                  บันทึกการเปลี่ยนแปลง
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Switch Account Card */}
        <Card className="border border-gray-100 shadow-sm bg-white">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-gray-900 font-bold text-base">
              <Users size={18} className="text-violet-600" />
              <span>สลับโปรไฟล์ / บัญชีผู้ใช้งาน</span>
            </div>
            <CardDescription className="text-sm text-gray-500">
              เลือกเปลี่ยนโปรไฟล์หรือเข้าสู่ระบบด้วยบัญชีอื่นทันที
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PRESET_USERS.map((p) => {
                const isActive = user.email === p.email;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSwitchUser(p)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isActive
                        ? "border-violet-500 bg-violet-50/50 ring-1 ring-violet-500"
                        : "border-gray-200 hover:border-violet-200 hover:bg-gray-50"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.avatar} alt={p.name} className="w-8 h-8 rounded-full object-cover" />
                    <div className="overflow-hidden">
                      <p className="text-xs font-semibold text-gray-900 truncate">{p.name}</p>
                      <p className="text-[10px] text-gray-500 truncate">{p.email}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
          <CardFooter className="pt-2 flex justify-between items-center border-t border-gray-100">
            <span className="text-xs text-gray-500">ต้องการใช้อีกบัญชี?</span>
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-600 hover:text-violet-700"
            >
              <PlusCircle size={14} />
              <span>เข้าสู่ระบบด้วยบัญชีอื่น</span>
            </Link>
          </CardFooter>
        </Card>

        {/* Account Actions / Logout Card */}
        <Card className="border border-red-100 shadow-sm bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold text-gray-900">การจัดการบัญชี</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              เมื่อออกจากระบบ คุณจะต้องเข้าสู่ระบบใหม่อีกครั้งเพื่อเข้าถึงข้อมูลโปรไฟล์
            </CardDescription>
          </CardHeader>
          <CardFooter className="pt-2 flex justify-between items-center border-t border-gray-100">
            <span className="text-sm text-gray-500">ออกจากระบบบนอุปกรณ์นี้</span>
            <Button
              type="button"
              variant="destructive"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white"
            >
              <LogOut size={16} />
              <span>ออกจากระบบ</span>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

