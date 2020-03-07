const WebpackAutoInject = require('webpack-auto-inject-version')

module.exports = {
  entry: './src/twill.js',
  output: {
    filename: 'twill.js',
  },
  plugins: [
    new WebpackAutoInject({
      SHORT: 'Twill.js',
      components: {
        AutoIncreaseVersion: false,
        InjectAsComment: true
      },
      componentsOptions: {
        InjectAsComment: {
          tag: 'Version: {version} {date} (c) Rostber https://github.com/rostber/twill/License.md',
          dateFormat: 'h:MM:ss TT'
        }
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
