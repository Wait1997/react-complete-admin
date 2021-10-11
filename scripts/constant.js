const path = require('path')

const PROJECT_PATH = path.resolve(__dirname, '../')
const PROJECT_NAME = path.parse(PROJECT_PATH).name

// dev server 路径与端口
const SERVER_HOST = 'localhost'
const SERVER_PORT = 8000

const shouldOpenAnalyzer = false // 是否包后后打开包分析
const ANALYZER_HOST = 'localhost'
const ANALYZER_PORT = '8888'

// 图片资源 limit
const imageInlineSizeLimit = 4 * 1024

// 是否开启多线程打包
const shouldOpenThreadLoader = false

module.exports = {
  PROJECT_PATH,
  PROJECT_NAME,
  SERVER_HOST,
  SERVER_PORT,
  ANALYZER_HOST,
  ANALYZER_PORT,
  shouldOpenAnalyzer,
  shouldOpenThreadLoader,
  imageInlineSizeLimit
}
