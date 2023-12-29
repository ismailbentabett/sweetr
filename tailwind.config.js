/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

const generateSizeClass = (upToSize, startAt = 80) => {
  const classes = {}
  for (let i = startAt; i < upToSize / 4; i += 4) {
    classes[i] = `${(i * 4) / 16}rem`
  }

  return classes
}

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xxs: '300px',
      xs: '475px',
      ...defaultTheme.screens,
    },
    extend: {
      width: generateSizeClass(1024),
      minHeight: generateSizeClass(1024, 0),
      maxHeight: generateSizeClass(1024, 0),
      maxWidth: generateSizeClass(1024, 0),
      minWidth: generateSizeClass(1024, 0),
      borderWidth: {
        1: '1px',
      },
      fontFamily: {
        sans: ['Figtree', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        froly: {
          DEFAULT: '#F26A8D',
          50: '#FAC8D5',
          100: '#F9B5C6',
          200: '#F590AA',
          300: '#F26A8D',
          400: '#ED3666',
          500: '#D91346',
          600: '#A50E35',
          700: '#720A25',
          800: '#3E0514',
          900: '#0A0103',
          950: '#000000',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
