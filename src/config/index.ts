/*
 * @Author: @guofang
 * @Date: 2021-05-24 22:52:03
 * @Last Modified by: @guofang
 * @Last Modified time: 2021-10-14 12:36:19
 */

import Axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios'
import { baseURL, baseWebURL } from './config'

import { WebReq, Response } from './url'
import { getHeaders, genUrl } from './utils'

// 继承axiosRequestConfig并添加一个类型
export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  contentType?: 'application/json' | 'multipart/form-data' | 'application/x-www-form-urlencoded'
}

export interface Headers {
  Authorization: string
  'Content-Type': string
}

export interface Options {
  headers?: Headers
  config?: CustomAxiosRequestConfig
}

export class Webapi {
  /**
   * 初始化的axios实例
   */
  private axios: AxiosInstance

  /**
   * @description 请求拦截器
   */
  protected reqInterceptors: number

  /**
   * @description 响应拦截器
   */
  protected resInterceptors: number

  constructor(options: Options) {
    this.axios = Axios.create(options.config)
    this.reqInterceptors = this.axios.interceptors.request.use((config: CustomAxiosRequestConfig) => {
      // 添加请求头
      config.headers = {
        ...config.headers,
        ...getHeaders(config)
      }
      return config
    })
    this.resInterceptors = this.axios.interceptors.response.use(
      (response) => {
        if (response.status === 200) {
          return response.data
        }
        return response.data
      },
      (error) => {
        const response = error.response ?? {}
        const data = response.data ?? {}
        return { code: response.status, data }
      }
    )
  }

  public get<T>(url: string, params?: WebReq['params'], config?: WebReq['config']): Promise<Response<T>> {
    return this.api<T>(url, { params, config }, 'get')
  }

  public post<T>(url: string, params: WebReq['params'], config?: WebReq['config']): Promise<Response<T>> {
    return this.api<T>(url, { params, config }, 'post')
  }

  public put<T>(url: string, params: WebReq['params'], config?: WebReq['config']): Promise<Response<T>> {
    return this.api<T>(url, { params, config }, 'put')
  }

  public delete<T>(url: string, params: WebReq['params'], config?: WebReq['config']): Promise<Response<T>> {
    return this.api<T>(url, { params, config }, 'delete')
  }

  public patch<T>(url: string, params: WebReq['params'], config?: WebReq['config']): Promise<Response<T>> {
    return this.api<T>(url, { params, config }, 'patch')
  }

  private api<T>(url: string, req: WebReq, method: Method = 'get'): Promise<Response<T>> {
    /**
     * @description get|delete请求传参数和post|put|patch一致
     */
    if (url.split('?')[1] || /get|delete/i.test(method)) {
      url = genUrl(url, req.params)
    }
    method = method.toLocaleLowerCase() as Method
    switch (method) {
      case 'get':
        return this.axios.get(url, req.config)
      case 'delete':
        return this.axios.delete(url, req.config)
      case 'post':
        return this.axios.post(url, req.params, req.config)
      case 'put':
        return this.axios.put(url, req.params, req.config)
      case 'patch':
        return this.axios.patch(url, req.params, req.config)
      default:
        return this.axios.get(url, { params: req.params })
    }
  }
}

export const webapi: Webapi = new Webapi({
  config: {
    baseURL: `${baseURL}`,
    timeout: 100000
  }
})

export const basewebURL: Webapi = new Webapi({
  config: {
    baseURL: `${baseWebURL}`,
    timeout: 100000
  }
})
