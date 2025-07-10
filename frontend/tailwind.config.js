/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx}",
    ],
    theme: {
      extend: {
        colors: { // Egendefinerte farger
          primary: "#047464",
          "primary-light": "#d1fae5",
          "primary-dark": "#065f54",
          "ui-background": "#34495e",
          // "footer-background": "#2c3e50",
        },
      },
    },
    plugins: [],
  }
  