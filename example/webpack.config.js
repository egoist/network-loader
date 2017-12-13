const path = require('path')

module.exports = {
  entry: path.join(__dirname, 'entry.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: require.resolve('..')
      }
    ]
  }
}
