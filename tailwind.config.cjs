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
  // plugins: [require("@tailwindcss/typography"),require("daisyui")],
  daisyui: {
    styled: true,
    themes: ["corporate", "dark"],
    base: true,
    utils: false,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
}