import React, { useMemo } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Breadcrumb as AntdBreadcrumb } from 'antd'
import { MenuType } from 'Utils/menuList'
import './index.less'

const { Item } = AntdBreadcrumb

export interface BreadType {
  menuList: MenuType[]
}

export type BreadListType = { title: React.ReactNode; path: string }

function getBreadPath(pathname: string, menuList: MenuType[]): BreadListType[] {
  return menuList.reduce<BreadListType[]>((all: BreadListType[], item: MenuType) => {
    if (pathname.includes(item.path)) {
      if (item.children) {
        all.unshift(...getBreadPath(pathname, item.children))
      }
      all.unshift({ title: item.title, path: item.path })
    }
    return all
  }, [])
}

export default function Breadcrumb({ menuList }: BreadType) {
  const history = useHistory()
  const location = useLocation()

  const { pathname } = location
  const breadList = getBreadPath(pathname, menuList)
  try {
    const first = breadList[0]
    if (first && first.path !== '/dashboard') {
      breadList.unshift({ title: '首页', path: '/dashboard' })
    }
  } catch (error) {
    throw new Error(error as string)
  }

  const breadItem = useMemo(() => {
    return breadList.map((item, index) =>
      breadList.length - 1 === index ? (
        <Item key={item.path}>
          <span>{item.title}</span>
        </Item>
      ) : (
        <Item
          key={item.path}
          className='bread-item'
          onClick={() => {
            history.push(item.path)
          }}>
          <span>{item.title}</span>
        </Item>
      )
    )
  }, [breadList, history])

  return (
    <div className='breadcrumb'>
      <AntdBreadcrumb separator='/'>{breadItem}</AntdBreadcrumb>
    </div>
  )
}
