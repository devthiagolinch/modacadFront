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
          butler_ultra_light: ['butler_ultra_light', "sans-serif"],
          butler_bold: ['butler_bold', 'sans-serif'],
          butler_extra_bold: ['butler_extra_bold', 'sans-serif'],
          butler_regular: ['butler_regular', 'sans-serif'],
          autography: ['autography', 'sans-serif'],
          montserrat_light_italic: ['montserrat_light_italic', 'sans-serif'],
          montserrat_medium: ['montserrat_medium', 'sans-serif'],
          montserrat_medium_italic: ['montserrat_medium_italic', 'sans-serif'],
          montserrat_regular: ['montserrat_regular', 'sans-serif']
        }
  
      },
    },
    plugins: [],
  }