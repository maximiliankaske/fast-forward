const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const { spacing, fontFamily } = defaultTheme;

// TODO:FIXME: don't forget to extend the colors in packages/ui!

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    // FIXME: create own tailwind config
    "../../packages/widget/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
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
      fontFamily: {
        sans: ["Montserrat", ...fontFamily.sans],
      },
      keyframes: {
        "move-bg": {
          from: {
            backgroundPosition: "0% 0",
          },
          to: {
            backgroundPosition: "400% 0",
          },
        },
        "hero-bg-1": {
          "0%, 16.667%, to": {
            opacity: 1,
          },
          "33%, 83.333%": {
            opacity: 0,
          },
        },
        "hero-bg-2": {
          "0%, 16.667%, 66.667%, to": {
            opacity: 0,
          },
          "33.333%, 50%": {
            opacity: 1,
          },
        },
        "hero-bg-3": {
          "0%, 50%, to": {
            opacity: 0,
          },
          "66.667%, 83.333%": {
            opacity: 1,
          },
        },
      },
      animation: {
        "move-bg": "move-bg 8s infinite linear",
        "hero-bg-1": "hero-bg-1 8s infinite",
        "hero-bg-2": "hero-bg-2 8s infinite",
        "hero-bg-3": "hero-bg-3 8s infinite",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.700"),
            a: {
              color: theme("colors.indigo.500"),
              "&:hover": {
                color: theme("colors.indigo.700"),
              },
              code: { color: theme("colors.indigo.400") },
            },
            "h1,h2,h3,h4": {
              "scroll-margin-top": spacing[32],
            },
            code: { color: theme("colors.pink.500") },
            "blockquote p:first-of-type::before": false,
            "blockquote p:last-of-type::after": false,
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.300"),
            a: {
              color: theme("colors.indigo.400"),
              "&:hover": {
                color: theme("colors.indigo.600"),
              },
              code: { color: theme("colors.indigo.400") },
            },
            blockquote: {
              borderLeftColor: theme("colors.gray.700"),
              color: theme("colors.gray.300"),
            },
            "h1,h2,h3,h4": {
              color: theme("colors.gray.100"),
              "scroll-margin-top": spacing[32],
            },
            hr: { borderColor: theme("colors.gray.700") },
            ol: {
              li: {
                "&:before": { color: theme("colors.gray.500") },
              },
            },
            ul: {
              li: {
                "&:before": { backgroundColor: theme("colors.gray.500") },
              },
            },
            strong: { color: theme("colors.gray.300") },
            thead: {
              color: theme("colors.gray.100"),
            },
            tbody: {
              tr: {
                borderBottomColor: theme("colors.gray.700"),
              },
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {},
    typography: ["dark"],
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
  ],
};
