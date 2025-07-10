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
        fontFamily: { // Egne fonter
          heading: ["var(--font-heading)", "sans-serif"], // Poppins for overskrifter
          body: ["var(--font-body)", "sans-serif"], // Inter for brødtekst
        },
      },
    },
    plugins: [],
  }
  