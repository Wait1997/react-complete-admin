const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const WebpackBar = require('webpackbar')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { resolve } = require('path')
const { PROJECT_PATH, shouldOpenThreadLoader, imageInlineSizeLimit } = require('../constant')
const { isDev, isProd } = require('../env')

const getCssLoader = (importLoaders) =>
  [
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        // 开启css模块化
        // modules: {
        //   compileType: 'module',
        //   localIdentName: '[local]__[hash:base64:5]'
        // }, // 开启css模块化
        sourceMap: isDev, // 开启后与 devtool 设置一致, 开发环境开启，生产环境关闭
        importLoaders // 指定在 CSS loader 处理前使用的 laoder 数量
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            require('postcss-flexbugs-fixes'),
            isProd && [
              'postcss-preset-env',
              {
                autoprefixer: {
                  /**
                   * grid:
                   * false （默认）：阻止自动前缀生成器输出CSS Grid转换
                   * "autoplace"：启用Autoprefixer网格转换并包括自动放置支持
                   * "no-autoplace"：启用Autoprefixer网格转换，但不支持自动放置
                   */
                  grid: 'autoplace',
                  flexbox: 'no-2009' // flexbox: "no-2009"只会为规范的最终版本和IE版本添加前缀 false将禁用flexbox属性前缀。
                },
                stage: 3
              }
            ]
          ]
        }
      }
    }
  ].filter(Boolean)

const getJsLoader = () =>
  shouldOpenThreadLoader
    ? [
        isDev ? '' : 'thread-loader',
        {
          loader: 'babel-loader',
          options: { cacheDirectory: true }
        }
      ].filter(Boolean)
    : [
        {
          loader: 'babel-loader',
          options: { cacheDirectory: true }
        }
      ]

module.exports = {
  entry: {
    app: resolve(PROJECT_PATH, './src/index')
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      Src: resolve(PROJECT_PATH, './src'),
      Pages: resolve(PROJECT_PATH, './src/pages'),
      Router: resolve(PROJECT_PATH, './src/router'),
      Components: resolve(PROJECT_PATH, './src/components'),
      Assets: resolve(PROJECT_PATH, './src/assets'),
      Utils: resolve(PROJECT_PATH, './src/utils'),
      Config: resolve(PROJECT_PATH, './src/config'),
      Api: resolve(PROJECT_PATH, './src/api')
    }
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        use: [...getJsLoader()],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: getCssLoader(1)
      },
      {
        test: /\.less$/,
        use: [
          ...getCssLoader(2),
          {
            loader: 'less-loader',
            options: {
              sourceMap: isDev
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          ...getCssLoader(2),
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev
            }
          }
        ]
      },
      /**
       * asset module type
       * asset/resource: 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现 默认：[hash][ext][query]
       * asset/inline: 导出一个资源的 data URI。之前通过使用 url-loader 实现
       * asset/source: 导出资源的源代码。之前通过使用 raw-loader 实现
       * asset: 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现
       */
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: 'asset',
        // 设置资源的大小
        parser: {
          dataUrlCondition: {
            maxSize: imageInlineSizeLimit
          }
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2?)$/,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html', cache: false }),
    new CopyPlugin({
      patterns: [
        {
          context: resolve(PROJECT_PATH, './public'),
          from: '*',
          to: resolve(PROJECT_PATH, './build'),
          toType: 'dir',
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ['**/index.html']
          }
        }
      ]
    }),
    new WebpackBar({
      name: isDev ? 'RUNNING' : 'BUNDLING',
      color: isDev ? '#52c41a' : '#722ed1'
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: resolve(PROJECT_PATH, './tsconfig.json')
      }
    })
  ]
}
