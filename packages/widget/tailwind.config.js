const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        wPrimary: colors.indigo,
        wSecondary: colors.pink,
        wGray: colors.gray,
        wWhite: colors.white,
        wBlack: colors.black,
        wGreen: colors.green,
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
