const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './core/**/*.{js,ts,jsx,tsx}'],
  },
  theme: {
    extend: {
      zIndex: {
        100: 100,
        999999: 999999,
      },
      gridTemplateRows: {
        8: 'repeat(8, minmax(0, 1fr))',
        10: 'repeat(10, minmax(0, 1fr))',
        11: 'repeat(12, minmax(0, 1fr))',
      },
      fontFamily: {
        sans: ['Roboto Condensed', ...defaultTheme.fontFamily.sans],
        'din-condensed': ['din-condensed'],
      },
      fontSize: {
        '10xl': '20rem',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        screens: {
          '3xl': '2550px',
        },
      },
    },
  },
  variants: {
    backgroundOpacity: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    opacity: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    borderStyle: ['focus'],
  },
  plugins: [
    require('@tailwindcss/ui'),
    plugin(function ({ addUtilities, variants }) {
      const newUtilities = {
        '.fadeIn': {
          animation: 'fadeIn 1s forwards',
        },
        '.fadeOut': {
          animation: 'fadeOut 1s forwards',
        },
        '.moveRight': {
          animation: 'moveRight 1s forwards',
        },
        '.moveLeft': {
          animation: 'moveLeft 1s forwards',
        },
      }

      addUtilities(newUtilities, variants('customPlugin'))
    }),
  ],
}
