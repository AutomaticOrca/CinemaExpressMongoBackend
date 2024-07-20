/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ritzHeaderPink: "#d75557",
        ritzLogoPink: "#f8a5a7",
        ritzLightPink: "#f6a6a6",
        ritzBgBlue: "#1b2336",
        ritzLightBlue: "#272e40",
        creamy: "#fffbf0",
        paradisoOrange: "#e5543c",
        warmGold: "#B76E79",
        midnightBlue: "#2C3E50",
        golenAgeBlack: "#252021",
      },
      fontFamily: {
        playwrite: ["Playwrite HR", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        italiana: ["Italiana", "sans-serif"],
      },
      width: {
        "thin-line": "0.01rem",
      },
    },
  },
  plugins: [],
};
