/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aether: "#0f172a",
        daemon: "#ef4444",
        gold: "#fbbf24",
      },
      fontFamily: {
        serif: ['Crimson Text', 'serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
