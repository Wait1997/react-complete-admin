import React, { memo } from 'react'
import { Alert, Descriptions, Form, Input, Divider, Button, Space } from 'antd'
import './index.less'

export type TableType = {
  key: string
  label: string
  content: React.ReactNode
}

export interface SecondStepProps {
  descList: TableType[]
  message: React.ReactNode
  previousStep: () => void
  nextStep: (values: any) => void
}

export default memo(function SecondStep({ message, descList, previousStep, nextStep }: SecondStepProps) {
  return (
    <div className='second-step-wrap'>
      <Form className='form-wrap' onFinish={nextStep}>
        <Alert className='second-alert' message={message} type='info' showIcon closable />
        <Descriptions column={1} bordered>
          {descList.map((item) => (
            <Descriptions.Item key={item.key} label={item.label}>
              {item.content}
            </Descriptions.Item>
          ))}
        </Descriptions>
        <Divider style={{ margin: '24px 0' }} />
        <Form.Item
          className='form-item'
          name='password'
          label='支付密码'
          labelAlign='left'
          colon={false}
          rules={[{ required: true, message: '需要支付密码才能进行支付' }]}>
          <Input placeholder='请输入支付密码' type='password' />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' onClick={previousStep}>
              上一步
            </Button>
            <Button type='primary' htmlType='submit'>
              下一步
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
})
