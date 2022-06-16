/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      animation: {
        wave: "wave 15s infinite",
        waveReverse: "waveReverse 120s infinite"
      },
      keyframes:{
        waveReverse: {
          "0%": {
            transform: "translate(100vw, 0px)"
          },
          "33%": {
            transform: "translate(75vw, 0px)"
          },
          "66%": {
            transform: "translate(50vw, 0px)"
          },
          "100%": {
            transform: "translate(-30vw, 0px)"
          },
        },
        wave: {
          "0%": {
            transform: "translate(-100vw, 0px)"
          },
          "33%": {
            transform: "translate(50vw, 0px) ease-out"
          },
          "66%": {
            transform: "translate(75vw, 0px) ease-out"
          },
          "100%": {
            transform: "translate(180vw, 0px)"
          },
        }
      }
    },
  },
  plugins: [],
}
