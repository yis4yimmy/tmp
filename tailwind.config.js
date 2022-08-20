/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
        display: "Bungee Shade, sans-serif",
        heading: "Source Sans Pro, sans-serif",
        body: "Source Serif Pro, serif",
      },
    },
  },
  plugins: [],
};
