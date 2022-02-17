module.exports = {
  purge: [
    './src/common/*.js',
    './src/estate/*.js',
    './src/estate/graph/*.js',
    './src/estates/*.js',
    './src/freeTrial/*.js',
    './src/notFound/*.js'
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
