const { nextui } = require('@nextui-org/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        "loop-scroll": "loop-scroll 45s linear infinite",
      },
      keyframes: {
        "loop-scroll": {
          from: { transform: "translateX(0)" }, // Fixed `transfrom` typo
          to: { transform: "translateX(-50%)" },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    require('daisyui'), // Removed extra comma
    nextui(), // Correct placement
  ],
};


