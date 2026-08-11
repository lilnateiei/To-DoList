import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

interface BackProps {
  href: string;
  label?: string;
}

export default function Back({ href, label = "กลับ" }: BackProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600  hover: px-3 py-1.5 rounded-lg transition-all"
    >
      <FaArrowLeft size={11} />
      {label}
    </Link>
  );
}
