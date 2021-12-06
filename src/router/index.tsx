/* eslint-disable react/no-children-prop */
import React from 'react'
import { connect } from 'react-redux'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import { getUserInfo } from 'Src/store/actions'
import routerList, { RouteListType } from 'Src/utils/routeList'
import NoAuth from 'Pages/ErrorPage/403'

function Router(props: any) {
  const { token, role } = props
  const { userInfo } = props

  /**
   * @description 这里匹配相应权限的路由、如果不匹配则到403(必须保证routelist和menulist权限相同)
   * @param Component 路由组件
   * @param roles 当前路由组件的权限
   * @returns 路由组件
   */
  const checkPermission = (rest: any, Component: any, roles?: string[]) => {
    if (roles && Array.isArray(roles)) {
      if (Array.isArray(role)) {
        if (role.some((item) => roles.includes(item))) {
          return <Component {...rest} />
        }
        return <NoAuth />
      }
      if (roles.includes(role)) {
        return <Component {...rest} />
      }
    }
    return <Component {...rest} />
  }

  // 递归处理router 获取菜单对应的路由结构
  const handleRoute = (arrList: RouteListType[]) => {
    return (
      <Switch>
        {arrList.map((route) => {
          if (route.redirect) {
            if (route.path) {
              // 此时会记进行重定向
              return <Redirect exact key={route.path} from={route.path} to={route.redirect} />
            }
            return <Redirect key={route.redirect} to={route.redirect} />
          }
          // 如果存在子路由 则循环递归子路由
          if (route.children) {
            // 如果父级没有权限 则不需要做权限的校验 因为递归到子级时子级会去校验
            return (
              <Route key={route.path} path={route.path}>
                {handleRoute(route.children)}
              </Route>
            )
          }
          // 如果是打开的内容直接判断是否可以通过
          return (
            <Route
              key={route.path}
              path={route.path}
              render={(rest) => {
                // user路由下的表示未登录前的在这里处理
                if (route.path?.includes('/user')) {
                  const Component = route.component
                  // token重定向
                  if (token) {
                    return <Redirect to='/dashboard' />
                  }
                  return Component && <Component {...rest} />
                }
                return checkPermission(rest, route.component, route?.roles)
              }}
            />
          )
        })}
      </Switch>
    )
  }

  // 判断用户是否登录(没有登录重定向到登录)
  const routeEnter = (route: RouteListType, rest: any) => {
    const Component = route.component as any
    // token不存在 重定向
    if (!token) {
      return <Redirect to='/user' />
    }
    // 没有获取到角色 获取角色信息(刷新浏览器时)
    if (!role) {
      userInfo(token).then(() => {
        // component 为 BasicLayout
        return <Component {...rest}>{Array.isArray(route.children) && handleRoute(route?.children)}</Component>
      })
    }
    // component 为 BasicLayout
    return <Component {...rest}>{Array.isArray(route.children) && handleRoute(route?.children)}</Component>
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
                return route.path === '/' ? (
                  routeEnter(route, rest)
                ) : (
                  <Component {...rest}>{Array.isArray(route.children) && handleRoute(route?.children)}</Component>
                )
              }}
            />
          )
        })}
      </Switch>
    </HashRouter>
  )
}

export default connect((state: any) => state.user, { userInfo: getUserInfo })(Router)
