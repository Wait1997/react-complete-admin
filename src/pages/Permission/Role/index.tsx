/* eslint-disable react/display-name */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Divider, Tooltip, Form, Input, Select } from 'antd'
import { EyeOutlined, ToolOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import useTitle from 'Src/hooks/useTitle'
import PermissionTable, { SelectedList } from '../component/PermissionTable'

const { Option } = Select

const selectedList: SelectedList = [
  { value: 'enable', title: '启用' },
  { value: 'disable', title: '禁用' }
]

export type RoleListType = {
  key: number | string
  roleName: string
  sort: number
  desc: string
  status: 'enable' | 'disable'
}

export default function RolePermission() {
  useTitle()
  const [form] = Form.useForm()
  const [dataList, setDataList] = useState<RoleListType[]>([])
  const [visible, setVisible] = useState(false)
  const [view, setView] = useState(false)
  const [modalTitle, setModalTitle] = useState<React.ReactNode>('')
  const [roleVisible, setRoleVisible] = useState(false)
  const [tableRow, setTableRow] = useState<RoleListType | null>(null)
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [currentRole, setCurrentRole] = useState('')

  const columns = useMemo(() => {
    return [
      {
        title: '序号',
        key: 'sign',
        render: (text: RoleListType, recond: RoleListType) => recond.key
      },
      {
        title: '角色名',
        dataIndex: 'roleName'
      },
      {
        title: '描述',
        dataIndex: 'desc'
      },
      {
        title: '排序',
        dataIndex: 'sort'
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: (text: string) => {
          return (
            <span style={{ color: text === 'enable' ? '#1890ff' : '#ff4d4f' }}>
              {text === 'enable' ? '启用' : '禁用'}
            </span>
          )
        }
      },
      {
        title: '操作',
        key: 'action',
        render: (text: RoleListType, recond: RoleListType) => {
          return (
            <>
              <Tooltip title='查看'>
                <EyeOutlined
                  style={{ color: '#00a854' }}
                  onClick={() => {
                    setModalTitle('查看')
                    setView(true)
                    setTableRow(recond)
                    setVisible(true)
                  }}
                />
              </Tooltip>
              <Divider type='vertical' />
              <Tooltip title='修改'>
                <ToolOutlined
                  style={{ color: '#1890ff' }}
                  onClick={() => {
                    setModalTitle('修改')
                    setView(false)
                    setTableRow(recond)
                    setVisible(true)
                  }}
                />
              </Tooltip>
              <Divider type='vertical' />
              <Tooltip title='分配角色'>
                <EditOutlined
                  style={{ color: '#1890ff' }}
                  onClick={() => {
                    setRoleVisible(true)
                    if (typeof recond.key === 'string') {
                      setCurrentRole(recond.key)
                    }
                  }}
                />
              </Tooltip>
              <Divider type='vertical' />
              <Tooltip title='删除'>
                <DeleteOutlined
                  style={{ color: '#ff4d4f' }}
                  onClick={() => {
                    setDataList(dataList.filter((item) => item.key !== recond.key))
                  }}
                />
              </Tooltip>
            </>
          )
        }
      }
    ]
  }, [dataList])

  useEffect(() => {
    setDataList([
      {
        key: 'admin',
        roleName: '管理员',
        desc: '管理员拥有全部权限',
        sort: 1,
        status: 'enable'
      },
      {
        key: 'user',
        roleName: '普通用户',
        desc: '普通用户拥有部分权限',
        sort: 2,
        status: 'disable'
      }
    ])
  }, [])

  useEffect(() => {
    if (tableRow) {
      form.setFieldsValue({
        roleName: tableRow.roleName,
        desc: tableRow.desc,
        sort: tableRow.sort,
        status: tableRow.status
      })
    }
    return () => {
      form.resetFields()
    }
  }, [tableRow, form])

  const onOk = useCallback(async () => {
    const values = await form.validateFields()
    // eslint-disable-next-line no-console
    console.log(values)
    setVisible(false)
  }, [form])

  return (
    <PermissionTable<RoleListType>
      type='role'
      title='添加角色'
      placeholder='请输入角色名'
      visible={visible}
      roleVisible={roleVisible}
      modalTitle={modalTitle}
      columns={columns}
      dataList={dataList}
      selectedList={selectedList}
      roleTitle='分配权限'
      pageIndex={pageIndex}
      pageSize={pageSize}
      currentRole={currentRole}
      handleAdduser={() => {
        setModalTitle('添加')
        setView(false)
        setTableRow(null)
        setVisible(true)
      }}
      handleSearch={(values) => {
        // eslint-disable-next-line no-console
        console.log(values)
      }}
      onOk={() => onOk}
      onCancel={() => {
        setVisible(false)
      }}
      onRoleSubmit={(values) => {
        // eslint-disable-next-line no-console
        console.log(values)
        setRoleVisible(true)
      }}
      roleCancel={() => {
        setRoleVisible(false)
      }}
      onChange={(current, size) => {
        setPageIndex(current)
        if (size) {
          setPageSize(size)
        }
      }}>
      <Form form={form} labelCol={{ span: 4 }}>
        <Form.Item name='roleName' label='角色名' rules={[{ required: true, message: '请输入角色名' }]}>
          <Input disabled={view} placeholder='请输入用户名' />
        </Form.Item>
        <Form.Item name='desc' label='描述'>
          <Input.TextArea disabled={view} placeholder='说点什么...' autoSize />
        </Form.Item>
        <Form.Item
          name='sort'
          label='排序'
          rules={[
            { required: true, message: '顺序是多少' },
            { type: 'number', message: '排序为数字类型' }
          ]}>
          <Input type='number' disabled={view} placeholder='请输入用户名' />
        </Form.Item>
        <Form.Item name='status' label='状态' rules={[{ required: true, message: '请选择状态' }]}>
          <Select disabled={view} placeholder='请选择'>
            {selectedList.map((item) => (
              <Option key={item.value} value={item.value}>
                {item.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </PermissionTable>
  )
}
