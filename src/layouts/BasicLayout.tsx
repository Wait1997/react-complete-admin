import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logout, setCollapsed } from 'Src/store/actions'
import { Layout } from 'antd'
import ErrorBoundary from 'Src/components/ErrorBoundary'
import MenuSide from 'Components/Menu'
import Breadcrumb from 'Components/Breadcrumb'
import Header from 'Components/Header'
import Content from 'Components/Content'
import './BasicLayout.less'

const BasicLayout: React.FC<any> = (props) => {
  const { userInfo, collapsed, children } = props
  const history = useHistory()

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
          <Content className='content' list={children} />
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
