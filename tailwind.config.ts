import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        matrix: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
        cyber: {
          cyan: "rgb(var(--fg) / <alpha-value>)",
          purple: "rgb(var(--text-b) / <alpha-value>)",
          amber: "rgb(var(--text-b) / <alpha-value>)",
          red: "rgb(var(--danger) / <alpha-value>)",
          dark: "rgb(var(--bg) / <alpha-value>)",
          panel: "rgb(var(--surface) / <alpha-value>)",
          border: "rgb(var(--line) / <alpha-value>)",
        },
        white: "rgb(var(--fg) / <alpha-value>)",
        black: "rgb(var(--bg) / <alpha-value>)",
        gray: {
          50: "rgb(var(--text-a) / <alpha-value>)",
          100: "rgb(var(--text-a) / <alpha-value>)",
          200: "rgb(var(--text-a) / <alpha-value>)",
          300: "rgb(var(--text-a) / <alpha-value>)",
          400: "rgb(var(--text-b) / <alpha-value>)",
          500: "rgb(var(--text-b) / <alpha-value>)",
          600: "rgb(var(--text-c) / <alpha-value>)",
          700: "rgb(var(--text-c) / <alpha-value>)",
          800: "rgb(var(--text-c) / <alpha-value>)",
          900: "rgb(var(--text-c) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "monospace"],
        display: ["Space Grotesk", "Inter", "sans-serif"],
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
