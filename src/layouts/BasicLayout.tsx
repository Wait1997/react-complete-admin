import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { logout, setCollapsed } from 'Src/store/actions'
import Breadcrumb from 'Components/Breadcrumb'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import ProLayout from 'Components/ProLayout'
import './BasicLayout.less'

const BasicLayout: React.FunctionComponent<any> = (props) => {
  const history = useHistory()
  const location = useLocation()
  const {
    userInfo: { menuList, name, avatar, role, token },
    collapsed,
    children
  } = props
  // header中需要显示的信息
  const headUserInfo = { name, avatar, role, token }

  const [options, setOptions] = useState<Array<{ value: string; title: string }>>([])

  const handleSearch = (value: string) => {
    if (value) {
      // eslint-disable-next-line no-console
      console.log(value)
    } else {
      setOptions([])
    }
  }

  return (
    <ProLayout
      collapsed={collapsed}
      options={options}
      menuList={menuList}
      headUserInfo={headUserInfo}
      breadcrumb={<Breadcrumb menuList={menuList} />}
      setCollapsed={(value) => {
        // 切换菜单展开/收起
        setCollapsed(value)
      }}
      onSearch={handleSearch}
      onLogout={async () => {
        await props.logout(token)
        history.replace('/user/login')
      }}>
      <TransitionGroup>
        <CSSTransition classNames='fade' key={location.pathname} timeout={300} exit={false} unmountOnExit>
          {children}
        </CSSTransition>
      </TransitionGroup>
    </ProLayout>
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
