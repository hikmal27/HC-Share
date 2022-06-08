module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  prefix: 'tw-',
  variants: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        readex: ['Readex Pro', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}