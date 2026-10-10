import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        canvas: {
          light: "#F8F6F0",
          card: "#FFFFFF",
          muted: "#F0ECE1",
          dark: "#141210",
        },
        brand: {
          50: "#FFF5F2",
          100: "#FFE6E0",
          200: "#FCC7B9",
          300: "#F7A28C",
          400: "#EE7559",
          500: "#C84B31", // Primary Terracotta
          600: "#A83822",
          700: "#862B1A",
          800: "#692317",
          900: "#4F1D15",
          accent: "#D97706", // Warm Amber Accent
        },
        warm: {
          50: "#FAF9F5",
          100: "#F5F3EB",
          200: "#E6E2D3",
          300: "#D4CEB8",
          400: "#A39C84",
          500: "#78725D",
          600: "#57534E",
          700: "#3D3A36",
          800: "#24221F",
          900: "#1C1917",
        },
        status: {
          new: "#2563EB",
          review: "#8B5CF6",
          call: "#D97706",
          proposal: "#0284C7",
          progress: "#D97706",
          delivered: "#16A34A",
          lost: "#DC2626",
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        tactile: "0 2px 0 0 rgba(28, 25, 23, 0.08), 0 4px 12px -2px rgba(28, 25, 23, 0.05)",
        card: "0 10px 30px -5px rgba(28, 25, 23, 0.05), 0 2px 6px -1px rgba(28, 25, 23, 0.03)",
        lifted: "0 20px 40px -10px rgba(200, 75, 49, 0.12), 0 8px 16px -4px rgba(28, 25, 23, 0.06)",
      },
      keyframes: {
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.85)" },
        },
      },
      animation: {
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
