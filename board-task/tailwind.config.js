/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        hand: ['"Patrick Hand"', 'cursive'],
        sans: ['"Poppins"', 'sans-serif'],
      },
      colors: {
        sticky: {
          pink: '#f8719D',
          orange: '#f9a341',
          yellow: '#fbc94a',
          green: '#a4d65e',
          blue: '#4abcf6',
        }
      }
    },
  },
  plugins: [],
}
