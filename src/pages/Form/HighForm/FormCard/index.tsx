import React from 'react'
import { Card } from 'antd'
import cn from 'classnames'

export interface FormCardProp {
  children?: React.ReactNode
  title: React.ReactNode
  className?: string
}
export default function FormCard({ children, title, className }: FormCardProp) {
  return (
    <Card title={title} bordered={false} className={cn(className)}>
      {children}
    </Card>
  )
}
