import { useLocation } from 'react-router-dom'

export function useActiveKey(): [string, string[]] {
  const { pathname } = useLocation()
  const pathList = pathname.split('/').filter(Boolean)

  const defaultActiveKey = pathList[pathList.length - 1]

  return [defaultActiveKey, pathList]
}
