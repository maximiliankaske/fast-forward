module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        black: "rgb(var(--ff-black) / <alpha-value>)",
        white: "rgb(var(--ff-white) / <alpha-value>)",
        gray: "rgb(var(--ff-gray) / <alpha-value>)",
        "gray-light": "rgb(var(--ff-gray-light) / <alpha-value>)",
        primary: "rgb(var(--ff-primary) / <alpha-value>)",
        green: "rgb(var(--ff-green) / <alpha-value>)",
      },
      backgroundColor: {
        black: "rgb(var(--ff-black) / <alpha-value>)",
        white: "rgb(var(--ff-white) / <alpha-value>)",
        gray: "rgb(var(--ff-gray) / <alpha-value>)",
        "gray-light": "rgb(var(--ff-gray-light) / <alpha-value>)",
        primary: "rgb(var(--ff-primary) / <alpha-value>)",
        green: "rgb(var(--ff-green) / <alpha-value>)",
      },
      ringColor: {
        primary: "rgb(var(--ff-primary) / <alpha-value>)",
      },
      borderColor: {
        primary: "rgb(var(--ff-primary) / <alpha-value>)",
        "gray-light": "rgb(var(--ff-gray-light) / <alpha-value>)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
