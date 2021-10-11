/* eslint-disable react/display-name */
import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { Button, Space, Table, Tooltip, Form, Input, Badge, Popconfirm } from 'antd'
import { apiPostTableInfo } from 'Api/table'
import { InfoCircleOutlined } from '@ant-design/icons'
import './index.less'

export type Status = 'error' | 'success' | 'close' | 'running'
export interface DataListType {
  key: number
  name: string
  desc: string
  serveCount: string
  status: Status
  serveTime: string
  editDesc?: boolean
}

export default function StandardTable() {
  const [form] = Form.useForm()
  const inputEl = useRef<Input | null>(null)
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [count, setCount] = useState(0)
  const [dataList, setDataList] = useState<DataListType[]>([])

  const toggleEdit = useCallback(
    (recond: DataListType) => {
      const tableData = dataList.map((item) => (item.key === recond.key ? { ...item, editDesc: true } : item))
      setDataList(tableData)
      form.setFieldsValue({ desc: recond.desc })
    },
    [form, dataList]
  )

  const save = useCallback(
    async (recond: DataListType) => {
      try {
        const values = await form.validateFields()
        const tableData = dataList.map((item) =>
          item.key === recond.key ? { ...item, desc: values.desc, editDesc: false } : item
        )
        setDataList(tableData)
      } catch (error) {
        throw new Error(error as string)
      }
    },
    [form, dataList]
  )

  const columns = useMemo(() => {
    return [
      {
        title: (
          <Space>
            <span>规则名称</span>
            <Tooltip title='规则名称是唯一的key'>
              <InfoCircleOutlined />
            </Tooltip>
          </Space>
        ),
        key: 'name',
        dataIndex: 'name'
      },
      {
        title: '描述',
        key: 'desc',
        dataIndex: 'desc',
        width: 240,
        filters: [
          { text: '描述0', value: '0' },
          { text: '描述1', value: '1' }
        ],
        onFilter: (value: string, recond: DataListType) => recond.desc.includes(value),
        render: (text: React.ReactNode, recond: DataListType) => {
          const childNode = recond?.editDesc ? (
            <Form form={form}>
              <Form.Item name='desc' style={{ marginBottom: 0 }}>
                <Input
                  ref={inputEl}
                  onBlur={() => {
                    save(recond)
                  }}
                  onPressEnter={() => {
                    save(recond)
                  }}
                  placeholder='请输入'
                />
              </Form.Item>
            </Form>
          ) : (
            <div onClick={() => toggleEdit(recond)}>{text}</div>
          )
          return childNode
        }
      },
      {
        title: '服务调用次数',
        key: 'serveCount',
        dataIndex: 'serveCount',
        sorter: true
      },
      {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        render: (text: Status) => {
          let statusEl: React.ReactNode
          switch (text) {
            case 'success':
              statusEl = <Badge color='green' text='成功上线' />
              break
            case 'running':
              statusEl = <Badge color='cyan' text='运行中' />
              break
            case 'close':
              statusEl = <Badge color='volcano' text='关闭' />
              break
            default:
              statusEl = <Badge color='red' text='异常' />
          }
          return statusEl
        }
      },
      {
        title: '上次调用时间',
        key: 'serveTime',
        dataIndex: 'serveTime'
      },
      {
        title: '操作',
        key: 'action',
        render: (text: DataListType, recond: DataListType) => {
          return (
            <Popconfirm
              title='确定要删除'
              onConfirm={() => {
                setDataList(dataList.filter((item) => item.key !== recond.key))
              }}>
              <span
                className='action'
                onClick={() => {
                  // eslint-disable-next-line no-console
                  console.log(recond)
                }}>
                删除
              </span>
            </Popconfirm>
          )
        }
      }
    ]
  }, [form, dataList, save, toggleEdit])

  useEffect(() => {
    apiPostTableInfo({
      pageIndex,
      pageSize
    })
      .then((res) => {
        const { code, data } = res
        if (code === 200) {
          const { list } = data
          setCount(data.count)
          setDataList(
            list.map((item) => ({
              ...item,
              editDesc: false
            }))
          )
        }
      })
      .catch((error) => {
        throw new Error(error)
      })
  }, [pageSize, pageIndex])

  useEffect(() => {
    for (const item of dataList) {
      if (item.editDesc && inputEl.current) {
        inputEl.current?.focus()
      }
    }
  }, [dataList])

  return (
    <div className='standard-table-wrap'>
      <div className='standard-head'>
        <span className='standard-title'>可编辑的单元格</span>
        <Button type='primary'>添加</Button>
      </div>
      <Table
        bordered
        columns={columns as any}
        dataSource={dataList}
        pagination={{
          total: count,
          current: pageIndex,
          pageSize,
          onChange: (currentPage, currentPageSize) => {
            setPageIndex(currentPage)
            if (currentPageSize) {
              setPageSize(currentPageSize)
            }
          }
        }}
      />
    </div>
  )
}
