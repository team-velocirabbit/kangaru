const webpack = require('webpack');
const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
watch: true,
target: 'electron-renderer',

entry: {
  app: ['webpack/hot/dev-server', './main.jsx'],
},

output: {
  path: path.join(__dirname, './public/built'),
  filename: 'bundle.js',
  publicPath: '/built/'
},

devServer: {
  contentBase: './public',
  publicPath: '/built/'
},

module: {
  rules: [
   {
     test: /\.worker\.js$/,
     exclude: /node_modules/,
     use: {
       loader: 'worker-loader',
       options: {
         name: '[name].js',
       },
     },
   },
    {
      test: /\.(js|jsx)$/,
     exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    },
    {
     test: /\.html$/,
     use: ['html-loader']
    },
    {
     test: /\.css$/,
     use:
       process.env.NODE_ENV === 'production'
         ? [MiniCssExtractPlugin.loader, 'css-loader']
         : ['style-loader', 'css-loader'],
   },
   {
     test: /\.scss$/,
     use: [
       'style-loader', // creates style nodes from JS strings
       'css-loader', // translates CSS into CommonJS
       'sass-loader' // compiles Sass to CSS, using Node Sass by default
     ]
   },
    {
      test: /\.(?:png|jpg|svg)$/,
      loader: 'url-loader',
    }
  ],
},
plugins: [
 new MonacoWebpackPlugin(),
 new HtmlWebpackPlugin({
   template: './index.html',
   filename: './index.html'
 })
]
}