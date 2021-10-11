import React from 'react'
import { Card as AntdCard } from 'antd'
import cn from 'classnames'
import './index.less'

type TotalType = () => React.ReactNode

export interface CardProps {
  loading: boolean
  title: string
  total?: number | TotalType | React.ReactNode
  className?: string
  action?: React.ReactNode
  footer?: React.ReactNode
  contentHeight: number
}

export default function ChartCard({
  children,
  title,
  total,
  className,
  footer,
  action,
  contentHeight: height,
  ...rest
}: React.PropsWithChildren<CardProps>) {
  return (
    <AntdCard className={cn(className)} bodyStyle={{ padding: '20px 24px 8px 24px' }} {...rest}>
      <div>
        <div className='card-title'>
          <span>{title}</span>
          {action}
        </div>
        <div className='card-count'>{total}</div>
      </div>
      {children && (
        <div className='card-content' style={{ height }}>
          {children}
        </div>
      )}
      {footer && <div>{footer}</div>}
    </AntdCard>
  )
}
