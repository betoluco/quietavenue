const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './src/*.js',
    './src/*/*.js',
    './src/*/*/*.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
