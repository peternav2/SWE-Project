/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'menu-pattern1': "url('/src/assets/menu.jpg')",
      }
    },
  },
  plugins: [],
}