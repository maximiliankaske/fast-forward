const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        purple: {
          900: "#3200A7",
          800: "#6000B1",
          700: "#7400B8",
          600: "#8B00BF",
          500: "#9A00C5",
          400: "#AA39CE",
          300: "#B95FD7",
          200: "#CE8EE2",
          100: "#E1BBED",
          50: "#F3E4F8",
        },
        emerald: {
          900: "#009868",
          800: "#00BA83",
          700: "#00CC91",
          600: "#00E1A2",
          500: "#00F3B1",
          400: "#00F8BF",
          300: "#18FECC",
          200: "#80FFDB",
          100: "#B9FFE9",
          50: "#E3FFF6",
        },
        gray: colors.gray,
        green: colors.green,
        red: colors.red,
        amber: colors.amber,
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
