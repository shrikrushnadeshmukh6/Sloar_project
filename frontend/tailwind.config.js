/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        night: {
          DEFAULT: "#0A0F1E",
          soft: "#101A30",
          card: "#141F38",
          line: "#22304F",
        },
        gold: {
          DEFAULT: "#FFB238",
          soft: "#FFD180",
        },
        ember: {
          DEFAULT: "#FF6B35",
        },
        growth: {
          DEFAULT: "#34D399",
        },
        paper: "#F5F3EE",
        muted: "#8B93A7",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Manrope'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      backgroundImage: {
        "grid-panel":
          "linear-gradient(rgba(255,178,56,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,178,56,0.07) 1px, transparent 1px)",
      },
      boxShadow: {
        glow: "0 0 60px rgba(255,178,56,0.15)",
      },
    },
  },
  plugins: [],
};
