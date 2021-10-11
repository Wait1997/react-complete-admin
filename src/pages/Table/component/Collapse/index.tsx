import React from 'react'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import './index.less'

export default function Collapse({
  expand,
  handleCollapse
}: {
  expand: boolean
  handleCollapse: (value: boolean) => void
}) {
  return (
    <div
      className='collapse-wrap'
      onClick={() => {
        handleCollapse(!expand)
      }}>
      <span className='collapse-text'>{expand ? '收起' : '展开'}</span>
      {expand ? <UpOutlined /> : <DownOutlined />}
    </div>
  )
}
