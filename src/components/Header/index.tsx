import React, { useContext, useMemo, useState } from 'react'
import { UserInfo } from 'Src/store/reducers/user'
import { Language } from 'Src/locales'
import { Layout, Menu, Dropdown } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SmileOutlined,
  GlobalOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined
} from '@ant-design/icons'
import cn from 'classnames'
import { LangContext, LangContextType } from '../LangProvider'
import './index.less'

const { Header } = Layout

export interface HeaderType {
  width?: number
  collapsedWidth?: number
  fixedHeader?: boolean
  collapsed: boolean
  userInfo: UserInfo
  onToggle: (value: boolean) => void
  onLogout: () => void
}

export default function MenuHeader({
  collapsed,
  userInfo,
  onLogout,
  onToggle,
  children,
  fixedHeader = true
}: React.PropsWithChildren<HeaderType>) {
  const { checkChange } = useContext<LangContextType>(LangContext)
  const [fullScreen, setFullScreen] = useState(false)

  // 进入全屏
  const requestFullScreen = () => {
    const element: HTMLElement = document.documentElement

    // 判断各种浏览器，找到正确的方法
    const requestMethod =
      element.requestFullscreen || // W3C
      (element as any).webkitRequestFullScreen || // Chrome等
      (element as any).mozRequestFullScreen || // FireFox
      (element as any).msRequestFullscreen // IE11
    if (requestMethod) {
      requestMethod.call(element)
    }
    setFullScreen(true)
  }

  // 退出全屏
  const exitFullScreen = () => {
    // 判断各种浏览器，找到正确的方法
    const element: Document = document
    const exitMethod =
      element.exitFullscreen || // W3C
      (element as any).mozCancelFullScreen || // firefox
      (element as any).webkitExitFullscreen || // Chrome等
      (element as any).msExitFullscreen // IE11
    if (exitMethod) {
      exitMethod.call(element)
    }
    setFullScreen(false)
  }

  const languageEl = useMemo(() => {
    return (
      <Dropdown
        trigger={['hover']}
        placement='bottomCenter'
        overlay={
          <Menu
            onClick={(selected) => {
              checkChange(selected.key as Language)
            }}>
            <Menu.Item key='zh-CN'>中文（Chinese）</Menu.Item>
            <Menu.Item key='en-US'>英文（English）</Menu.Item>
          </Menu>
        }>
        <div className='global-icon'>
          <GlobalOutlined style={{ fontSize: 20, color: 'rgba(0, 0, 0, 0.72)' }} />
        </div>
      </Dropdown>
    )
  }, [checkChange])

  const userInfoEl = useMemo(() => {
    return (
      <Dropdown
        trigger={['hover']}
        placement='bottomCenter'
        overlay={
          <Menu>
            <Menu.Item key='0'>
              <a href='https://ant.design/components/overview-cn/'>Ant Design</a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key='1'>
              <a href='https://github.com'>GitHub</a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key='3' onClick={onLogout}>
              退出登录
            </Menu.Item>
          </Menu>
        }>
        <div className='userhead'>
          <SmileOutlined style={{ fontSize: 20, color: 'rgba(0, 0, 0, 0.72)' }} />
          <span style={{ marginLeft: 6 }}>{userInfo && userInfo.name}</span>
        </div>
      </Dropdown>
    )
  }, [userInfo, onLogout])

  return (
    <>
      {fixedHeader && <Header style={{ height: 48, backgroundColor: 'transparent', lineHeight: 48 }} />}
      <Header
        className={cn('menu-header', { 'fixed-header': fixedHeader })}
        style={{
          height: 48,
          padding: 0,
          backgroundColor: '#fff',
          width: collapsed ? 'calc(100% - 48px)' : 'calc(100% - 208px)'
        }}>
        <div className='head-wrap'>
          <div className='head-left'>
            {collapsed ? (
              <MenuUnfoldOutlined
                style={{ fontSize: 18, color: '#1890ff' }}
                onClick={() => {
                  onToggle(false)
                }}
              />
            ) : (
              <MenuFoldOutlined
                style={{ fontSize: 18, color: '#1890ff' }}
                onClick={() => {
                  onToggle(true)
                }}
              />
            )}
            {children}
          </div>
          <div className='head-right'>
            <span className='fullscreen-wrap'>
              {fullScreen ? (
                <FullscreenExitOutlined className='fullscreen-icon' onClick={exitFullScreen} />
              ) : (
                <FullscreenOutlined className='fullscreen-icon' onClick={requestFullScreen} />
              )}
            </span>
            {languageEl}
            {userInfoEl}
          </div>
        </div>
      </Header>
    </>
  )
}
