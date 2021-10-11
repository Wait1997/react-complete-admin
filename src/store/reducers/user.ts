import { get } from 'Utils/local-store'
import * as types from '../types'

export interface UserInfo {
  name: string
  role: string | string[]
  avatar: string
  token: string | null
}

const initUserInfo: UserInfo = {
  name: '',
  role: '',
  avatar: '',
  token: get('token')
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
        name: payload.name
      }
    case types.USER_RESET_USER:
      return {
        token: null,
        name: '',
        role: '',
        avatar: ''
      }
    default:
      return state
  }
}
