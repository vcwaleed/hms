/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      width: {
        '32rem': '32rem',
        '48rem': '48rem',
      },
      height: {
        '32rem': '32rem',
      },
    },
  },
  plugins: [],
}

