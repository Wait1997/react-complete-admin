import React from 'react'
import { Spin } from 'antd'
import cn from 'classnames'
import './index.less'

export default function Loading({
  size = 'default',
  className,
  wrapperClassName
}: {
  className?: string
  wrapperClassName?: string
  size?: 'small' | 'default' | 'large'
}) {
  return (
    <div className={cn('loading-wrap', className)}>
      <Spin size={size} wrapperClassName={wrapperClassName} />
    </div>
  )
}
