import React, { PropsWithChildren } from 'react'
import { Layout } from 'antd'
import { MenuType } from 'Src/utils/menuList'
import ErrorBoundary from 'Components/ErrorBoundary'
import MenuSide from 'Components/Menu'
import Header from 'Components/Header'
import RightPanel from 'Components/RightPanel'
import cn from 'classnames'
import './index.less'

export interface HeadUserInfo {
  name: string
  avatar: string
  role: string | string[]
  token: string | null
}

export interface ProLayoutProps {
  env?: 'development' | 'production'
  collapsed: boolean
  className?: string
  menuList: MenuType[]
  headUserInfo: HeadUserInfo
  options: Array<{ value: string; title: string }>
  breadcrumb: React.ReactNode
  setCollapsed: (value: boolean) => void
  onLogout: () => void
  onSearch: (value: string) => void
}

const ProLayout: React.FunctionComponent<PropsWithChildren<ProLayoutProps>> = ({
  env = 'development',
  collapsed,
  className,
  children,
  menuList,
  options,
  headUserInfo,
  breadcrumb,
  setCollapsed,
  onLogout,
  onSearch,
  ...restProps
}) => {
  return (
    <Layout className={cn('basic-layout', className)} {...restProps}>
      <MenuSide className='basic-sider' data={menuList} collapsed={collapsed} />
      {env === 'development' && <RightPanel />}
      <Layout className='content-layout'>
        <Header
          options={options}
          collapsed={collapsed}
          userInfo={headUserInfo}
          onSearch={onSearch}
          onToggle={setCollapsed}
          onLogout={onLogout}>
          {breadcrumb}
        </Header>
        <ErrorBoundary>
          <Layout.Content className='content'>{children}</Layout.Content>
        </ErrorBoundary>
      </Layout>
    </Layout>
  )
}

export default ProLayout
