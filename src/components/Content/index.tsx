/* eslint-disable react/display-name */
import React from 'react'
import { Layout } from 'antd'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Redirect, Switch, Route, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RouteListType } from 'Src/utils/routeList'
import NoAuth from 'Src/pages/ErrorPage/403'

const { Content } = Layout
export interface ContentProps {
  list: RouteListType[]
  className: string
}

export default function LayoutContent({ list, className }: ContentProps) {
  const location = useLocation()
  const role = useSelector((state: any) => state.user.role)

  /**
   * @description 这里匹配相应权限的路由、如果不匹配则到403(必须保证routelist和menulist权限相同)
   * @param Component 路由组件
   * @param roles 当前路由组件的权限
   * @returns 路由组件
   */
  const checkPermission = (props: any, Component: any, roles?: string[]) => {
    if (roles && Array.isArray(roles)) {
      if (Array.isArray(role)) {
        if (role.some((item) => roles.includes(item))) {
          return <Component {...props} />
        }
        return <NoAuth />
      }
      if (roles.includes(role)) {
        return <Component {...props} />
      }
    }
    return <Component />
  }

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
              render={(props) => checkPermission(props, route.component, route?.roles)}
            />
          )
        })}
      </Switch>
    )
  }
  return (
    <Content className={className}>
      <TransitionGroup>
        <CSSTransition classNames='fade' key={location.pathname} timeout={300} exit={false}>
          {handleRoute(list)}
        </CSSTransition>
      </TransitionGroup>
    </Content>
  )
}
