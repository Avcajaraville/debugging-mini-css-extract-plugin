import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import { VueSSRClientPlugin } from 'vue-ssr-webpack-plugin';
import baseConfig from './webpack.babel.js';

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
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
      'process.env.VUE_ENV': '"client"'
    }),
    new VueSSRClientPlugin()
  ]
});
