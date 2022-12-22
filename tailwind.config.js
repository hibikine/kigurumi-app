/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        '2xs': [
          '.625rem',
          {
            lineHeight: '1rem',
            letterSpacing: '-0.01em',
          },
        ],
      },
    },
  },
  plugins: [],
};
