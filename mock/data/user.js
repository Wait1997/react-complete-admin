// 所有的用户数据
const users = {
  'admin-token': {
    id: 'admin',
    role: ['admin'],
    name: '管理员',
    avatar: 'https://s1.ax1x.com/2020/04/28/J5hUaT.jpg',
    desc: '拥有系统内所有菜单和路由权限'
  },
  'user-token': {
    id: 'user',
    role: ['user'],
    name: '普通用户',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    desc: '仅能看到Dashboard、开发文档、权限测试和关于作者四个页面'
  }
}

module.exports = users
