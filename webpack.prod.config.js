const path = require('path')
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: path.resolve(__dirname, 'src/app.js'),
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'vue-wordpress.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'vue-wordpress.css'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      vue: "@vue/runtime-dom"
    },
    extensions: ['*', '.js', '.vue', '.json']
  }
}
