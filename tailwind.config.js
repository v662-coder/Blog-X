/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["IBM Plex Sans", "Inter", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      colors: {
        ink: {
          950: "#0B0C11",
          900: "#12141C",
          800: "#1A1D28",
          700: "#252938",
          600: "#343A4D",
        },
        paper: {
          50: "#FBFAF7",
          100: "#F7F6F2",
          200: "#EEEBE3",
        },
        wire: "#E8A33D",
        desk: {
          sports: "#2F8F5B",
          health: "#E0556F",
          technology: "#3E7CB1",
          politics: "#8B5FBF",
          entertainment: "#D9822B",
          finance: "#1FA0A0",
        },
      },
      boxShadow: {
        card: "0 1px 2px rgba(18,20,28,0.06), 0 8px 24px -12px rgba(18,20,28,0.18)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out both",
        "slide-up": "slideUp 0.4s ease-out both",
        "pop-in": "popIn 0.25s cubic-bezier(0.34,1.56,0.64,1) both",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(16px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        popIn: {
          "0%": { transform: "scale(0.92)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};