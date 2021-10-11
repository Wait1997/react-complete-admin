import { SET_COLLAPSED } from '../types'

// const
export function setCollapsed(collapsed: boolean) {
  return {
    type: SET_COLLAPSED,
    payload: collapsed
  }
}
