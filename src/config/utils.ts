import { CustomAxiosRequestConfig } from './index'
import { WebReq } from './url'

export const getHeaders = (config: CustomAxiosRequestConfig) => {
  return {
    'Content-Type': config.contentType || 'application/json'
  }
}

/**
 * 按照url和params生成相应的url
 * @param url
 * @param params
 */
export function genUrl(url: string, params?: WebReq['params']) {
  if (!params) {
    return url
  }
  const keys = Object.keys(params)
  if (keys && keys.length > 0) {
    let path = `${keys[0]}=${params[keys[0]]}`

    for (let i = 1; i < keys.length; i++) {
      path += `&${keys[i]}=${params[keys[i]]}`
    }
    return `${url}?${path}`
  }
  return url
}
