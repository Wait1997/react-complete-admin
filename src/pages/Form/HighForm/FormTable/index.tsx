import React, { useCallback, useMemo, useState } from 'react'
import { Table, Button, Typography, Space, Popconfirm, Input, Form, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { TablePaginationConfig } from 'antd/es/table/interface'
import './index.less'
import { ColumnsType } from 'antd/lib/table'
import { SizeType } from 'antd/es/config-provider/SizeContext'

export interface EditTableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  record: TableDataType
  dataIndex: string
  title: string
  children: React.ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EditTableCell: React.FC<EditTableCellProps> = ({ editing, record, title, dataIndex, children, ...rest }) => {
  return (
    <td {...rest}>
      {editing ? (
        <Form.Item name={dataIndex} rules={[{ required: true, message: `请输入${title}` }]} style={{ marginBottom: 0 }}>
          <Input placeholder='请输入' />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

export interface TableDataType {
  key: string | number
  name: string
  worknum: string
  department: string
}
export interface FormTableProp {
  size?: SizeType
  bordered?: boolean
  tablePaginationConfig?: TablePaginationConfig
  tableData: TableDataType[]
  callbackData: (values: TableDataType[]) => void
}

export default function FormTable({
  size = 'large',
  bordered = false,
  tablePaginationConfig,
  callbackData,
  tableData = []
}: FormTableProp) {
  const [form] = Form.useForm()
  const [editKey, setEditKey] = useState<number | string>(-1)

  const isEditing = useCallback((record: TableDataType) => record.key === editKey, [editKey])

  const save = useCallback(
    async (record: TableDataType) => {
      try {
        const row = await form.validateFields()
        callbackData(
          tableData.map((item) => {
            if (item.key === record.key) {
              return {
                ...item,
                ...row
              }
            }
            return { ...item }
          })
        )
        setEditKey(-1)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    },
    [tableData, form, callbackData]
  )

  const columns = useMemo(() => {
    return [
      {
        title: '成员姓名',
        key: 'name',
        dataIndex: 'name',
        editable: true
      },
      {
        title: '工号',
        key: 'worknum',
        dataIndex: 'worknum',
        editable: true
      },
      {
        title: '所属部门',
        key: 'department',
        dataIndex: 'department',
        editable: true
      },
      {
        title: '操作',
        key: 'action',
        render: (text: TableDataType, record: TableDataType) => {
          const editTable = isEditing(record)
          return editTable ? (
            <Space>
              <span
                className='action'
                onClick={() => {
                  save(record)
                }}>
                保存
              </span>
              <Popconfirm
                title='删除此行'
                onConfirm={() => {
                  callbackData(tableData.filter((item) => item.key !== record.key))
                  setEditKey(-1)
                }}>
                <span className='action'>删除</span>
              </Popconfirm>
              <span
                className='action'
                onClick={() => {
                  setEditKey(-1)
                }}>
                取消
              </span>
            </Space>
          ) : (
            <Typography.Link
              disabled={editKey !== -1}
              onClick={() => {
                form.setFieldsValue({
                  name: record.name,
                  worknum: record.worknum,
                  department: record.department
                })
                setEditKey(record.key)
              }}>
              <span>编辑</span>
            </Typography.Link>
          )
        }
      }
    ]
  }, [isEditing, save, callbackData, tableData, form, editKey])

  const mergedColumns = useMemo(() => {
    return columns.map((col) => {
      if (!col.editable) {
        return col
      }
      return {
        ...col,
        onCell: (record: TableDataType) => ({
          record,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record)
        })
      }
    })
  }, [columns, isEditing])

  return (
    <>
      <Form form={form} component={false}>
        <Table
          size={size}
          bordered={bordered}
          columns={mergedColumns as ColumnsType<any>}
          dataSource={tableData}
          scroll={{ x: 992 }}
          pagination={tablePaginationConfig ?? false}
          components={{
            body: {
              cell: EditTableCell
            }
          }}
        />
      </Form>
      <Button
        type='dashed'
        icon={<PlusOutlined />}
        className='table-button-wrap'
        onClick={() => {
          if (editKey >= 0) {
            message.warning('只能同时编辑一行')
            return
          }
          const { key } = tableData[tableData.length - 1]
          tableData.push({
            key: (key as number) + 1,
            name: '',
            worknum: '',
            department: ''
          })
          callbackData([...tableData])
          setEditKey((key as number) + 1)
        }}>
        添加一行数据
      </Button>
    </>
  )
}
