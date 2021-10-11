const users = require('./data/user')
const dataLists = require('./data/table/query')

const token = {
  admin: 'admin-token',
  user: 'user-token'
}

// 登录获取token
const onLogin = (p) => {
  const { username, password } = p
  if (!username) {
    return { code: 204, data: null, message: '该用户不存在' }
  }
  if (password !== '123456') {
    return { code: 204, data: null, message: '密码错误' }
  }
  // 登录成功返回用户token
  return { code: 200, data: { token: token[username] }, message: '登录成功' }
}

// 退出登录
const logout = (p) => {
  if (p.token) {
    return { code: 200, data: null, message: 'success' }
  }
  return { code: 400, data: null, message: 'error' }
}

// 根据token获取用户信息
const userInfo = (p) => {
  if (p.token) {
    return { code: 200, data: users[p.token], message: 'success' }
  }
  return { code: 400, data: null, message: 'token错误或者token为空' }
}

const getTableList = (p) => {
  const { pageIndex = 1, pageSize = 10, name, status } = p
  if (name && status) {
    const list = dataLists.filter((item) => item.name.includes(name) && item.status.includes(status))
    // 分页
    return {
      code: 200,
      data: { count: list.length, list: list.slice((pageIndex - 1) * pageSize, pageIndex * pageSize) },
      message: 'success'
    }
  }
  if (name) {
    const list = dataLists.filter((item) => item.name.includes(name))
    // 分页
    return {
      code: 200,
      data: {
        count: list.length,
        list: list.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
      },
      message: 'success'
    }
  }
  if (status) {
    const list = dataLists.filter((item) => item.status.includes(status))
    return {
      code: 200,
      data: { count: list.length, list: list.slice((pageIndex - 1) * pageSize, pageIndex * pageSize) },
      message: 'success'
    }
  }
  return {
    code: 200,
    data: { count: dataLists.length, list: dataLists.slice((pageIndex - 1) * pageSize, pageIndex * pageSize) },
    message: 'success'
  }
}

const getModifyItem = (p) => {
  const { id, desc, serveCount, serveTime } = p
  if (id !== undefined) {
    for (const item of dataLists) {
      if (item.key === id) {
        item.name = p.name
        item.desc = desc
        item.serveCount = serveCount
        item.status = p.status
        item.serveTime = serveTime
      }
    }
    return { code: 200, data: null, message: 'success' }
  }
  dataLists.unshift({
    key: 0,
    name: p.name,
    desc,
    serveCount,
    status: p.status,
    serveTime
  })
  return { code: 200, data: null, message: 'success' }
}

exports.mockApi = (obj) => {
  const { url, body } = obj
  let params = typeof body === 'string' ? JSON.parse(body) : body
  let path = url

  // 是get请求 解析参数
  if (url.includes('?')) {
    // eslint-disable-next-line prefer-destructuring
    path = url.split('?')[0]
    const s = url.split('?')[1].split('&') // ['a=1','b=2']
    params = {}

    for (const element of s) {
      if (element) {
        const ss = element.split('=')
        // eslint-disable-next-line prefer-destructuring
        params[ss[0]] = ss[1]
      }
    }
  }
  // 如果是完整的url,则替换为路径
  if (path.includes('http')) {
    path = path.replace(`${globalThis.location.protocol}//${globalThis.location.host}`, '')
  }

  switch (path) {
    case '/api/login':
      return onLogin(params)
    case '/api/logout':
      return logout(params)
    case '/api/userInfo':
      return userInfo(params)
    case '/api/query/table':
      return getTableList(params)
    case '/api/modify/table':
      return getModifyItem(params)
    default:
      return { code: 404, data: null, message: 'api not found' }
  }
}
