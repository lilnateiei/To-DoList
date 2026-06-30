// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary — Soft Violet
        violet: {
          50:  "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed", // CTA หลัก
          700: "#6d28d9",
        },
        // Neutral — Warm Gray (ไม่เย็นเกินไป)
        neutral: {
          50:  "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          700: "#404040",
          900: "#171717",
        },
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 2px 12px 0 rgba(0,0,0,0.06)",
        card: "0 1px 4px 0 rgba(0,0,0,0.04)",
      },
    },
  },
  plugins: [],
};

export default config;