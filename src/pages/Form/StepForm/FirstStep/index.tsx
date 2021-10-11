import React, { memo, useEffect } from 'react'
import { Form, Select, Input, InputNumber, Row, Col, Button } from 'antd'
import './index.less'

const { Option } = Select

export type FirstFormNameType = 'counter' | 'receiveCounter' | 'receiveName' | 'name' | 'money'

export type SelectOptions = {
  value: string
  title: string
}

export interface FirstStepProps {
  min?: number
  max?: number
  nextstep?: React.ReactNode
  initialValues?: Partial<Record<FirstFormNameType, string | number>>
  options: SelectOptions[]
  receiveOptions: SelectOptions[]
  submit: (values: Record<FirstFormNameType, any>) => void
}

export default memo(function FirstStep({
  min = 520,
  max = 5201314,
  nextstep = '下一步',
  options,
  receiveOptions,
  initialValues,
  submit
}: FirstStepProps) {
  const [form] = Form.useForm()

  useEffect(() => {
    if (options.length > 0) {
      form.setFieldsValue({
        counter: options[0].value
      })
    }
  }, [form, options])

  useEffect(() => {
    if (receiveOptions.length > 0) {
      form.setFieldsValue({
        receiveCounter: receiveOptions[0].value
      })
    }
  }, [form, receiveOptions])

  return (
    <div className='step-form-wrap'>
      <Form form={form} initialValues={initialValues} onFinish={submit}>
        <Form.Item
          className='form-item'
          name='counter'
          label='付款账户'
          labelAlign='left'
          colon={false}
          rules={[{ required: true, message: '请选择付款账户' }]}>
          <Select placeholder='请选择' allowClear>
            {options.map((option) => (
              <Option value={option.value} key={option.value}>
                {option.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item className='form-item' label='收款账户' labelAlign='left' colon={false} style={{ marginBottom: 0 }}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name='receiveCounter' rules={[{ required: true, message: '请选择账户' }]}>
                <Select placeholder='请选择' allowClear>
                  {receiveOptions.map((option) => (
                    <Option value={option.value} key={option.value}>
                      {option.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item name='receiveName' rules={[{ required: true, message: '请输入收款邮箱' }]}>
                <Input placeholder='请输入收款邮箱' allowClear />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item
          className='form-item'
          name='name'
          label='收款人姓名'
          labelAlign='left'
          colon={false}
          rules={[{ required: true, message: '请输入收款人姓名' }]}>
          <Input placeholder='请输入收款人姓名' allowClear />
        </Form.Item>
        <Form.Item
          className='form-item'
          name='money'
          label='转账金额'
          labelAlign='left'
          colon={false}
          rules={[{ required: true, message: '请输入转账金额' }]}>
          <InputNumber min={min} max={max} placeholder='请输入转账金额' style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            {nextstep}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
})
