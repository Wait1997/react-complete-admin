import { get } from 'Src/utils/local-store'
import { SET_COLLAPSED } from '../types'

/**
 * @description collapsed 0 表示收起 1 表示打开
 */
export interface AppType {
  collapsed: boolean
}

const defaultAppInfo: AppType = {
  collapsed: get('collapsed') ? !!Number(get('collapsed')) : false
}

export default function app(state: AppType = defaultAppInfo, action: any) {
  const { type, payload } = action
  switch (type) {
    case SET_COLLAPSED:
      return {
        ...state,
        collapsed: payload
      }
    default:
      return state
  }
}
