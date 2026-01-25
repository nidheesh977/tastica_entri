/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF6832",
        secondary: "#F3C623",
        tertiary: "#FFFFFF",
        dark: "#FF671D",
        medium: "#FF8232",
        light: "#FEA050",
      },
    },
  },
  plugins: [require("daisyui")],
};
