/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        parchment: '#FBF3E7',
        parchmentDark: '#F3E6D2',
        tomato: '#B23A2E',
        tomatoDark: '#8C2C22',
        basil: '#4C6444',
        basilDark: '#38492F',
        azzurro: '#2C6E8E',
        limoncello: '#E8A33D',
        ink: '#2B2320',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['"Nunito Sans"', 'sans-serif'],
        script: ['Caveat', 'cursive'],
      },
    },
  },
  plugins: [],
};
