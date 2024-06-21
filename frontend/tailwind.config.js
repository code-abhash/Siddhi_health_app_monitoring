import { redirect } from 'react-router-dom';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#ee0181',
        'mycolor': '#01ee91',
        'trh':'rgba(232,232,232,0.638)', 
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      }
  
  },
  plugins: [
    require('@tailwindcss/forms'), 
  ],
}}