import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { logout, setCollapsed } from 'Src/store/actions'
import { Layout } from 'antd'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import ErrorBoundary from 'Src/components/ErrorBoundary'
import MenuSide from 'Components/Menu'
import Breadcrumb from 'Components/Breadcrumb'
import Header from 'Components/Header'
import RightPanel from 'Components/RightPanel'
import './BasicLayout.less'

const BasicLayout: React.FC<any> = (props) => {
  const { userInfo, collapsed, children } = props
  const history = useHistory()
  const location = useLocation()

  const [options, setOptions] = useState<Array<{ value: string; title: string }>>([])

  const handleSearch = (value: string) => {
    if (value) {
      // eslint-disable-next-line no-console
      console.log(value)
    } else {
      setOptions([])
    }
  }

  // header中需要显示的信息
  const headUserInfo = {
    name: userInfo.name,
    avatar: userInfo.avatar,
    role: userInfo.role,
    token: userInfo.token
  }

  return (
    <Layout className='basic-layout'>
      <MenuSide className='basic-sider' data={userInfo.menuList} collapsed={collapsed} />
      {process.env.NODE_ENV === 'development' && <RightPanel />}
      <Layout className='content-layout'>
        <Header
          options={options}
          collapsed={collapsed}
          userInfo={headUserInfo}
          onSearch={handleSearch}
          onToggle={(value) => {
            // 切换菜单展开/收起放在redux中
            props.setCollapsed(value)
          }}
          onLogout={async () => {
            await props.logout(userInfo.token)
            history.replace('/user/login')
          }}>
          <Breadcrumb menuList={userInfo.menuList} />
        </Header>
        <ErrorBoundary>
          <Layout.Content className='content'>
            <TransitionGroup>
              <CSSTransition classNames='fade' key={location.pathname} timeout={300} exit={false} unmountOnExit>
                {children}
              </CSSTransition>
            </TransitionGroup>
          </Layout.Content>
        </ErrorBoundary>
      </Layout>
    </Layout>
  )
}

export default connect(
  (state: any) => {
    return {
      userInfo: state.user,
      collapsed: state.app.collapsed
    }
  },
  { logout, setCollapsed }
)(BasicLayout)
