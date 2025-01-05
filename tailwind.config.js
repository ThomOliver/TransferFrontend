 /** @type {import('tailwindcss').Config} */
 module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          backgroundPrimary: "#020617",
          backgroundPrimaryRgba: "rgba(255,255,240,0.2)",
          buttonColor: "#5eead4",
          hoverButtonColor: "#2dd4bf",
          textColor: "#bfdbfe",
        },
      },
    },
    plugins: [],
  }  