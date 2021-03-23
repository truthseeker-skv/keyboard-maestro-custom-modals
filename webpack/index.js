const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const styledComponentsTransformer = require('./styled-transformer').default;

const {
  outputDir,
  modalTemplate,
} = require('../paths').default;

const entries = require('./entries').default;

module.exports = {
  entry: entries,
  output: {
    path: outputDir,
    filename: '[name].[contenthash].js',
  },
  mode: 'development',
  devtool: 'cheap-module-source-map',
  watch: true,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              getCustomTransformers: () => ({
                before: [styledComponentsTransformer],
              }),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
    ]
  },
  plugins: [
    ...Object.keys(entries).map((name) =>
      new HtmlWebpackPlugin({
        cache: [name],
        filename: `${name}.html`,
        template: modalTemplate,
      }),
    ),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  }
};


