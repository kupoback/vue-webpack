"use strict"; // eslint-disable-line

const webpack = require("webpack");
const path = require("path");
const jquery = require("jquery");
const { VueLoaderPlugin } = require("vue-loader");
const ES6Promise = require("es6-promise");

const config = {
  entry: path.resolve(__dirname, "../src/main.js"),
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        use: [
          "vue-style-loader",
          {
            loader: "css-loader",
            options: { importLoaders: 1 }
          },
          "postcss-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      vue$: "vue/dist/vue.esm.js" // 'vue/dist/vue.common.js' for webpack 1
    }
  },
  resolveLoader: {
    moduleExtensions: ["-loader"]
  },
  externals: {
    $: "jQuery"
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jquery: "jquery",
      "window.jQuery": "jquery"
    }),
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      Promise: "es6-promise/auto" // works as expected
    })
  ]
};

module.exports = config;
