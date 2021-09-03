//const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '640px',
      md: '901px',
      lg: '1025px', //1025(msges)
      xl: '1301px',
      '2xl': '1441px', //1441(container)
    },
    extend: {
      theme: {
        colors: {
          // transparent: 'transparent',
          // current: 'currentColor',
          // black: colors.black,
          // white: colors.white,
          // gray: colors.coolGray,
          // red: colors.red,
          // yellow: colors.amber,
          // green: colors.emerald,
          // blue: colors.blue,
          // indigo: colors.indigo,
          // purple: colors.violet,
          // pink: colors.pink,
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
