/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mainCol: '#9FE2BF',
        blured: 'rgba(0,0,0,0.2)',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
