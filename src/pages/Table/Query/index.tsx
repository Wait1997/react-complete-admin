import React, { useEffect, useState, useMemo } from 'react'
import { apiPostTableInfo, TableQeqProps, apiPostModifyTable } from 'Api/table'
import moment from 'moment'
import { message } from 'antd'
import useTitle from 'Src/hooks/useTitle'
import ProTable, { DataListType, Status } from '../component/ProTable'
import ProForm from '../component/ProForm'

export default function QueryTable() {
  useTitle()
  const [total, setTotal] = useState(0)
  const [dataList, setDataList] = useState<DataListType[]>([])
  const [queryQeq, setQueryReq] = useState<TableQeqProps>({
    name: '',
    desc: '',
    serveCount: 0,
    status: undefined,
    serveTime: undefined,
    pageSize: 10,
    pageIndex: 1
  })

  const handleQuery = (values: any) => {
    setQueryReq({
      ...queryQeq,
      name: values.name,
      desc: values.desc,
      serveCount: values.serveCount,
      status: values.status,
      serveTime: values.serveTime
    })
  }

  const queryTableInfo = (query: TableQeqProps) => {
    const params = {
      pageIndex: query.pageIndex,
      pageSize: query.pageSize,
      name: query.name,
      desc: query.desc,
      serveCount: query.serveCount,
      status: query.status,
      serveTime: query.serveTime
    }
    apiPostTableInfo(params).then((res) => {
      const { code, data } = res
      if (code === 200) {
        const { list, count } = data
        setTotal(count)
        setDataList(
          list.map((item) => ({
            ...item,
            serveTime: moment(item.serveTime).format('YYYY-MM-DD'),
            editDesc: false // 默认情况下不可编辑
          }))
        )
      }
    })
  }

  useEffect(() => {
    queryTableInfo(queryQeq)
  }, [queryQeq])

  const statusList = useMemo<Array<{ value: Status; title: string }>>(() => {
    return [
      {
        value: 'success',
        title: '成功上线'
      },
      {
        value: 'running',
        title: '运行中'
      },
      {
        value: 'close',
        title: '关闭'
      },
      {
        value: 'error',
        title: '异常'
      }
    ]
  }, [])

  return (
    <>
      <ProForm statusList={statusList} count={2} handleQuery={handleQuery} isExpand />
      <ProTable
        statusList={statusList}
        datalist={dataList}
        total={total}
        pageIndex={queryQeq.pageIndex}
        pageSize={queryQeq.pageSize}
        callbackTableData={(values) => {
          setDataList(values)
        }}
        handleRefresh={() => {
          setQueryReq({
            ...queryQeq,
            pageIndex: 1,
            pageSize: 10
          })
        }}
        handleSubmit={(values) => {
          apiPostModifyTable(values).then((res) => {
            message.success(res.message)
            queryTableInfo(queryQeq)
          })
        }}
        onChange={(pageIndex: number, pageSize: number) => {
          setQueryReq({
            ...queryQeq,
            pageIndex,
            pageSize
          })
        }}
      />
    </>
  )
}
