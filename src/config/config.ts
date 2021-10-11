const port = 8000
const { hostname, protocol } = window.location

export const isLocal = hostname.match(/^127|localhost|^192/)
export const isDev = hostname.match(/^dev-/)
export const isPre = hostname.match(/^pre-/)
export const isOnline = hostname.match(/^pc/)

interface BaseURLView {
  url: string
  webURL: string
}

function getBaseURL(): BaseURLView {
  let url: string
  let webURL: string

  if (isLocal) {
    // url = window.location.origin
    url = `${protocol}//${hostname}:${port}`
    webURL = '//dev-cs.xiaoheiban.cn'
  } else if (isDev) {
    url = '//dev-platform.xiaoheiban.cn'
    webURL = '//dev-cs.xiaoheiban.cn'
  } else if (isPre) {
    url = '//pre-platform.xiaoheiban.cn'
    webURL = '//pre-cs.xiaoheiban.cn'
  } else {
    url = '//platform.xiaoheiban.cn'
    webURL = '//cs.xiaoheiban.cn'
  }

  return {
    url,
    webURL
  }
}

export const baseURL = getBaseURL().url
export const baseWebURL = getBaseURL().webURL
