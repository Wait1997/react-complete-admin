import React from 'react'
import { Tooltip, Popover } from 'antd'
import './index.less'

export default function Setting({
  children,
  title,
  content
}: React.PropsWithChildren<{ title: React.ReactNode; content: React.ReactNode }>) {
  return (
    <Tooltip title='设置'>
      <Popover placement='bottomRight' title={title} trigger='click' content={content}>
        {children}
      </Popover>
    </Tooltip>
  )
}
