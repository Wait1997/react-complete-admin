import React from 'react'
import {
  DashboardOutlined,
  LockOutlined,
  FormOutlined,
  TableOutlined,
  ProfileOutlined,
  BarChartOutlined,
  WarningOutlined,
  HeartOutlined
} from '@ant-design/icons'

export const iconsMap = new Map<string, React.ReactNode>([
  ['dashboard', <DashboardOutlined key='dashboard' />],
  ['lock', <LockOutlined key='lock' />],
  ['form', <FormOutlined key='form' />],
  ['table', <TableOutlined key='table' />],
  ['component', <ProfileOutlined key='component' />],
  ['charts', <BarChartOutlined key='charts' />],
  ['error', <WarningOutlined key='error' />],
  ['heart', <HeartOutlined key='heart' />]
])

export default function getMenuIcon(icons: Map<string, React.ReactNode>, key?: string): React.ReactNode {
  if (key) {
    if (icons.has(key)) {
      return iconsMap.get(key)
    }
    return undefined
  }
  return null
}
