module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        theme: {
          base: "rgb(var(--ff-color-text) / <alpha-value>)",
          inverted: "rgb(var(--ff-color-fill) / <alpha-value>)",
          primary: "rgb(var(--color-primary) / <alpha-value>)",
        },
      },
      backgroundColor: {
        theme: {
          fill: "rgb(var(--ff-color-fill) / <alpha-value>)",
          primary: "rgb(var(--ff-color-primary) / <alpha-value>)",
          inverted: "rgb(var(--ff-color-text) / <alpha-value>)",
          button: "rgb(var(--ff-color-button) / <alpha-value>)",
        },
      },
      ringColor: {
        theme: {
          primary: "rgb(var(--ff-color-primary) / <alpha-value>)",
        },
      },
      borderColor: {
        theme: {
          base: "rgb(var(--ff-color-border) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
