/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#F5385D",
        "secondary": {
          100: "#E2E2D5",
          200: "#888883",
        },
      },
    },
  },
  plugins: [],
}