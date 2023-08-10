/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    screens: {
      '2xl': { max: '1400px' },
      xl: { max: '1200px' },
      lg: { max: '992px' },
      md: { max: '768px' },
      sm: { max: '640px' },
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': { min: '1400px' },
        xl: { min: '1200px' },
        lg: { min: '992px' },
        md: { min: '768px' },
        sm: { min: '640px' },
      },
    },
  },
  plugins: [],
};
