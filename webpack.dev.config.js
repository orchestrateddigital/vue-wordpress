const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: path.resolve(__dirname, 'src/app.js'),
  mode: 'development',
  devServer: {
    hot: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    port: 2001,
    https: true,
    disableHostCheck: true,
    publicPath: '',
    host: 'localhost',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'https://localhost:2001/',
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
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      vue: "@vue/runtime-dom"
    },
    extensions: ['*', '.js', '.vue', '.json']
  }
}
