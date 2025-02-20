import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Exo 2'", "sant-serif"],
      },
      screens: {
        'xs': '640px',
        'desktop': '1024px',
      },
    },
  },
  plugins: [forms],
};