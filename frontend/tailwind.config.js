/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: { // Egendefinerte farger
        primary: "#FF914D",
        "primary-light": "#FFE4D1",
        "primary-dark": "#E6732B",
        // "ui-background": "#34495e",
        "ui-background": "#2F3A45",
        // "footer-background": "#2c3e50",

        "navbar-bg": "#f7f5f0",
        "navbar-link": "#2D3748",
        "navbar-link-hover": "#FF914D",
        "navbar-link-active": "#FF914D",
        "navbar-icon": "#2D3748",

        "warm-off-white": "#fffefc",
        "bg-color": "#F8F3ED"
      },
      fontFamily: { // Egne fonter
        heading: ["var(--font-heading)", "sans-serif"], // Poppins for overskrifter
        body: ["var(--font-body)", "sans-serif"], // Inter for brødtekst
      },

      screens: {
        custom: "789px",
      }
    },
  },
  plugins: [],
}
