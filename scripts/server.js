const bodyParser = require('body-parser')
const mockFile = require('../mock/app-data')

/**
 * 读取本地mock数据
 * @param {*} req
 */
function readMockData(req) {
  const { originalUrl, params } = req
  /** 打印请求 */
  // eslint-disable-next-line no-console
  console.log(originalUrl, Date.now())
  return new Promise((resolve, reject) => {
    try {
      const result = mockFile.mockApi({ url: originalUrl, body: params })
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}
/**
 * express中间件，实现ajax mock数据功能
 * @param {*} app
 */
module.exports = function mock(app) {
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  /** 监听POST请求，返回MOCK模拟数据 */
  app.post(/\/api.*/, (req, res) => {
    readMockData({
      originalUrl: req.originalUrl,
      params: req.body
    })
      .then((response) => {
        res.send(response)
      })
      .catch((error) => {
        res.send(error)
      })
  })
  /** 监听GET请求，返回MOCK模拟数据 */
  app.get(/\/api.*/, (req, res) => {
    readMockData({
      originalUrl: req.originalUrl,
      params: req.query
    })
      .then((response) => {
        res.send(response)
      })
      .catch((error) => {
        res.send(error)
      })
  })
}
