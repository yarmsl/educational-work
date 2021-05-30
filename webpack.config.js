'use strict';

let path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/js/script.js',
  output: {
    filename: 'bundle.js',
  },
  // watch: true,

  devtool: "none",

  module: {}
};