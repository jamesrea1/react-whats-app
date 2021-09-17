//const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '650px',
      md: '901px',
      lg: '1025px',
      xl: '1301px',
      '2xl': '1441px',
    },
    extend: {
      backgroundImage: {
        'chat-tile': "url('assets/chat-tile.png')",
      },
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
