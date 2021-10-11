/* eslint-disable react/display-name */
import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react'
import { Divider, Tooltip, Form, Input, Select } from 'antd'
import { EyeOutlined, ToolOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import useTitle from 'Src/hooks/useTitle'
import useDataPermission from 'Src/hooks/useDataPermission'
import { useSelector } from 'react-redux'
import { CheckboxValueType } from 'antd/es/checkbox/Group'
import PermissionTable, { SelectedList } from '../component/PermissionTable'

const { Option } = Select

const selectedList: SelectedList = [
  { value: 'enable', title: '启用' },
  { value: 'disable', title: '禁用' }
]
export interface FormValueType {
  username: string
  password: string
  phone?: string
  emial?: string
  desc?: string
  status: 'enable' | 'disable'
}

export type DataListType = {
  key: number
  user: string
  phone: string
  email: string
  desc: string
  status: 'enable' | 'disable'
}

export default function User() {
  useTitle()
  const [form] = Form.useForm()
  const role = useSelector((state: any) => state.user.role)
  const dataPermission = useDataPermission()
  const [modalTitle, setModalTitle] = useState<React.ReactNode>('')
  const [tableRow, setTableRow] = useState<DataListType | null>(null)
  const defaultCheckedValue = useRef<CheckboxValueType[]>([])
  const [view, setView] = useState(false)
  const [visible, setVisible] = useState(false)
  const [roleVisible, setRoleVisible] = useState(false)
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [dataList, setDataList] = useState<DataListType[]>([])

  const columns = useMemo(() => {
    return [
      {
        title: '序号',
        key: 'sign',
        fixed: 'left' as any,
        render: (text: DataListType, recond: DataListType) => recond.key
      },
      {
        title: '用户名',
        dataIndex: 'user'
      },
      {
        title: '联系方式',
        dataIndex: 'phone'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '描述',
        dataIndex: 'desc'
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
        render: (text: DataListType, recond: DataListType) => {
          return (
            <>
              {dataPermission.includes('view') && (
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
                </>
              )}
              {dataPermission.includes('modify') && (
                <>
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
                </>
              )}
              {dataPermission.includes('deal') && (
                <>
                  <Tooltip title='分配角色'>
                    <EditOutlined
                      style={{ color: '#1890ff' }}
                      onClick={() => {
                        setRoleVisible(true)
                        if (recond.user === 'admin') {
                          defaultCheckedValue.current = ['admin', 'user']
                        }
                        if (recond.user === 'user') {
                          defaultCheckedValue.current = ['user']
                        }
                      }}
                    />
                  </Tooltip>
                  <Divider type='vertical' />
                </>
              )}
              {dataPermission.includes('delete') && !role.includes(recond.user) && (
                <Tooltip title='删除'>
                  <DeleteOutlined
                    style={{ color: '#ff4d4f' }}
                    onClick={() => {
                      setDataList(dataList.filter((item) => item.key !== recond.key))
                    }}
                  />
                </Tooltip>
              )}
            </>
          )
        }
      }
    ]
  }, [dataPermission, role, dataList, defaultCheckedValue])

  useEffect(() => {
    setDataList([
      {
        key: 1,
        user: 'admin',
        phone: '15000558443',
        email: '1433193222@qq.com',
        desc: '管理员',
        status: 'enable'
      },
      {
        key: 2,
        user: 'user',
        phone: '13978230124',
        email: '1433193222@qq.com',
        desc: '普通用户',
        status: 'disable'
      },
      {
        key: 3,
        user: 'user',
        phone: '18815610633',
        email: '171371923@qq.com',
        desc: '普通用户',
        status: 'enable'
      },
      {
        key: 4,
        user: 'user',
        phone: '15000000000',
        email: '1433193222@qq.com',
        desc: '普通用户',
        status: 'disable'
      }
    ])
  }, [])

  useEffect(() => {
    if (tableRow) {
      form.setFieldsValue({
        ...tableRow,
        password: '123456'
      })
    }
    return () => {
      form.resetFields()
    }
  }, [form, tableRow])

  const onOk = useCallback(async () => {
    try {
      const values: FormValueType = await form.validateFields()
      // eslint-disable-next-line no-console
      console.log(values)
      setVisible(false)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }, [form])

  return (
    <PermissionTable<DataListType>
      type='user'
      title='添加用户'
      visible={visible}
      placeholder='请输入用户名'
      columns={columns}
      dataList={dataList}
      selectedList={selectedList}
      modalTitle={modalTitle}
      onOk={onOk}
      pageIndex={pageIndex}
      pageSize={pageSize}
      roleTitle='分配角色'
      roleVisible={roleVisible}
      defaultCheckedValue={defaultCheckedValue.current}
      onChange={(current, size) => {
        setPageIndex(current)
        if (size) {
          setPageSize(size)
        }
      }}
      handleAdduser={() => {
        setModalTitle('新增')
        setView(false)
        setTableRow(null)
        setVisible(true)
      }}
      handleSearch={(values) => {
        // eslint-disable-next-line no-console
        console.log(values)
      }}
      onCancel={() => {
        setVisible(false)
      }}
      onRoleSubmit={(values) => {
        // eslint-disable-next-line no-console
        console.log(values)
        setRoleVisible(false)
      }}
      roleCancel={() => {
        setRoleVisible(false)
      }}>
      <Form form={form} labelCol={{ span: 4 }}>
        <Form.Item name='user' label='用户名' rules={[{ required: true, message: '请输入用户名' }]}>
          <Input disabled={view} placeholder='请输入用户名' />
        </Form.Item>
        <Form.Item
          name='password'
          label='密码'
          rules={[
            { required: true, message: '请输入密码' },
            { min: 4, message: '最小为4' },
            { max: 8, message: '最大为8' }
          ]}>
          <Input disabled={view} placeholder='请输入密码' type='password' />
        </Form.Item>
        <Form.Item name='phone' label='手机号'>
          <Input disabled={view} placeholder='请输入手机号' />
        </Form.Item>
        <Form.Item name='email' label='邮箱'>
          <Input disabled={view} placeholder='请输入邮箱' />
        </Form.Item>
        <Form.Item name='desc' label='描述'>
          <Input.TextArea disabled={view} placeholder='说点什么...' autoSize />
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
