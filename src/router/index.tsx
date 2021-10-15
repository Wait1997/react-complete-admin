/* eslint-disable react/no-children-prop */
import React from 'react'
import { connect } from 'react-redux'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import { getUserInfo } from 'Src/store/actions'
import routerList, { RouteListType } from 'Src/utils/routeList'

function Router(props: any) {
  const { token, role } = props
  const { userInfo } = props

  const routeEnter = (route: RouteListType, rest: any) => {
    const Component = route.component as any
    // token不存在 重定向
    if (!token) {
      return <Redirect to='/user' />
    }
    // 没有获取到角色 获取角色信息(刷新浏览器时)
    if (!role) {
      userInfo(token).then(() => {
        return <Component children={route.children} {...rest} />
      })
    }
    return <Component children={route.children} {...rest} />
  }

  return (
    <HashRouter>
      <Switch>
        {routerList.map((route) => {
          const Component = route.component as any
          return (
            <Route
              key={route.path}
              path={route.path}
              render={({ ...rest }) => {
                return route.path === '/' ? routeEnter(route, rest) : <Component children={route.children} {...rest} />
              }}
            />
          )
        })}
      </Switch>
    </HashRouter>
  )
}

export default connect((state: any) => state.user, { userInfo: getUserInfo })(Router)
