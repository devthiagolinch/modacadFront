/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/index.css',
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}',
  ],
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
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    safelist: [
      'grid-cols-1',
      'grid-cols-2',
      'grid-cols-3',
      'grid-cols-4',
      'grid-cols-5',
      'grid-cols-6',
      'lg:grid-cols-1',
      'lg:grid-cols-2',
      'lg:grid-cols-3',
      'lg:grid-cols-4',
      'lg:grid-cols-5',
      'lg:grid-cols-6',
    ],
  },
};
