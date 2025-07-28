/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#001f3f',
        deepBlue: '#0F172A',
        midnight: '#1E293B',
        accentBlue: '#3B82F6',
        accentGold: '#FBBF24',
      },
    },
  },
  plugins: [],
}
