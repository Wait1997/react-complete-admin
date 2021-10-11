declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.svg'
declare module '*.json'

/**
 * 在window下面挂载新的属性
 */
declare interface Window {
  test: any
}
