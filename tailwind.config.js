/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent1: "#7F83AC", // primary
        accent2: "#404463",
        accent3: "#202231",
        accent4: "#B9723C",
        accent5: "#D4A27B",
        dark: "#191716",
        darker: "#0f0e0d",
        primary: "#7F83AC", // for hover etc.
      },
      fontFamily: {
        custom: ["PANICKO", "sans-serif"],
      },
      keyframes: {
        "slide-down": {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "slide-down": "slide-down 0.3s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};