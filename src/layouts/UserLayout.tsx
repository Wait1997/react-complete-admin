import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect, Switch } from 'react-router-dom'
import { Layout } from 'antd'
import './UserLayout.less'

const { Content, Footer } = Layout

export default function UserLayout(props: any) {
  const { children } = props
  const token = useSelector((state: any) => state.user.token)

  return (
    <Layout className='user-layout'>
      <div className='user-header' />
      <Content className='user-content'>
        <div className='user-content-top'>
          <div className='user-content-top-header'>antd design</div>
          <div className='user-content-top-desc'>Ant Design admin template</div>
        </div>
        <Switch>
          {children.map((route: any) => {
            const Component = route && route.component
            if (route.redirect) {
              return <Redirect exact key={route.path} from={route.path} to={route.redirect} />
            }
            return (
              <Route
                key={route.path}
                path={route.path}
                render={({ ...rest }) => {
                  if (token) {
                    return <Redirect to='/dashboard' />
                  }
                  return Component && <Component {...rest} />
                }}
              />
            )
          })}
        </Switch>
      </Content>
      <Footer className='user-footer'>Ant Design</Footer>
    </Layout>
  )
}
