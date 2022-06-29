import { combineReducers } from 'redux'
import user, { UserInfo } from './user'
import app, { AppType } from './app'

export interface RootState {
  user: UserInfo
  app: AppType
}

const rootReducer = combineReducers({ user, app })

// export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
