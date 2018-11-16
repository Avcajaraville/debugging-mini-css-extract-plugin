import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import { VueSSRClientPlugin } from 'vue-ssr-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import baseConfig from './webpack.babel.js';
import { env } from './server';

export default merge(baseConfig, {
  entry: path.resolve(__dirname, '..', 'entry-client.js'),
  // extract vendor chunks for better caching
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
      'process.env.VUE_ENV': '"client"'
    }),
    ...env.isProd
      ? [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new MiniCssExtractPlugin({
          filename: '[name].[chunkhash].css',
          chunkFilename: '[id].[chunkhash].css'
        })
      ]
      : [new FriendlyErrorsPlugin()],
    new VueSSRClientPlugin()
  ]
});
