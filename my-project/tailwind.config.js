/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F43F5E",
        secondary: "#FB7185",
        third: "#BE123C",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        averia: ["Averia Libre", "cursive"],
      },
      container: {
        center: true,
        padding: {
          default: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
    },
  },
  plugins: [],
}

