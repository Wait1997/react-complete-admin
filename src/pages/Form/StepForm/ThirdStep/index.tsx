import React, { memo } from 'react'
import { Result } from 'antd'

export interface ThirdProps {
  title: React.ReactNode
  subTitle: React.ReactNode
  extra: React.ReactNode
  children?: React.ReactNode
}

export default memo(function ThirdStep({ title, subTitle, extra, children }: ThirdProps) {
  return (
    <div className='third-step-wrap'>
      <Result status='success' title={title} subTitle={subTitle} extra={extra}>
        {children}
      </Result>
    </div>
  )
})
