import React from 'react'
import { Form, Row, Col, Input, Select, DatePicker } from 'antd'
import { Option as SelectOption } from '../index'
import './index.less'

const { Option } = Select
const { RangePicker } = DatePicker

const formColResponsiveProps = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 8
}

export interface FormItemProps {
  fieldLabels: Record<string, string>
  adminLists: SelectOption[]
  reviewLists: SelectOption[]
  onCapsuleAdminOpen: (open: boolean) => void
  onReviewPersonOpen: (open: boolean) => void
}

export default function FormTopItem({
  fieldLabels,
  adminLists,
  reviewLists,
  onCapsuleAdminOpen,
  onReviewPersonOpen
}: FormItemProps) {
  return (
    <Row gutter={16}>
      <Col {...formColResponsiveProps}>
        <Form.Item
          name='capsuleName'
          label={fieldLabels.capsuleName}
          labelAlign='left'
          className='form-item'
          colon={false}
          rules={[{ required: true, message: '请输入仓库名' }]}>
          <Input placeholder='请输入' />
        </Form.Item>
      </Col>
      <Col {...formColResponsiveProps}>
        <Form.Item
          name='capsuleDomain'
          labelAlign='left'
          label={fieldLabels.capsuleDomain}
          className='form-item'
          colon={false}
          rules={[{ required: true, message: '请输入仓库域名' }]}>
          <Input addonBefore='http://' addonAfter='.com' placeholder='请输入' />
        </Form.Item>
      </Col>
      <Col {...formColResponsiveProps}>
        <Form.Item
          name='capsuleAdmin'
          labelAlign='left'
          label={fieldLabels.capsuleAdmin}
          className='form-item'
          colon={false}
          rules={[{ required: true, message: '请选择仓库管理员' }]}>
          <Select placeholder='请选择' onDropdownVisibleChange={onCapsuleAdminOpen}>
            {adminLists.map((item) => (
              <Option key={item.value} value={item.value}>
                {item.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col {...formColResponsiveProps}>
        <Form.Item
          name='reviewPerson'
          labelAlign='left'
          label={fieldLabels.reviewPerson}
          className='form-item'
          colon={false}
          rules={[{ required: true, message: '请选择审批人' }]}>
          <Select placeholder='请选择' onDropdownVisibleChange={onReviewPersonOpen}>
            {reviewLists.map((item) => (
              <Option key={item.value} value={item.value}>
                {item.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col {...formColResponsiveProps}>
        <Form.Item
          name='effectiveDate'
          labelAlign='left'
          label={fieldLabels.effectiveDate}
          className='form-item'
          colon={false}
          rules={[{ required: true, message: '请选择生效日期' }]}>
          <RangePicker style={{ width: '100%' }} />
        </Form.Item>
      </Col>
      <Col {...formColResponsiveProps}>
        <Form.Item
          name='capsuleType'
          labelAlign='left'
          label={fieldLabels.capsuleType}
          className='form-item'
          colon={false}
          rules={[{ required: true, message: '请选择仓库类型' }]}>
          <Select placeholder='请选择'>
            <Option value='private'>私密</Option>
            <Option value='public'>公开</Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>
  )
}
