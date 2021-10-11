import { webapi } from 'Config/index'
import { Response } from 'Config/url'
import { Status, DataListType } from 'Pages/Table/component/ProTable'

export interface TableQeqProps {
  pageIndex: number
  pageSize: number
  name?: string
  desc?: string
  serveCount?: number
  status?: Status | undefined
  serveTime?: number | undefined
}

export interface EditReqProps {
  id?: number
  name: string
  desc: string
  serveCount: number
  status: Status
  serveTime: number
}

export const apiPostTableInfo = (params: TableQeqProps): Promise<Response<{ count: number; list: DataListType[] }>> => {
  return webapi.post('/api/query/table', params)
}

export const apiPostModifyTable = (params: EditReqProps): Promise<Response<null>> => {
  return webapi.post('/api/modify/table', params)
}
