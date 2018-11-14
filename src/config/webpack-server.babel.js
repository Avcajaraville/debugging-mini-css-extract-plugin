import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import VueSSRPlugin from 'vue-ssr-webpack-plugin';
import { dependencies } from '../../package.json';
import baseConfig from './webpack.babel.js';

export default merge(baseConfig, {
  target: 'node',
  entry: path.resolve(__dirname, '..', 'entry-server.js'),
  output: {
    filename: 'server.bundle.js',
    // Outputs node-compatible modules instead of browser-compatible.
    libraryTarget: 'commonjs2'
  },
  performance: {
    hints: false
  },
  // Avoids bundling external dependencies, so node can load them directly from node_modules/
  externals: Object.keys(dependencies),
  // No need to put these behind a production env variable.
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: ['css-loader/locals']
      }
    ]
  }
});
