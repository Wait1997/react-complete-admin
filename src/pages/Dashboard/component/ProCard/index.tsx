import React, { memo } from 'react'
import { Card } from 'antd'
import cn from 'classnames'

export interface ProCardProps {
  loading: boolean
  bodyStyle?: React.CSSProperties
  size?: 'default' | 'small'
  title?: string
  bordered?: boolean
  hoverable?: boolean
  activeTabKey?: string
  tabList?: Array<{ key: string; tab: React.ReactNode }>
  tabBarExtraContent?: React.ReactNode
  extra?: React.ReactNode
  actions?: React.ReactNode[]
  onTabChange?: (key: string) => void
  children?: React.ReactNode
  className?: string
}

export default memo(function ProCard({
  loading,
  activeTabKey,
  tabList,
  tabBarExtraContent,
  size = 'default',
  onTabChange,
  hoverable = false,
  bordered = true,
  children,
  bodyStyle,
  className,
  ...rest
}: ProCardProps) {
  return (
    <Card
      loading={loading}
      size={size}
      tabBarExtraContent={tabBarExtraContent}
      activeTabKey={activeTabKey}
      tabList={tabList}
      onTabChange={onTabChange}
      hoverable={hoverable}
      bordered={bordered}
      bodyStyle={bodyStyle ?? { padding: 0 }}
      {...rest}>
      <div className={cn(className)}>{children}</div>
    </Card>
  )
})
