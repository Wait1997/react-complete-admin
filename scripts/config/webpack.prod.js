const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { resolve } = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const { PROJECT_PATH, ANALYZER_HOST, ANALYZER_PORT, shouldOpenAnalyzer } = require('../constant')

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  target: 'browserslist',
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  },
  output: {
    filename: 'js/[name].[contenthash:8].js',
    path: resolve(PROJECT_PATH, './build'),
    assetModuleFilename: 'images/[name].[contenthash:8].[ext]',
    clean: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].chunk.css'
    }),
    shouldOpenAnalyzer &&
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerHost: ANALYZER_HOST,
        analyzerPort: ANALYZER_PORT
      })
  ].filter(Boolean),
  optimization: {
    minimize: true,
    sideEffects: true,
    usedExports: true,
    minimizer: [
      /**
       * webpack v5 内置 terser-webpack-plugin 不需要安装
       * extractComments: true 是否将注释剥离到单独的文件中 .txt 文件中
       */
      new TerserPlugin({
        parallel: true, // 多进程打包
        extractComments: false,
        terserOptions: {
          compress: { pure_funcs: ['console.log'] }
        }
      }),
      new CssMinimizerPlugin()
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 10000
    }
  }
})
