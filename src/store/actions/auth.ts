import { message } from 'antd'
import { LoginReqType, apiPostLogin, apiPostLogout } from 'Api/login'
import { set, remove } from 'Src/utils/local-store'
import { setUserToken, resetUser } from './user'

export const onLogin = ({ username, password }: LoginReqType) => {
  return (dispatch: any) => {
    return new Promise<string>((resolve, reject) => {
      apiPostLogin({ username, password })
        .then((res) => {
          const { code, data } = res
          if (code === 200) {
            dispatch(setUserToken(data.token))
            set('token', data.token)
            resolve(data.token)
          }
        })
        .catch((error) => {
          reject(error.message)
        })
    })
  }
}

export const logout = (token: string) => {
  return (dispatch: any) => {
    return new Promise<void>((resolve, reject) => {
      apiPostLogout(token)
        .then((res) => {
          if (res.code === 200) {
            dispatch(resetUser())
            remove('token')
            resolve()
          } else {
            message.error(res.message)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
