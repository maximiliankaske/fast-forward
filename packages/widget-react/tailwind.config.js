const colors = require("tailwindcss/colors");

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

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
      textColor: {
        theme: {
          base: withOpacity("--color-text-base"),
          muted: withOpacity("--color-text-muted"),
          inverted: withOpacity("--color-text-inverted"),
          primary: withOpacity("--color-text-primary"),
          danger: withOpacity("--color-text-danger"),
        },
      },
      backgroundColor: {
        theme: {
          fill: withOpacity("--color-fill"),
          primary: withOpacity("--color-primary"),
          inverted: withOpacity("--color-inverted"),
          danger: withOpacity("--color-danger"),
          button: withOpacity("--color-button"),
          "button-hover": withOpacity("--color-button-hover"),
          "button-accent": withOpacity("--color-button-accent"),
        },
      },
      gradientColorStops: {
        theme: {
          hue: withOpacity("--color-fill"),
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
