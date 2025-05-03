/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#155E95",
        secondary: "#BF3131",
        tertiary: "#E8F9FF",
      },
    },
  },
  plugins: [],
};
