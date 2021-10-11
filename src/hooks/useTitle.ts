import { useLocation } from 'react-router-dom'
import { menuList, MenuType } from 'Src/utils/menuList'

function reduceList(pathname: string, arrList: MenuType[]): void {
  for (const menu of arrList) {
    if (menu.path === pathname) {
      document.title = `${menu.title} - Antd Admin`
    }
    if (menu.children && menu.children.length > 0) {
      reduceList(pathname, menu.children)
    }
  }
}

export default function useTitle() {
  const location = useLocation()
  const { pathname } = location
  reduceList(pathname, menuList)
}
