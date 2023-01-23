/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          '0%': {
            opacity: 0,
            transform: 'translateY(-1000px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)'
          }
        }
      },
      animation: {
        slideIn: 'slideIn 500ms cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards'
      }
    },
  },
  plugins: [],
};