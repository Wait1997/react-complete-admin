import React, { useCallback, useState, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { Layout, Menu as AntdMenu } from 'antd'
import { MenuType } from 'Utils/menuList'
import getMenuIcon, { iconsMap } from 'Src/utils/icon'
import Logo from 'Assets/images/logo.svg'
import cn from 'classnames'
import './index.less'

const { Sider } = Layout
const { SubMenu, Item } = AntdMenu

export interface MenuProps {
  logo?: string
  title?: string
  logoWrap?: React.ReactNode
  data: MenuType[]
  width?: number
  collapsedWidth?: number
  theme?: 'light' | 'dark'
  collapsed: boolean
  className?: string
  fixedSider?: boolean
  style?: React.CSSProperties
}

/**
 * 为了获取打开过的subMenu数组的key
 * @param pathname location.pathname
 * @returns subMenu经过的数组的key
 */
const getPreviousPath = (pathname: string): string[] => {
  let previousPath = ''
  const parentList = []

  const pathList = pathname.split('/').filter(Boolean)
  const effectList = pathList.slice(0, -1)

  for (const item of effectList) {
    previousPath += `/${item}`
    parentList.push(previousPath)
  }
  return parentList
}

export default function MenuSide({
  logo = Logo,
  title = 'Antd Admin',
  logoWrap,
  data,
  width = 208,
  collapsedWidth = 48,
  theme = 'light',
  collapsed,
  className,
  fixedSider = true,
  style
}: MenuProps) {
  const history = useHistory()
  const location = useLocation()
  // 当前用户的角色
  const role = useSelector((state: any) => state.user.role)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])

  useEffect(() => {
    const { pathname } = location
    // 为了打开的subMenu的路径
    const parentList = getPreviousPath(pathname)
    setSelectedKeys([pathname])
    if (!collapsed) {
      setOpenKeys(parentList)
    }
  }, [location, collapsed])

  const hasPermisssion = useCallback(
    (item: MenuType) => {
      if (item.roles && Array.isArray(item.roles)) {
        if (Array.isArray(role)) {
          return role.some((cur) => (item.roles as string[]).includes(cur))
        }
        return item.roles.includes(role)
      }
      return true
    },
    [role]
  )

  const LogoWrap = useMemo(() => {
    if (!logoWrap) {
      return (
        <NavLink to='/dashboard' activeClassName='logo-link' className='logo-link'>
          <img src={logo} height={32} alt='' />
          {!collapsed && <span className='logo-title'>{title}</span>}
        </NavLink>
      )
    }
    return logoWrap
  }, [title, logo, logoWrap, collapsed])

  const getMenuNodes = useCallback(
    (menu: MenuType[]) => {
      const treeDom = menu.map((item) => {
        if (hasPermisssion(item)) {
          return item.children ? (
            <SubMenu key={item.path} title={item.title} icon={getMenuIcon(iconsMap, item?.icon)}>
              {getMenuNodes(item.children)}
            </SubMenu>
          ) : (
            <Item key={item.path} icon={getMenuIcon(iconsMap, item?.icon)}>
              {item.title}
            </Item>
          )
        }
        return null
      })
      return treeDom
    },
    [hasPermisssion]
  )

  return (
    <>
      {fixedSider && (
        <div
          style={
            collapsed
              ? {
                  width: collapsedWidth,
                  minWidth: collapsedWidth,
                  maxWidth: collapsedWidth,
                  overflow: 'hidden'
                }
              : {
                  width,
                  minWidth: width,
                  maxWidth: width,
                  overflow: 'hidden'
                }
          }
        />
      )}
      <Sider
        theme={theme}
        width={width}
        collapsedWidth={collapsedWidth}
        className={cn(className, 'menu-sider', { 'fixed-sider': fixedSider })}
        style={style}
        collapsed={collapsed}
        trigger={null}
        collapsible>
        <div className='menu-wrap'>
          <div className={cn('app-logo', { 'logo-collapsed': collapsed })}>{LogoWrap}</div>
          <AntdMenu
            theme={theme}
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={(keys) => {
              setOpenKeys(keys as string[])
            }}
            onSelect={(select) => {
              setSelectedKeys(select.selectedKeys)
              if (!selectedKeys.includes(select.key)) {
                history.push(select.key)
              }
            }}
            mode='inline'>
            {getMenuNodes(data)}
          </AntdMenu>
        </div>
      </Sider>
    </>
  )
}
