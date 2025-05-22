/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF6832",
        secondary: "#F3C623",
        tertiary: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
