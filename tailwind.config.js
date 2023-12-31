/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      'sm-mobile': '200px',
      'mobile': '640px',
      'tablet': '768px',
      'laptop': '1200px',
      'desktop': '1440px',
    },
    colors: {
      'white': '#FFFFFF',
      'purple': {
        100: '#A8A4FF',
        200: '#635FC7',
        300: '#4E2A84',
        400: '#635FC740'
      },
      'black': {
        100: '#3E3F4E',
        200: '#2B2C37',
        300: '#20212C',
        400: '#000112',
        500: '#000000'
      },
      'gray': {
        100: '#828FA340',
        200: '#828FA3'
      },
      'silver': {
        100: '#F4F7FD',
        200: '#E4EBFA',
        300: '#635FC71A',
        400: '#E9EFFA80'
      },
      'red': {
        100: '#FF9898',
        200: '#EA5555'
      },
      'teal': '#49C4E5',
      'green': '#67E2AE'
    },
    fontFamily: {
      'jakarta': ['Plus Jakarta Sans', 'sans-serif']
    },
    borderRadius: {
      'none': '0',
      'sm': '.125rem',
      DEFAULT: '.25rem',
      'lg': '.5rem',
      'full': '9999px',
    },
    fontSize: {
      s: '13px',
      m: '15px',
      l: '18px',
      xl: '24px',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    letterSpacing: {
      tight: '-.025em',
      normal: '0',
      wide: '2.4px',
    },
    extend: {
      lineHeight: {
        'extra-loose': '2.5',
        '12': '3rem',
      }
    }
  },
  plugins: [],
}

