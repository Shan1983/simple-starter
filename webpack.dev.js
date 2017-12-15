/*
 * This is only a basic dev setup
 * for simple small html projects,
 * so it does not uglify or minify
 * any files use npm build to use
 * those features.
*/

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-cheap-module-source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public/js', 'dist/js'),
    filename: '[name].bundle.js',
  },
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, 'public'),
  },
  // load in our loaders and stuffs
  module: {
    // sigh the fun starts here..
    rules: [
      {
        test: /\.js$/,
        exclude: /node-modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env'],
        },
      }, // end js loader
      {
        test: /\.(scss|sass|css)$/,
        use: [
          {
            // creates styles from js strings
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          }, // end style loader
          {
            // translates css into CommonJS
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          }, // end css loader
          {
            // compile sass
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true,
              sourceMapContents: true,
            },
          }, // end sass loader

          /*
           * No post css in basic dev
           *
          */
        ],
      }, // end of css loaders
      {
        // load all images in base64 if theyre smaller than 8192 bytes
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // in dev we want to see the path of the file
              name: '[path][name].[ext]?hash=[hash:20]',
              limit: 8192,
            },
          },
        ],
      }, // end of url loader
    ], // end of rules
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: true,
    }),
  ],
};
