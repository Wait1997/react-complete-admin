/* eslint-disable no-console */
/* eslint-disable react/display-name */
import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react'
import {
  Table,
  Button,
  Space,
  Popconfirm,
  Drawer,
  Form,
  Input,
  message,
  Tooltip,
  Dropdown,
  Menu,
  Badge,
  Checkbox,
  Tree
} from 'antd'
import { EditReqProps } from 'Api/table'
import {
  RedoOutlined,
  ColumnHeightOutlined,
  SettingOutlined,
  VerticalAlignTopOutlined,
  VerticalAlignBottomOutlined,
  InfoCircleOutlined
} from '@ant-design/icons'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import Setting from '../Setting'
import Modal from '../Modal'
import TableHead from '../TableHead'
import EditModal from '../EditModal'
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
export interface TableProps {
  pageIndex: number
  pageSize: number
  total: number
  statusList: Array<{ value: Status; title: string }>
  handleRefresh: () => void
  handleSubmit: (values: EditReqProps) => void
  onChange(page: number, pageSize?: number): void
  datalist: DataListType[]
  callbackTableData: (values: DataListType[]) => void
}

export default function ProTable({
  datalist,
  pageIndex,
  pageSize,
  total,
  statusList,
  onChange,
  handleSubmit,
  handleRefresh,
  callbackTableData
}: TableProps) {
  const [form] = Form.useForm()
  const inputEl = useRef<Input | null>(null)
  const modalTitle = useRef('')
  const rowData = useRef<DataListType | undefined>()
  const [title, setTitle] = useState('')
  const [visible, setVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalSetVisible, setModalSetVisible] = useState(false)
  const [size, setSize] = useState<SizeType>('large')

  const treeData = useMemo(() => {
    return [
      {
        title: '规则名称',
        key: 'name'
      },
      {
        title: '描述',
        key: 'desc'
      },
      {
        title: '服务调用次数',
        key: 'serveCount'
      },
      {
        title: '状态',
        key: 'status'
      },
      {
        title: '上次调用时间',
        key: 'serveTime'
      },
      {
        title: '操作',
        key: 'action'
      }
    ]
  }, [])
  const [selectedKeys, setSelectKeys] = useState<Array<number | string>>(treeData.map((item) => item.key))
  const [indeterminate, setIndeterminate] = useState(false)
  const [selectAll, setSelectedAll] = useState(true)

  const openDrawer = (recond: DataListType) => {
    setTitle(recond.name)
    setVisible(true)
  }

  const toggleEdit = useCallback(
    (recond: DataListType) => {
      const tableData = datalist.map((item) => (item.key === recond.key ? { ...item, editDesc: true } : item))
      callbackTableData(tableData)
      form.setFieldsValue({ desc: recond.desc })
    },
    [form, datalist, callbackTableData]
  )

  const save = useCallback(
    async (recond: DataListType) => {
      try {
        const values = await form.validateFields()
        const tableData = datalist.map((item) =>
          item.key === recond.key ? { ...item, desc: values.desc, editDesc: false } : item
        )
        callbackTableData(tableData)
      } catch (error) {
        throw new Error(error as string)
      }
    },
    [form, datalist, callbackTableData]
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
        dataIndex: 'name',
        render: (text: string, recond: DataListType) => (
          <span
            className='name'
            onClick={() => {
              openDrawer(recond)
            }}>
            {text}
          </span>
        )
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
              <Form.Item name='desc' style={{ width: '100%', marginBottom: 0 }}>
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
            <div className='table-desc' onClick={() => toggleEdit(recond)}>
              {text}
            </div>
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
            <Space size='small'>
              <span
                className='action'
                onClick={() => {
                  setModalSetVisible(true)
                }}>
                配置
              </span>
              <span
                className='action'
                onClick={() => {
                  modalTitle.current = '详情'
                  rowData.current = recond
                  setModalVisible(true)
                }}>
                详情
              </span>
              <Popconfirm
                title='编辑'
                onConfirm={() => {
                  modalTitle.current = '编辑'
                  rowData.current = recond
                  setModalVisible(true)
                }}>
                <span className='action'>编辑</span>
              </Popconfirm>
            </Space>
          )
        }
      }
    ]
  }, [form, toggleEdit, save])

  const [tableColumns, setTableColumns] = useState(columns)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [selectAllRowKeys, setSelectAllRowKeys] = useState<React.Key[]>([])

  const settingTitle = useMemo(() => {
    return (
      <div className='setting-title'>
        <Checkbox
          checked={selectAll}
          indeterminate={indeterminate}
          onChange={(e: CheckboxChangeEvent) => {
            setSelectedAll(e.target.value)
            if (e.target.value) {
              setIndeterminate(false)
              setSelectKeys(treeData.map((item) => item.key))
            } else {
              setIndeterminate(true)
              setSelectKeys([])
            }
          }}>
          列展示
        </Checkbox>
        <span
          className='reset-table'
          onClick={() => {
            const keysList = treeData.map((item) => item.key)
            setSelectedAll(true)
            setIndeterminate(false)
            setSelectKeys(keysList)
          }}>
          重置
        </span>
      </div>
    )
  }, [selectAll, indeterminate, treeData])

  const selectedTreeNode = useCallback(
    (keys: any) => {
      if ((keys as any).length === treeData.length) {
        setSelectedAll(true)
        setIndeterminate(false)
      } else {
        setSelectedAll(false)
        setIndeterminate(true)
      }
      setSelectKeys(keys as any)
      setTableColumns(columns.filter((item) => keys.includes(item.key)))
    },
    [treeData.length, columns]
  )

  const settingContent = useMemo(() => {
    return (
      <Tree
        checkable
        draggable
        blockNode
        multiple
        treeData={treeData}
        checkedKeys={selectedKeys}
        selectedKeys={selectedKeys}
        onCheck={(keys) => selectedTreeNode(keys)}
        onSelect={(keys) => selectedTreeNode(keys)}
        titleRender={(dataNode) => {
          return (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
              <span>{dataNode.title}</span>
              <span className='tree-node-icon-wrap' style={{ width: 36, color: '#1890ff' }}>
                <Tooltip title='固定在列首'>
                  <VerticalAlignTopOutlined
                    style={{ width: 18 }}
                    onClick={(e: React.MouseEvent) => {
                      const column = columns.find((item) => item.key === dataNode.key)
                      const newColumn = { ...column, fixed: 'left' }
                      const newColumns = columns.filter((item) => item.key !== dataNode.key)
                      newColumns.unshift(newColumn as any)
                      setTableColumns(newColumns as any)
                      e.stopPropagation()
                    }}
                  />
                </Tooltip>
                <Tooltip title='固定在列尾'>
                  <VerticalAlignBottomOutlined
                    style={{ width: 18 }}
                    onClick={(e: React.MouseEvent) => {
                      const column = columns.find((item) => item.key === dataNode.key)
                      const newColumn = { ...column, fixed: 'right' }
                      const newColumns = columns.filter((item) => item.key !== dataNode.key)
                      newColumns.push(newColumn as any)
                      setTableColumns(newColumns as any)
                      e.stopPropagation()
                    }}
                  />
                </Tooltip>
              </span>
            </div>
          )
        }}
      />
    )
  }, [treeData, selectedKeys, columns, selectedTreeNode])

  const [settingContentEl, setSettingContentEl] = useState(settingContent)

  useEffect(() => {
    const keys = datalist.map((item) => item.key)
    setSelectedRowKeys(keys.filter((key) => selectAllRowKeys.includes(key)))
  }, [datalist, selectAllRowKeys])

  // 这里为了解决 columns 动态增减时造成后 直接编辑desc拿不到 datalist
  useEffect(() => {
    setTableColumns(columns)
  }, [columns])

  useEffect(() => {
    for (const item of datalist) {
      if (item.editDesc && inputEl.current) {
        inputEl.current?.focus()
      }
    }
  }, [datalist])

  // 改变样式的排列
  useEffect(() => {
    setSettingContentEl(settingContent)
  }, [settingContent])

  return (
    <div className='pro-table'>
      <TableHead title='查询表格'>
        <Space size='middle'>
          <Button
            type='primary'
            onClick={() => {
              setModalVisible(true)
              rowData.current = undefined
            }}>
            新建
          </Button>
          <RedoOutlined style={{ cursor: 'pointer' }} onClick={handleRefresh} />
          <Dropdown
            overlay={
              <Menu
                onClick={(values) => {
                  setSize(values.key as SizeType)
                }}
                selectedKeys={[size as string]}>
                <Menu.Item key='large'>large</Menu.Item>
                <Menu.Item key='middle'>middle</Menu.Item>
                <Menu.Item key='small'>small</Menu.Item>
              </Menu>
            }
            trigger={['click']}>
            <Tooltip title='密度'>
              <ColumnHeightOutlined style={{ cursor: 'pointer' }} />
            </Tooltip>
          </Dropdown>
          <Setting title={settingTitle} content={settingContentEl}>
            <SettingOutlined style={{ cursor: 'pointer' }} />
          </Setting>
        </Space>
      </TableHead>
      <Table
        size={size}
        rowSelection={{
          type: 'checkbox',
          columnWidth: 48,
          selectedRowKeys,
          onChange: (keys) => {
            selectAllRowKeys.push(...keys.filter((key) => !selectAllRowKeys.includes(key)))
            setSelectedRowKeys(keys)
            setSelectAllRowKeys([...selectAllRowKeys])
          },
          fixed: true
        }}
        columns={tableColumns as any}
        dataSource={datalist}
        pagination={{
          current: pageIndex,
          defaultCurrent: pageIndex,
          defaultPageSize: pageSize,
          pageSize,
          total,
          onChange
        }}
        onChange={(pagination, filters, sorter) => {
          // 用于服务器做数据排序
          console.log(pagination)
          console.log(filters)
          console.log(sorter)
        }}
        scroll={{ x: 1200 }}
      />
      <Drawer
        title={title}
        visible={visible}
        mask={false}
        onClose={() => {
          setVisible(false)
          message.success('关闭成功')
        }}
      />
      <EditModal
        width={640}
        visible={modalVisible}
        title={modalTitle.current}
        editData={rowData.current}
        statusList={statusList}
        submit={(values) => {
          handleSubmit({
            ...values,
            id: rowData.current?.key
          })
          setModalVisible(false)
        }}
        afterClose={() => {
          message.success('关闭成功')
        }}
        onClose={() => {
          setModalVisible(false)
        }}
      />
      <Modal
        title='配置'
        visible={modalSetVisible}
        onOk={() => {
          setModalSetVisible(false)
        }}
        onCancel={() => {
          setModalSetVisible(false)
        }}
        afterClose={() => {
          message.success('关闭成功')
        }}
        forceRender>
        <div>i安师大</div>
      </Modal>
    </div>
  )
}
