/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./src/index.css",
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      boxShadow:{
        read:  "0 0px 50px 1px rgba(32,32,32,0.3)",
        whiteBlur: "-0px -86px 50px 0 rgba(241,236,232, 0.90)",
        modal: "0 0px 50px 1px rgba(32,32,32,0.2)"
      },
      fontFamily: {
        butler_ultra_light: ['butler-ultra-light', "sans-serif"],
        butler_bold: ['butler-bold', 'sans-serif'],
        butler_extra_bold: ['butler-extra-bold', 'sans-serif'],
        butler_regular: ['butler_regular', 'sans-serif'],
        autography: ['autography', 'sans-serif'],
        montserrat_light_italic: ['montserrat-light-italic', 'sans-serif'],
        montserratMedium: ['montserrat-medium', 'sans-serif'],
        montserrat_medium_italic: ['montserrat-medium-italic', 'sans-serif'],
        montserratRegular: ['montserrat-regular', 'sans-serif'],
        montserratLight: ['montserrat-light', 'sans-serif']
      },
      extend: {
        textDecorationThickness: {
          10: '25px',
          "pad": 'p-5'
        },
        fontFamily: {
          butler_ultra_light: ['butler-ultra-light', "sans-serif"],
          butler_bold: ['butler-bold', 'sans-serif'],
          butler_extra_bold: ['butler-extra-bold', 'sans-serif'],
          butler_regular: ['butler-regular', 'sans-serif'],
          autography: ['autography', 'sans-serif'],
          montserrat_light_italic: ['montserrat-light-italic', 'sans-serif'],
          montserratMedium: ['montserrat-medium', 'sans-serif'],
          montserrat_medium_italic: ['montserrat-medium-italic', 'sans-serif'],
          montserratRegular: ['montserrat-regular', 'sans-serif'],
          montserrat_light: ['montserrat-light', 'sans-serif']
        }
      },
    },
    plugins: [
      require("tailwindcss-inner-border"),
      require('@tailwindcss/typography')
    ],
  }