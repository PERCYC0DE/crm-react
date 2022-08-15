/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        colorPrimary: "#153B39",
        colorSecondary: "#262633",
        colorAlternative: "#4EC2E0",
      },
      fontFamily: {
        openSans: "Roboto",
      },
    },
  },
  plugins: [],
};
