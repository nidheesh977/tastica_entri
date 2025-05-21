/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF6832",
        secondary: "#BF3131",
        tertiary: "#FAEEE0",
      },
    },
  },
  plugins: [],
};
