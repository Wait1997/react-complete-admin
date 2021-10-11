import { message } from 'antd'
import { apiPostUserInfo, UserBasicInfo } from 'Api/login'
import * as types from '../types'

export const setUserInfo = (userInfo: UserBasicInfo) => {
  return {
    type: types.USER_SET_USER_INFO,
    payload: userInfo
  }
}

export const getUserInfo = (token: string) => {
  return (dispatch: any) => {
    return new Promise<void>((resolve, reject) => {
      apiPostUserInfo(token)
        .then((res) => {
          const { code, data } = res
          if (code === 200) {
            dispatch(setUserInfo(data as UserBasicInfo))
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

/**
 * 重置用户数据
 * @returns dispatch action
 */
export const resetUser = () => {
  return {
    type: types.USER_RESET_USER
  }
}

export const setUserToken = (token: string) => ({ type: types.USER_SET_USER_TOKEN, payload: token })
