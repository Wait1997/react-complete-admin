import React, { useCallback, useMemo, useState } from 'react'
import { Row, Col, DatePicker } from 'antd'
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker'
import cn from 'classnames'
import moment from 'moment'
import ProCard from '../../component/ProCard'
import ColumnCharts, { ColumnData } from './Charts'
import './index.less'

const { RangePicker } = DatePicker

export type TabsType = {
  key: string
  tab: React.ReactNode
}

export type RangePickerValue = RangePickerProps<moment.Moment>['value']

export type TimeType = 'today' | 'week' | 'month' | 'year'

export type SaleRank = { id: number; name: string; count: number }

export interface PopularityCardProps<T, V> {
  loading: boolean
  className?: string
  saleRank: SaleRank[]
  viewRank: SaleRank[]
  columnChartViews: ColumnData<T, V>[]
  columnChartData: ColumnData<T, V>[]
  rangerPickerValue: RangePickerValue
  handleRangePickerChange: (dates: RangePickerValue, dateStrings: [string, string]) => void
  isActive: (date: TimeType) => string
  selectedDate: (date: TimeType) => void
}

export default function PopularityCard<T, V>({
  loading,
  className,
  saleRank,
  viewRank,
  columnChartViews,
  columnChartData,
  rangerPickerValue,
  handleRangePickerChange,
  selectedDate,
  isActive
}: PopularityCardProps<T, V>) {
  const tabList = useMemo<TabsType[]>(() => {
    return [
      {
        key: 'sales',
        tab: '销售额'
      },
      {
        key: 'views',
        tab: '访问量'
      }
    ]
  }, [])

  const [activeTabKey, setActiveKey] = useState<'sales' | 'views'>('sales')

  const onTabChange = useCallback((key) => {
    setActiveKey(key)
  }, [])

  const getRankList = useCallback((rankList: SaleRank[]) => {
    return rankList.map((item, index) => (
      <div className='count-item' key={item.id}>
        <div className='count-left'>
          <span className={cn('count-num', { 'count-ranking': index < 3 })}>{index + 1}</span>
          <span className='count-content'>{item.name}</span>
        </div>
        <span className='count-right'>{item.count}</span>
      </div>
    ))
  }, [])

  const tabContentEl = useMemo(() => {
    if (activeTabKey === 'sales') {
      return (
        <Row>
          <Col xl={16} lg={12} md={12} sm={24} xs={24}>
            <ColumnCharts<T, V>
              style={{ padding: '0 0 32px 32px' }}
              xField='type'
              yField='value'
              data={columnChartData}
              isGroup={false}
            />
          </Col>
          <Col xl={8} lg={12} md={12} sm={24} xs={24}>
            <div className='count-rank'>
              <h4 className='count-title'>门店销售额排名</h4>
              <div className='count-list'>{getRankList(saleRank)}</div>
            </div>
          </Col>
        </Row>
      )
    }
    return (
      <Row>
        <Col xl={16} lg={12} md={12} sm={24} xs={24}>
          <ColumnCharts<T, V>
            style={{ padding: '0 0 32px 32px' }}
            xField='type'
            yField='value'
            data={columnChartViews}
            isGroup={false}
          />
        </Col>
        <Col xl={8} lg={12} md={12} sm={24} xs={24}>
          <div className='count-rank'>
            <h4 className='count-title'>门店访问量排名</h4>
            <div className='count-list'>{getRankList(viewRank)}</div>
          </div>
        </Col>
      </Row>
    )
  }, [activeTabKey, saleRank, columnChartData, viewRank, columnChartViews, getRankList])

  return (
    <ProCard
      className={cn('pro-card', className)}
      loading={loading}
      activeTabKey={activeTabKey}
      tabList={tabList}
      onTabChange={onTabChange}
      tabBarExtraContent={
        <div className='extra-card'>
          <div className='extra-title'>
            <span
              className={cn('title', isActive('today'))}
              onClick={() => {
                selectedDate('today')
              }}>
              今日
            </span>
            <span
              className={cn('title', isActive('week'))}
              onClick={() => {
                selectedDate('week')
              }}>
              本周
            </span>
            <span
              className={cn('title', isActive('month'))}
              onClick={() => {
                selectedDate('month')
              }}>
              本月
            </span>
            <span
              className={cn('title', isActive('year'))}
              onClick={() => {
                selectedDate('year')
              }}>
              本年
            </span>
          </div>
          <RangePicker value={rangerPickerValue} onChange={handleRangePickerChange} />
        </div>
      }>
      {tabContentEl}
    </ProCard>
  )
}
