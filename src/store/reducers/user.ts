import { get } from 'Utils/local-store'
import { menuList as menus, MenuType } from 'Src/utils/menuList'
import * as types from '../types'

/**
 * @description 用户信息
 */
export interface UserInfo {
  name: string
  role: string | string[]
  avatar: string
  token: string | null
  /**
   * @description 这里添加menuList是为了可能为后端获取的数据
   */
  menuList: MenuType[]
}

const initUserInfo: UserInfo = {
  name: '',
  role: '',
  avatar: '',
  token: get('token'),
  menuList: []
}

export default function user(state = initUserInfo, action: any) {
  const { type, payload } = action
  switch (type) {
    case types.USER_SET_USER_TOKEN:
      return {
        ...state,
        token: payload
      }
    case types.USER_SET_USER_INFO:
      return {
        ...state,
        role: payload.role,
        avatar: payload.avatar,
        name: payload.name,
        menuList: menus
      }
    case types.USER_RESET_USER:
      return {
        token: null,
        name: '',
        role: '',
        avatar: '',
        menuList: []
      }
    default:
      return state
  }
}
