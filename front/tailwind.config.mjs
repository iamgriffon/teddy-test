/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        "theme": {
          "primary": "#EC6724",
          "black": "#141414",
          "gray": "#D9D9D9"
        },
        "background": {
          "primary": "#F5F5F5"
        }
      },
    },
  },
  plugins: []
}
