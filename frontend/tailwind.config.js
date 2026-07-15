/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2E8BFF",
        accent: "#4DA8FF",
        "aqi-green": "#39D98A",
        "aqi-yellow": "#FFD54A",
        "aqi-orange": "#FF8A4C",
        "aqi-red": "#FF4F6D",
      },
      fontFamily: {
        sans: ["Poppins", "Inter", "sans-serif"],
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
