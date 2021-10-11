import { combineReducers } from 'redux'
import user from './user'
import app from './app'

const rootReducer = combineReducers({ user, app })

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
