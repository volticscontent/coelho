const { defineConfig } = require('@vue/cli-service')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
require('dotenv').config()

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        filename: 'index.html',
        inject: true
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: 5,
        minSize: 20000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const context = module.context || '';
              const match = context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
              if (!match) return 'npm.vendors';
              const packageName = match[1];
              return `npm.${packageName.replace('@', '')}`;
            },
            chunks: 'all'
          }
        }
      }
    }
  }
})
