/*
 * This the production webpack build
 * all css and js will be minified and uglified etc
 * js, css, favicons will be injected into the build index.html
*/

const path = require('path');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const buildPath = path.resolve(__dirname, 'dist');

module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    filename: '[name].[hash:20].js',
    path: buildPath,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node-modules/,
        loader: 'babel-loader',
      }, // end babel-loader
      {
        test: /\.(scss|css|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'expanded',
                sourceMap: true,
                sourceMapContents: true,
              },
            },
          ],
        }),
      }, // end css loaders
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash:20].[ext]',
              limit: 8192,
            },
          },
        ], // end of url-loader
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: 'body',
    }),
    new CleanWebpackPlugin(buildPath),
    new FaviconsWebpackPlugin({
      // source logo
      logo: './src/assets/icon.png', // change this pending filename
      // prefix all icon filenames
      prefix: 'icons-[hash]/',
      // keep track of icon changes but dont rebuild unless u need to.
      persistentCache: true,
      // inject the html into the webpack html plugin
      inject: true,
      // favison bg color
      background: '#fff',
      // favicon app title
      title: 'basic dev build', // change this per project
      // all the icons that should be generated see https://github.com/haydenbleasel/favicons#usage
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: true,
        favicons: true,
        firefox: true,
        opengraph: true,
        twitter: true,
        yandex: false,
        windows: false,
      },
    }), // end favicons
    new UglifyJSPlugin({
      uglifyOptions: {
        output: {
          comments: false,
        },
        sourceMap: true,
      },
    }), // end of ugly js
    new ExtractTextPlugin({
      filename: 'styles.[contenthash].css',
      allChunks: true,
    }), // end of text plugin
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        map: {
          inline: false,
        },
        discardComments: {
          removeAll: true,
        },
      },
      canPrint: true,
    }),
  ],
};
