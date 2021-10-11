import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { menuList, MenuType, PowersType } from 'Src/utils/menuList'

export type Powers = {
  admin: string[]
  user: string[]
  all: string[]
}

export type TableRoleType = {
  key: number | string
  title: React.ReactNode
  currentPowers?: Powers
  children?: TableRoleType[]
}

export default function useTableRole() {
  const role: string[] = useSelector((state: any) => state.user.role)

  const hasPermission = useCallback(
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

  const getPermissionRole = useCallback(
    (arrList: MenuType[]) => {
      const list: TableRoleType[] = []
      for (const menu of arrList) {
        if (hasPermission(menu)) {
          const powers: Powers = {
            admin: [],
            user: [],
            all: []
          }

          if (menu.powers) {
            const all = [
              ...menu.powers.admin,
              ...menu.powers.user.filter((item) => !(menu.powers as PowersType).admin.includes(item))
            ]
            powers.admin = menu.powers.admin
            powers.user = menu.powers.user
            powers.all = all
          }
          list.push(
            menu?.children
              ? {
                  key: menu.path,
                  title: menu.title,
                  currentPowers: powers,
                  children: getPermissionRole(menu.children)
                }
              : {
                  key: menu.path,
                  title: menu.title,
                  currentPowers: powers
                }
          )
        }
      }
      return list
    },
    [hasPermission]
  )

  const roleTableList = getPermissionRole(menuList)
  return roleTableList
}
