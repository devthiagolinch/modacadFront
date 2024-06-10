/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./src/index.css",
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        textDecorationThickness: {
          10: '25px',
          "pad": 'p-5'
        },
        fontFamily: {
          title: ["Title", "Butler_Ultra_Light"]
        }
  
      },
    },
    plugins: [],
  }