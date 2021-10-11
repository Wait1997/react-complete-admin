import React from 'react'
import { Form, Input, Select, Row, Col, Button } from 'antd'
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons'
import useDataPermission from 'Src/hooks/useDataPermission'
import './index.less'

const { Option } = Select

export interface PermissionFormProps {
  title: string
  placeholder?: string
  selectedList: Array<{ value: string; title: string }>
  handleAdduser: (value: string) => void
  handleSearch: (values: any) => void
}

export default function PermissionForm({
  title,
  placeholder = '请输入',
  selectedList,
  handleAdduser,
  handleSearch
}: PermissionFormProps) {
  const [form] = Form.useForm()
  const dataPermission = useDataPermission()

  return (
    <div className='permission-form'>
      <Form
        form={form}
        onFinish={(values) => {
          handleSearch(values)
        }}>
        <Row gutter={12}>
          <Col span={3}>
            <Button
              type='primary'
              disabled={!dataPermission.includes('add')}
              icon={<PlusCircleOutlined />}
              onClick={() => {
                handleAdduser('add')
              }}>
              {title}
            </Button>
          </Col>
          <Col span={4}>
            <Form.Item style={{ marginBottom: 0 }} name='userName'>
              <Input placeholder={placeholder} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item style={{ marginBottom: 0 }} name='userStatus'>
              <Select placeholder='请选择'>
                {selectedList.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item style={{ marginBottom: 0 }}>
              <Button htmlType='submit' type='primary' icon={<SearchOutlined />}>
                搜索
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
