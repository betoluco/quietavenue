// Configuration for jest (testing)
// All node modules need to be on ES5 becouse .babelrc can't transpile them
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
};