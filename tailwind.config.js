/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f9fafb", // lightest gray
          100: "#f3f4f6", // very light gray
          200: "#e5e7eb", // light gray
          300: "#d1d5db", // gray
          400: "#9ca3af", // medium gray
          500: "#6b7280", // darker gray
          600: "#4b5563", // dark gray
          700: "#374151", // very dark gray
          800: "#1f2937", // darker black
          900: "#111827", // almost black
          950: "#0f172a", // black
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
