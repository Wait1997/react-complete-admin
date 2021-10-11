import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { menuList, MenuType, PowersType } from 'Src/utils/menuList'

const getPowersFromMenu = (pathname: string, arrList: MenuType[]): PowersType | null => {
  for (const item of arrList) {
    if (item.path === pathname) {
      return item.powers ? item.powers : null
    }
    if (item.children) {
      const powers = getPowersFromMenu(pathname, item.children)
      if (powers) {
        return powers
      }
    }
  }
  return null
}

export default function useDataPermission() {
  const location = useLocation()
  const { pathname } = location
  const role: Array<keyof PowersType> = useSelector((state: any) => state.user.role)
  const currentPowers = getPowersFromMenu(pathname, menuList)
  const dataList = currentPowers ? currentPowers[role[0]] : []
  return dataList
}
