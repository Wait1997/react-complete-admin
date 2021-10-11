import React from 'react'
import { Form, Row, Col, Input, Select, DatePicker } from 'antd'
import { Option as SelectOption } from '../index'
import './index.less'

const { Option } = Select
const { TimePicker } = DatePicker

const formColResponsiveProps = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 8
}

export interface FormItemProps {
  fieldLabels: Record<string, string>
  executorLists: SelectOption[]
  responseLists: SelectOption[]
  onExectorOpen: (open: boolean) => void
  onResonseOpen: (open: boolean) => void
}

export default function FormBottomItem({
  fieldLabels,
  executorLists,
  responseLists,
  onExectorOpen,
  onResonseOpen
}: FormItemProps) {
  return (
    <Row gutter={16}>
      <Col {...formColResponsiveProps}>
        <Form.Item
          name='taskName'
          label={fieldLabels.taskName}
          labelAlign='left'
          className='form-item'
          colon={false}
          rules={[{ required: true, message: '请输入任务名' }]}>
          <Input placeholder='请输入' />
        </Form.Item>
      </Col>
      <Col {...formColResponsiveProps}>
        <Form.Item
          name='taskDesc'
          labelAlign='left'
          label={fieldLabels.taskDesc}
          className='form-item'
          colon={false}
          rules={[{ required: true, message: '请输入任务描述' }]}>
          <Input placeholder='请输入' />
        </Form.Item>
      </Col>
      <Col {...formColResponsiveProps}>
        <Form.Item
          name='executor'
          labelAlign='left'
          label={fieldLabels.executor}
          className='form-item'
          colon={false}
          rules={[
            {
              required: true,
              message: '请选择执行人'
            }
          ]}>
          <Select placeholder='请选择' onDropdownVisibleChange={onExectorOpen}>
            {executorLists.map((item) => (
              <Option key={item.value} value={item.value}>
                {item.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col {...formColResponsiveProps}>
        <Form.Item
          name='responsible'
          labelAlign='left'
          label={fieldLabels.responsible}
          className='form-item'
          colon={false}
          rules={[{ required: true, message: '请选择责任人' }]}>
          <Select placeholder='请选择' onDropdownVisibleChange={onResonseOpen}>
            {responseLists.map((item) => (
              <Option key={item.value} value={item.value}>
                {item.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col {...formColResponsiveProps}>
        <Form.Item
          name='effectiveTime'
          labelAlign='left'
          label={fieldLabels.effectiveTime}
          className='form-item'
          colon={false}
          rules={[{ required: true, message: '请选择有效日期' }]}>
          <TimePicker style={{ width: '100%' }} />
        </Form.Item>
      </Col>
      <Col {...formColResponsiveProps}>
        <Form.Item
          name='taskType'
          labelAlign='left'
          label={fieldLabels.taskType}
          className='form-item'
          colon={false}
          rules={[{ required: true, message: '请选择任务类型' }]}>
          <Select placeholder='请选择'>
            <Option value='private'>私密</Option>
            <Option value='public'>公开</Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>
  )
}
