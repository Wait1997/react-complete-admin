import { SET_COLLAPSED } from '../types'

export interface CollapsedProps {
  type: string
  payload: boolean
}

// const
export function setCollapsed(collapsed: boolean): CollapsedProps {
  return {
    type: SET_COLLAPSED,
    payload: collapsed
  }
}
