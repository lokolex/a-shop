/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    screens: {
      sm: '425px',
      md: '575px',
      lg: '768px',
      xl: '1024px',
      '2xl': '1280px',
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
