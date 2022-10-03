module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        "ff-black": "rgb(var(--ff-black) / <alpha-value>)",
        "ff-white": "rgb(var(--ff-white) / <alpha-value>)",
        "ff-gray": "rgb(var(--ff-gray) / <alpha-value>)",
        "ff-gray-light": "rgb(var(--ff-gray-light) / <alpha-value>)",
        "ff-primary": "rgb(var(--ff-primary) / <alpha-value>)",
        "ff-green": "rgb(var(--ff-green) / <alpha-value>)",
        "ff-red": "rgb(var(--ff-red) / <alpha-value>)",
      },
      backgroundColor: {
        "ff-black": "rgb(var(--ff-black) / <alpha-value>)",
        "ff-white": "rgb(var(--ff-white) / <alpha-value>)",
        "ff-gray": "rgb(var(--ff-gray) / <alpha-value>)",
        "ff-gray-light": "rgb(var(--ff-gray-light) / <alpha-value>)",
        "ff-primary": "rgb(var(--ff-primary) / <alpha-value>)",
        "ff-green": "rgb(var(--ff-green) / <alpha-value>)",
        "ff-red": "rgb(var(--ff-red) / <alpha-value>)",
      },
      ringColor: {
        "ff-primary": "rgb(var(--ff-primary) / <alpha-value>)",
      },
      borderColor: {
        "ff-primary": "rgb(var(--ff-primary) / <alpha-value>)",
        "ff-gray-light": "rgb(var(--ff-gray-light) / <alpha-value>)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
