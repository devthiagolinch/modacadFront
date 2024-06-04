/** @type {import('tailwindcss').Config} */
export default {
    content: [
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
          'title': ['Title']
        }
  
      },
    },
    plugins: [],
  }