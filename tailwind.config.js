// tailwind.config.js

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "current-purple": "#5E50A1",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
