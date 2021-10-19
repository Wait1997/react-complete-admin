import React from 'react'
import Loading from 'Components/Loading'
import loadable, { LoadableComponent } from '@loadable/component'

const UserLayout = loadable(() => import('Src/layouts/UserLayout'), { fallback: <Loading size='large' /> })
const BasicLayout = loadable(() => import('Src/layouts/BasicLayout'), { fallback: <Loading size='large' /> })

// 登录页
const Login = loadable(() => import('Pages/Login'))

// 首页
const Analysis = loadable(() => import('Pages/Dashboard/Analysis'), { fallback: <Loading size='large' /> })
const Workplace = loadable(() => import('Pages/Dashboard/Workplace'), { fallback: <Loading size='large' /> })

// 权限
const UserPermission = loadable(() => import('Pages/Permission/User'), { fallback: <Loading size='large' /> })
const RolePermission = loadable(() => import('Pages/Permission/Role'), { fallback: <Loading size='large' /> })
const AuthPermission = loadable(() => import('Src/pages/Permission/Auth'), { fallback: <Loading size='large' /> })
const MenuPermission = loadable(() => import('Src/pages/Permission/Menu'), { fallback: <Loading size='large' /> })

// 表单
const BasicForm = loadable(() => import('Pages/Form/BasicForm'), { fallback: <Loading size='large' /> })
const StepForm = loadable(() => import('Pages/Form/StepForm'), { fallback: <Loading size='large' /> })
const HighForm = loadable(() => import('Pages/Form/HighForm'), { fallback: <Loading size='large' /> })

// 表格
const TableSearch = loadable(() => import('Pages/Table/TableSearch'), { fallback: <Loading size='large' /> })
const TableQuery = loadable(() => import('Pages/Table/Query'), { fallback: <Loading size='large' /> })
const TableStandard = loadable(() => import('Src/pages/Table/Standard'), { fallback: <Loading size='large' /> })

// 组件
const Zip = loadable(() => import('Pages/Component/Zip'), { fallback: <Loading size='large' /> })
const ExportExcel = loadable(() => import('Pages/Component/Excel/ExportExcel'), { fallback: <Loading size='large' /> })
const UploadExcel = loadable(() => import('Pages/Component/Excel/UploadExcel'), { fallback: <Loading size='large' /> })
const Editor = loadable(() => import('Pages/Component/Editor'), { fallback: <Loading size='large' /> })
const Markdown = loadable(() => import('Src/pages/Component/Markdown/ReactMarkdown'), {
  fallback: <Loading size='large' />
})
const Bytemd = loadable(() => import('Pages/Component/Markdown/Bytemd'), { fallback: <Loading size='large' /> })
const Draggable = loadable(() => import('Pages/Component/Draggable'), { fallback: <Loading size='large' /> })

// 图表
const KeyBoard = loadable(() => import('Pages/Echarts/KeyBoard'), { fallback: <Loading size='large' /> })
const LineCharts = loadable(() => import('Pages/Echarts/LineCharts'), { fallback: <Loading size='large' /> })
const MixCharts = loadable(() => import('Pages/Echarts/MixCharts'), { fallback: <Loading size='large' /> })

// 异常页
const NoFound = loadable(() => import('Pages/ErrorPage/404'), { fallback: <Loading size='large' /> })
const NoAuth = loadable(() => import('Pages/ErrorPage/403'), { fallback: <Loading size='large' /> })

// Gallery
const Gallery = loadable(() => import('Pages/Gallery'), { fallback: <Loading size='large' /> })

export interface RouteListType {
  path?: string
  redirect?: string
  roles?: string[]
  children?: RouteListType[]
  component?: LoadableComponent<any>
}

// path: '/user' 一定要写在 '/' 前面
const routerList: RouteListType[] = [
  {
    path: '/user',
    component: UserLayout,
    children: [
      {
        path: '/user',
        redirect: '/user/login'
      },
      {
        path: '/user/login',
        component: Login
      },
      {
        redirect: '/user/login'
      }
    ]
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/',
        redirect: '/dashboard'
      },
      {
        path: '/dashboard',
        roles: ['admin', 'user'],
        children: [
          {
            path: '/dashboard',
            redirect: '/dashboard/analysis'
          },
          {
            path: '/dashboard/analysis',
            component: Analysis,
            roles: ['admin', 'user']
          },
          {
            path: '/dashboard/workplace',
            component: Workplace,
            roles: ['admin', 'user']
          },
          {
            redirect: '/dashboard/analysis'
          }
        ]
      },
      {
        path: '/permission',
        children: [
          {
            path: '/permission',
            redirect: '/permission/permission-user'
          },
          {
            path: '/permission/permission-user',
            component: UserPermission,
            roles: ['admin', 'user']
          },
          {
            path: '/permission/permission-role',
            component: RolePermission,
            roles: ['admin', 'user']
          },
          {
            path: '/permission/permission-auth',
            component: AuthPermission,
            roles: ['admin', 'user']
          },
          {
            path: '/permission/permission-menu',
            component: MenuPermission,
            roles: ['admin', 'user']
          },
          {
            redirect: '/permission/explanation'
          }
        ]
      },
      {
        path: '/form',
        children: [
          {
            path: '/form',
            redirect: '/form/basic-form'
          },
          {
            path: '/form/basic-form',
            component: BasicForm
          },
          {
            path: '/form/step-form',
            component: StepForm
          },
          {
            path: '/form/high-form',
            component: HighForm
          }
        ]
      },
      {
        path: '/table',
        children: [
          {
            path: '/table',
            redirect: '/table/query'
          },
          {
            path: '/table/search',
            children: [
              {
                path: '/table/search',
                redirect: '/table/search/article'
              },
              {
                path: '/table/search/article',
                component: TableSearch
              },
              {
                path: '/table/search/project',
                component: TableSearch,
                roles: ['admin']
              },
              {
                path: '/table/search/application',
                component: TableSearch
              },
              {
                redirect: '/table/search/article'
              }
            ]
          },
          {
            path: '/table/query',
            component: TableQuery,
            roles: ['admin', 'user']
          },
          {
            path: '/table/standard',
            component: TableStandard,
            roles: ['admin']
          },
          {
            redirect: '/table/query'
          }
        ]
      },
      {
        path: '/components',
        children: [
          {
            path: '/components',
            redirect: '/components/excel'
          },
          {
            path: '/components/excel',
            children: [
              {
                path: '/components/excel',
                redirect: '/components/excel/export'
              },
              {
                path: '/components/excel/export',
                component: ExportExcel
              },
              {
                path: '/components/excel/upload',
                component: UploadExcel
              },
              {
                redirect: '/components/excel/export'
              }
            ]
          },
          {
            path: '/components/markdown',
            roles: ['admin', 'user'],
            children: [
              {
                path: '/components/markdown',
                redirect: '/components/markdown/react-markdown'
              },
              {
                path: '/components/markdown/react-markdown',
                component: Markdown
              },
              {
                path: '/components/markdown/bytemd',
                component: Bytemd
              },
              {
                redirect: '/components/markdown/react-markdown'
              }
            ]
          },
          {
            path: '/components/draggable',
            component: Draggable,
            roles: ['admin', 'user']
          },
          {
            path: '/components/editor',
            component: Editor,
            roles: ['admin']
          },
          {
            path: '/components/zip',
            component: Zip,
            roles: ['admin', 'user']
          },
          {
            redirect: '/components/excel'
          }
        ]
      },
      {
        path: '/echarts',
        roles: ['admin'],
        children: [
          {
            path: '/echarts',
            redirect: '/echarts/keyboard'
          },
          {
            path: '/echarts/keyboard',
            component: KeyBoard,
            roles: ['admin']
          },
          {
            path: '/echarts/line',
            component: LineCharts,
            roles: ['admin']
          },
          {
            path: '/echarts/mix-chart',
            component: MixCharts,
            roles: ['admin']
          }
        ]
      },
      {
        path: '/error',
        children: [
          {
            path: '/error',
            redirect: '/error/404'
          },
          {
            path: '/error/404',
            component: NoFound
          },
          {
            path: '/error/403',
            component: NoAuth
          },
          {
            redirect: '/error/404'
          }
        ]
      },
      {
        path: '/recond',
        component: Gallery
      },
      {
        redirect: '/error/404'
      }
    ]
  }
]

export default routerList
