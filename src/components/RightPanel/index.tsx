import React, { useState } from 'react'
import { Drawer } from 'antd'
import { SettingOutlined, CloseOutlined } from '@ant-design/icons'
import './index.less'

export interface RightPanelProps {
  title?: React.ReactNode
  width?: number
}

export default function RightPanel({ title = null, width = 300 }: RightPanelProps) {
  const [open, setOpen] = useState(false)

  return (
    <Drawer
      style={{ width: 'auto' }}
      contentWrapperStyle={{ width, transform: open ? 'translateX(0)' : 'translateX(100%)' }}
      title={title}
      handler={
        <div
          className='extra-setting'
          onClick={() => {
            setOpen(!open)
          }}>
          {open ? <CloseOutlined className='setting-icon' /> : <SettingOutlined className='setting-icon' />}
        </div>
      }
      mask={false}
      visible
      closable>
      <span>设置样式风格</span>
    </Drawer>
  )
}
