export type PowersType = { admin: string[]; user: string[] }
export interface MenuType {
  title: React.ReactNode
  path: string
  icon?: string
  roles?: string[]
  powers?: PowersType
  children?: MenuType[]
}

export const menuList: MenuType[] = [
  {
    title: '首页',
    path: '/dashboard',
    icon: 'dashboard',
    children: [
      {
        path: '/dashboard/analysis',
        title: '分析页',
        roles: ['admin', 'user']
      },
      {
        path: '/dashboard/workplace',
        title: '工作台',
        roles: ['admin', 'user']
      }
    ]
  },
  {
    title: '权限管理',
    path: '/permission',
    icon: 'lock',
    children: [
      {
        title: '用户管理',
        path: '/permission/permission-user',
        roles: ['admin', 'user'],
        powers: {
          admin: ['add', 'view', 'modify', 'deal', 'delete'],
          user: ['view']
        }
      },
      {
        title: '角色管理',
        path: '/permission/permission-role',
        roles: ['admin', 'user'],
        powers: {
          admin: ['add', 'view', 'modify', 'deal', 'delete'],
          user: ['add', 'view']
        }
      },
      {
        title: '权限管理',
        path: '/permission/permission-auth',
        roles: ['admin', 'user']
      },
      {
        title: '菜单管理',
        path: '/permission/permission-menu',
        roles: ['admin', 'user']
      }
    ]
  },
  {
    title: '表单页',
    path: '/form',
    icon: 'form',
    children: [
      {
        title: '基础表单',
        path: '/form/basic-form'
      },
      {
        title: '分步表单',
        path: '/form/step-form'
      },
      {
        title: '高级表单',
        path: '/form/high-form'
      }
    ]
  },
  {
    title: '表格',
    path: '/table',
    icon: 'table',
    roles: ['admin', 'user'],
    children: [
      {
        path: '/table/search',
        title: '搜索列表',
        roles: ['admin', 'user'],
        children: [
          {
            path: '/table/search/article',
            title: '搜索列表（文章）',
            roles: ['admin', 'user']
          },
          {
            path: '/table/search/project',
            title: '搜索列表（项目）',
            roles: ['admin']
          },
          {
            path: '/table/search/application',
            title: '搜索列表（应用）'
          }
        ]
      },
      {
        path: '/table/query',
        title: '查询表格',
        roles: ['admin', 'user']
      },
      {
        path: '/table/standard',
        title: '标准表格',
        roles: ['admin']
      }
    ]
  },
  {
    title: '组件',
    path: '/components',
    icon: 'component',
    roles: ['admin', 'user'],
    children: [
      {
        title: '引导页',
        path: '/components/guide',
        icon: 'key',
        roles: ['admin', 'user']
      },
      {
        title: 'Excel',
        path: '/components/excel',
        roles: ['admin', 'user'],
        children: [
          {
            title: '导出Excel',
            path: '/components/excel/export',
            roles: ['admin', 'user']
          },
          {
            title: '上传Excel',
            path: '/components/excel/upload',
            roles: ['admin', 'user']
          }
        ]
      },
      {
        title: '富文本',
        path: '/components/richtext',
        roles: ['admin']
      },
      {
        title: 'Markdown',
        path: '/components/markdown',
        roles: ['admin', 'user']
      },
      {
        title: '拖拽组件',
        path: '/components/draggable',
        roles: ['admin', 'user']
      }
    ]
  },
  {
    title: '图表',
    path: '/echarts',
    icon: 'charts',
    roles: ['admin', 'user'],
    children: [
      {
        title: '键盘图表',
        path: '/echarts/keyboard',
        roles: ['admin']
      },
      {
        title: '折线图',
        path: '/echarts/line',
        roles: ['admin']
      },
      {
        title: '混合图表',
        path: '/echarts/mix-chart',
        roles: ['admin', 'user']
      }
    ]
  },
  {
    title: '异常页',
    path: '/error',
    icon: 'error',
    children: [
      {
        title: '404',
        path: '/error/404',
        roles: ['admin', 'user']
      },
      {
        title: '403',
        path: '/error/403',
        roles: ['admin', 'user']
      }
    ]
  },
  {
    title: '记录',
    path: '/recond',
    icon: 'heart',
    roles: ['admin']
  }
]
