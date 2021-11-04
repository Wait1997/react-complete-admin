import React, { memo } from 'react'
import { Row, Col, Tag } from 'antd'
import './index.less'

const { CheckableTag } = Tag

const LabelTitle = memo(
  function LabelTitle({ title, className }: { title: string; className?: string }) {
    return (
      <div className={className}>
        <span className='title'>{title}</span>
      </div>
    )
  },
  () => true
)

export default function SearchTag() {
  return (
    <>
      <div className='search-tag-item'>
        <LabelTitle title='所属项目' className='search-item' />
        <Row gutter={16}>
          <Col>
            <CheckableTag checked>1231</CheckableTag>
          </Col>
          <Col>123</Col>
          <Col>123</Col>
          <Col>123</Col>
        </Row>
      </div>
      <div className='search-tag-item'>
        <LabelTitle title='拥有者' className='search-item' />
        <div>1231231</div>
      </div>
      <div className='search-tag-item'>
        <LabelTitle title='其他选项' className='search-item' />
        <Row>
          <Col>活跃用户</Col>
          <Col>好评度</Col>
        </Row>
      </div>
    </>
  )
}
