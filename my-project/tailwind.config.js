/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#de2c4d",
        secondary : "#fb923c",
        third : "#b388ff",
      },
      fontFamily: {
        poppins:["Poppins","sans-serif"],
        averia: ["Averia Libre","cursive"],
      },
      container:{
        center: true,
        padding:{default:"1rem",
          sm:"2rem",
          lg:"4rem",
          xl: "5rem",
          "2xl": "6rem",

        }
      }
    },
  },
  plugins: [],
}

