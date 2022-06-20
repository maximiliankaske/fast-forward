module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        theme: {
          base: "rgb(var(--color-text-base) / <alpha-value>)",
          muted: "rgb(var(--color-text-muted) / <alpha-value>)",
          inverted: "rgb(var(--color-text-inverted) / <alpha-value>)",
          primary: "rgb(var(--color-primary) / <alpha-value>)",
          danger: "rgb(var(--color-text-danger) / <alpha-value>)",
        },
      },
      backgroundColor: {
        theme: {
          fill: "rgb(var(--color-fill) / <alpha-value>)",
          primary: "rgb(var(--color-primary) / <alpha-value>)",
          inverted: "rgb(var(--color-inverted) / <alpha-value>)",
          danger: "rgb(var(--color-danger) / <alpha-value>)",
          button: "rgb(var(--color-button) / <alpha-value>)",
          "button-hover": "rgb(var(--color-button-hover) / <alpha-value>)",
          "button-accent": "rgb(var(--color-button-accent) / <alpha-value>)",
        },
      },
      ringColor: {
        theme: {
          primary: "rgb(var(--color-primary) / <alpha-value>)",
        },
      },
      borderColor: {
        theme: {
          light: "rgb(var(--color-fill-light) / <alpha-value>)",
        },
      },
      gradientColorStops: {
        theme: {
          hue: "rgb(var(--color-fill) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
