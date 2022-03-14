module.exports = {
  purge: [
    './src/*.{js, jsx}',
    './src/**/*{js, jsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      padding: {
        "56.2": "56.25% 0 0 0",
        "42.1": "42.1875% 0 0 0",
        "28.1": "28.125% 0 0 0",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
