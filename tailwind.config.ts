
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#8B5CF6",
          light: "#A78BFA",
          dark: "#7C3AED",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#6366F1",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#9333EA",
          foreground: "#FFFFFF",
        },
        success: {
          DEFAULT: "#10B981",
          foreground: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': "linear-gradient(to right, #8B5CF6, #6366F1)",
        'gradient-dark': "linear-gradient(to right bottom, #1F2937, #111827)",
        'gradient-light': "linear-gradient(to right bottom, #F3F4F6, #E5E7EB)",
      },
      keyframes: {
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "scale-up": {
          "0%": {
            transform: "scale(0.95)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        "float": {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
        "pulse-glow": {
          "0%, 100%": {
            opacity: "1",
            boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)",
          },
          "50%": {
            opacity: "0.8",
            boxShadow: "0 0 30px rgba(139, 92, 246, 0.8)",
          },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "scale-up": "scale-up 0.4s ease-out",
        "float": "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
