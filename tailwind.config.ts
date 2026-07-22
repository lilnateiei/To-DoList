// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Clerk Primary — Brand Purple
        purple: {
          500: "#6c47ff", // Primary accent
        },
        // Clerk Ink & Canvas
        ink: "#000000",
        canvas: "#ffffff",
        // Clerk Hairline & Surfaces
        hairline: "#d9d9de",
        surface: {
          1: "#e3e3e7",
          2: "#eeeef0",
          3: "#d9d9de",
        },
        // Clerk Neutral Grays
        neutral: {
          50: "#ffffff",
          100: "#e3e3e7",
          200: "#d9d9de",
          300: "#b7b8c2",
          400: "#9394a1",
          500: "#747686",
          600: "#5e5f6e",
          700: "#42434d",
          800: "#2f3037",
        },
        // Clerk Brand Colors
        brand: {
          yellow: "#fff963",
          sky: "#38dafd",
          skyLight: "#5de3ff",
        },
        // Status Colors
        error: "#ef4444",
        warning: "#ea520c",
        success: "#22c543",
        link: "#6c47ff",
      },
      borderRadius: {
        none: "0px",
        sm: "4px",
        md: "6px",
        lg: "8px",
        xl: "12px",
        full: "9999px",
      },
      spacing: {
        xxs: "4px",
        xs: "8px",
        sm: "12px",
        md: "16px",
        base: "20px",
        lg: "24px",
        xl: "32px",
      },
      fontFamily: {
        sans: ['geistNumbers', 'suisse', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['soehneMono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'display-xl': ['32px', { lineHeight: '40px', fontWeight: '600', letterSpacing: '-0.48px' }],
        'heading-lg': ['13px', { lineHeight: '72px', fontWeight: '700', letterSpacing: '-1.6px' }],
        'body-md': ['13px', { lineHeight: '20px', fontWeight: '400' }],
        'body-sm': ['11px', { lineHeight: '18px', fontWeight: '400' }],
        'caption-sm': ['10px', { lineHeight: '16px', fontWeight: '400' }],
        'code-sm': ['12px', { lineHeight: '24px', fontWeight: '600' }],
        'button-lg': ['15px', { lineHeight: '24px', fontWeight: '400' }],
        'label-sm': ['12px', { lineHeight: '18px', fontWeight: '500' }],
        overline: ['11px', { lineHeight: '18px', fontWeight: '400' }],
        small: ['10px', { lineHeight: '16px', fontWeight: '400' }],
        tiny: ['13px', { lineHeight: '19.89px', fontWeight: '500' }],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.1)',
        modal: '0 4px 12px rgba(0,0,0,0.2)',
      },
    },
  },
  plugins: [],
};

export default config;