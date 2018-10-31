import path from 'path';
import webpack from 'webpack';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import { env } from './server';

export default {
  devtool: env.isProd ? false : 'source-map',
  output: {
    path: path.resolve(__dirname, '..', '..', 'dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  mode: env.isProd ? 'production' : 'development',
  optimization: env.isProd
    ? {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: false
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    }
    : {},
  module: {
    // avoid webpack shimming process
    noParse: /es6-promise\.js$/,
    rules: [
      {
        test: /\.(css|scss)$/,
        oneOf: env.isProd
          ? [
            {
              test: path.join(__dirname, '..', 'App.vue'),
              use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
              use: ['vue-style-loader', 'css-loader', 'sass-loader']
            }
          ]
          : [
            {
              use: [
                'vue-style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: true,
                    importLoaders: 3
                  }
                },
                {
                  loader: 'sass-loader',
                  options: { sourceMap: true }
                }
              ]
            }
          ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  performance: {
    hints: env.isProd ? 'warning' : false
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
    ...env.isProd
      ? [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new MiniCssExtractPlugin({
          filename: 'common.[chunkhash].css'
        })
      ]
      : [new FriendlyErrorsPlugin()]
  ]
};
