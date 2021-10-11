const Webpack = require('webpack')
const { merge } = require('webpack-merge')
const { resolve } = require('path')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const common = require('./webpack.common')
const { PROJECT_PATH, SERVER_HOST, SERVER_PORT } = require('../constant')
const mock = require('../server')

/**
 * devServer: 属性
 * stats: 要仅显示捆绑软件中的错误errors-only
 * devServer.clientLogLevel 可能会导致日志过于冗余，你可以通过将其设置为 'silent' 来关闭日志
 * noInfo: 告诉开发服务器禁止显示诸如 Webpack 捆绑包信息之类的消息。 错误和警告仍将显示
 * filename: 此选项可以减少在 lazy 模式中的编译操作。 默认情况下，
 * 在 lazy 模式中，每个请求都触发新的编译。使用 filename 仅当请求某个文件时才可执行编译
 * lazy: 开发服务器仅在收到请求时才编译捆绑软件。 这意味着webpack将不会监视任何文件更改。
 * 我们称这种方式为“懒惰模式(lazy mode)
 */

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  target: 'web',
  cache: { type: 'memory' },
  output: {
    filename: 'js/[name].js',
    path: resolve(PROJECT_PATH, './build')
  },
  devServer: {
    compress: true, // 是否启用 gzip 压缩
    host: SERVER_HOST, // 指定 host，不设置的话默认是 localhost
    port: SERVER_PORT, // 指定端口，默认是8080
    stats: 'errors-only', // 终端仅打印 error
    clientLogLevel: 'none', // 日志等级
    overlay: false,
    open: false, // 打开默认浏览器
    hot: true, // 热更新
    noInfo: false,
    // proxy: { ...require('../../src/setProxy') }, // 设置代理
    before: (app) => {
      mock(app)
    }
  },
  plugins: [new Webpack.HotModuleReplacementPlugin(), new ErrorOverlayPlugin()],
  optimization: {
    minimize: false,
    minimizer: [],
    splitChunks: {
      chunks: 'all',
      minSize: 10000
    }
  }
})
