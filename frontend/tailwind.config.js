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
        urbanist: ["Urbanist", "sans-serif"],
      },
      width: {
        "thin-line": "0.01rem",
      },
      borderWidth: {
        0.01: "0.01rem",
        0.05: "0.05rem",
      },
      keyframes: {
        "quick-blur": {
          "0%, 100%": { filter: "blur(0)" },
          "50%": { filter: "blur(2px)" },
        },
      },
      animation: {
        "quick-blur": "quick-blur 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
