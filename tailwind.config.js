/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/tw-elements-react/dist/js/**/*.js',
  ],
  theme: {
    extend: {},
    screens: {
      '2xl': { max: '1400px' },
      xl: { max: '1200px' },
      lg: { max: '992px' },
      md: { max: '768px' },
      sm: { max: '576px' },
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': { min: '1400px' },
        xl: { min: '1200px' },
        lg: { min: '992px' },
        md: { min: '768px' },
        sm: { min: '576px' },
      },
    },
  },
  plugins: [require('tw-elements-react/dist/plugin.cjs')],
};
