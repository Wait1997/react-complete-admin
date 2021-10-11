import React, { memo, useState } from 'react'
import { Tabs, Row, Col } from 'antd'
import { RingProgress, Line } from '@ant-design/charts'
import ProCard from 'Pages/Dashboard/component/ProCard'
import './index.less'

const { TabPane } = Tabs

const CustomTab = memo(function CustomTab({ title, rate, rateDesc, progress }: Omit<TabDataProps, 'list' | 'key'>) {
  const { radius = 1, innerRadius = 0.8, percent } = progress
  const percentRate = `${rate}%`
  return (
    <Row gutter={8} style={{ width: 138, margin: '8px 0' }}>
      <Col span={12}>
        <div className='tab-title'>
          <div className='tab-title-name'>{title}</div>
          <div className='tab-title-desc'>{rateDesc}</div>
          <div className='tab-title-rate'>{percentRate}</div>
        </div>
      </Col>
      <Col span={12} style={{ paddingTop: 36 }}>
        <RingProgress radius={radius} innerRadius={innerRadius} percent={percent} height={60} width={60} />
      </Col>
    </Row>
  )
})

export type LineData = {
  date: string
  value: number
}
export interface TabDataProps {
  key: number | string
  title: React.ReactNode
  rateDesc: string
  rate: number
  progress: {
    radius?: number
    innerRadius?: number
    percent: number
  }
  list: LineData[]
}
export interface OfflineDataProps {
  defaultActiveKey?: string
  loading: boolean
  tabList: TabDataProps[]
}

export default function OfflineData({ tabList, loading, defaultActiveKey = 'tab1' }: OfflineDataProps) {
  const [activeKey, setActiveKey] = useState<number | string>(defaultActiveKey)
  return (
    <ProCard loading={loading} bodyStyle={{ padding: 24 }}>
      <Tabs
        activeKey={activeKey as string}
        type='line'
        onChange={(key) => {
          setActiveKey(key)
        }}>
        {tabList.map((item) => {
          return (
            <TabPane
              key={item.key}
              tab={<CustomTab title={item.title} rateDesc={item.rateDesc} rate={item.rate} progress={item.progress} />}>
              <Line data={item.list} xField='date' yField='value' />
            </TabPane>
          )
        })}
      </Tabs>
    </ProCard>
  )
}
