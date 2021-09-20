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
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.7, 0, 0.84, 0)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-quint': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'out-quint': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'in-out-quint': 'cubic-bezier(0.83, 0, 0.17, 1)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
