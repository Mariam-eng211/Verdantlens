/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        eco: {
          dark: '#0B1712',
          card: '#132820',
          border: '#1E3E32',
          accent: '#10B981',
          lime: '#84CC16',
          gold: '#F59E0B'
        }
      }
    },
  },
  plugins: [],
}