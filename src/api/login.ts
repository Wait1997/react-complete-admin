import { webapi } from 'Config/index'
import { Response } from 'Config/url'

export interface LoginReqType {
  username: string
  password: string
}
export interface UserBasicInfo {
  id: string
  role: string[]
  name: string
  avatar: string
  desc: string
}

export function apiPostLogin({ username, password }: LoginReqType): Promise<Response<{ token: string }>> {
  return webapi.post('/api/login', { username, password })
}

export function apiPostLogout(token: string): Promise<Response<string>> {
  return webapi.post('api/logout', { token })
}

export function apiPostUserInfo(token: string): Promise<Response<UserBasicInfo | null>> {
  return webapi.post('/api/userInfo', { token })
}
