import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        matrix: {
          50: "#e6fff0",
          100: "#b3ffd6",
          200: "#80ffbc",
          300: "#4dffa3",
          400: "#1aff89",
          500: "#00e673",
          600: "#00b359",
          700: "#008040",
          800: "#004d26",
          900: "#001a0d",
        },
        cyber: {
          cyan: "#00f0ff",
          purple: "#bf00ff",
          amber: "#ffb000",
          red: "#ff0040",
          dark: "#0a0e17",
          panel: "#111827",
          border: "#1e293b",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "Consolas", "monospace"],
        display: ["Orbitron", "sans-serif"],
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "scan-line": "scan-line 8s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 20px rgba(0, 240, 255, 0.3)" },
          "50%": { opacity: "0.8", boxShadow: "0 0 40px rgba(0, 240, 255, 0.6)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "50px 50px",
      },
    },
  },
  plugins: [],
};

export default config;
