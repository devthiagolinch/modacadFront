/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/index.css', './index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    boxShadow: {
      read: '0 0px 50px 1px rgba(32,32,32,0.3)',
      whiteBlur: '-0px -86px 50px 0 rgba(241,236,232, 0.90)',
      modal: '0 0px 50px 1px rgba(32,32,32,0.2)',
    },
    extend: {
      textDecorationThickness: {
        10: '25px',
        pad: 'p-5',
      },
      fontFamily: {
        butler: ['Butler', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        autography: ['Autography', 'sans-serif'],
      },
      colors: {
        primary: '#DBDF1D',
        paper: '#F3ECE8',
        bgBtn: '#128D8F',
      },
    },
  },
  plugins: [require('tailwindcss-inner-border'), require('@tailwindcss/typography')],
};
