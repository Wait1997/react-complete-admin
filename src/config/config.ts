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
    url = `${protocol}//${hostname}:${port}`
    webURL = `${protocol}//${hostname}:${port}`
  } else if (isDev) {
    url = ''
    webURL = ''
  } else if (isPre) {
    url = ''
    webURL = ''
  } else {
    url = ''
    webURL = ''
  }

  return {
    url,
    webURL
  }
}

export const baseURL = getBaseURL().url
export const baseWebURL = getBaseURL().webURL
