import { message } from 'antd'
import { apiPostUserInfo, UserBasicInfo } from 'Api/login'
import * as types from '../types'

export interface SetUserInfoProps {
  type: string
  payload: UserBasicInfo
}

export interface SetRestUserProps {
  type: string
}

export interface SetUsertokenProps {
  type: string
  payload: string
}

export const setUserInfo = (userInfo: UserBasicInfo): SetUserInfoProps => {
  return {
    type: types.USER_SET_USER_INFO,
    payload: userInfo
  }
}

export type UnionUserType = SetUserInfoProps | SetRestUserProps | SetUsertokenProps

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
export const resetUser = (): SetRestUserProps => {
  return {
    type: types.USER_RESET_USER
  }
}

export const setUserToken = (token: string): SetUsertokenProps => ({ type: types.USER_SET_USER_TOKEN, payload: token })
