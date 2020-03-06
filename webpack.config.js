const WebpackAutoInject = require('webpack-auto-inject-version')

module.exports = {
  entry: './src/twill.js',
  output: {
    filename: 'twill.js',
  },
  devtool: 'source-map',
  plugins: [
    new WebpackAutoInject({
      SHORT: 'Twill.js (c) Rostber',
      components: {
        AutoIncreaseVersion: false,
        InjectAsComment: true
      }
    })
  ],
  module: {
    rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  },
  optimization: {
    minimize: true,
    sideEffects: false
  }
}
