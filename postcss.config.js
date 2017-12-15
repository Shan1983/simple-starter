module.exports = {
  plugins: [
    /*
        * Adds vendor prefixes to css attributes
        * https://github.com/postcss/autoprefixer
        */
    require('autoprefixer')({
      browsers: 'last 2 versions',
    }),
  ],
};
