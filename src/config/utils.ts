import { CustomAxiosRequestConfig } from './index'

export const getHeaders = (config: CustomAxiosRequestConfig) => {
  return {
    'Content-Type': config.contentType || 'application/json'
  }
}
