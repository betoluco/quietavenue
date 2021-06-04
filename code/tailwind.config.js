module.exports = {
  purge: ['./src/components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'landing-page-header': "url('https://s3-us-west-1.amazonaws.com/quietavenue.com/images/header_image.jpeg')"
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
