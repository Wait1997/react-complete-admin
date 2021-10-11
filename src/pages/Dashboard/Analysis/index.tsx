import React, { useCallback, useEffect, useState } from 'react'
import { Row, Col } from 'antd'
import useTitle from 'Src/hooks/useTitle'
import { getTimeDistance } from 'Src/utils/utils'
import IntroduceRow from './IntroduceRow'
import PopularityCard, { RangePickerValue, SaleRank, TimeType } from './PopularityCard'
import TopSearch, { TableSearchType, TableDataType } from './TopSearch'
import SalesRates, { RadioType, PieData } from './SalesRates'
import OfflineData, { TabDataProps, LineData } from './OfflineData'
import { ColumnData } from './PopularityCard/Charts'

let timer: NodeJS.Timeout | null = null

function getSaleRank() {
  const saleRank: SaleRank[] = []
  for (let i = 0; i < 7; i++) {
    saleRank.push({
      id: i,
      name: `南京东路${i}号`,
      count: 10000 + Math.floor(Math.random() * 1000 + 100)
    })
  }
  return {
    sales: saleRank,
    views: saleRank.map((item, index) => ({ ...item, name: `西藏北路${index}号` }))
  }
}

function getColumnChartData() {
  return {
    sales: [
      { value: 30, type: '1月' },
      { value: 40, type: '2月' },
      { value: 50, type: '3月' },
      { value: 40, type: '4月' },
      { value: 30, type: '5月' },
      { value: 40, type: '6月' },
      { value: 52, type: '7月' },
      { value: 40, type: '8月' },
      { value: 30, type: '9月' },
      { value: 40, type: '10月' },
      { value: 50, type: '11月' },
      { value: 40, type: '12月' }
    ],
    views: [
      { value: 80, type: '1月' },
      { value: 20, type: '2月' },
      { value: 15, type: '3月' },
      { value: 60, type: '4月' },
      { value: 40, type: '5月' },
      { value: 30, type: '6月' },
      { value: 68, type: '7月' },
      { value: 40, type: '8月' },
      { value: 62, type: '9月' },
      { value: 30, type: '10月' },
      { value: 50, type: '11月' },
      { value: 67, type: '12月' }
    ]
  }
}

function getSearchTop(): TableSearchType {
  const list: TableDataType[] = []
  for (let i = 0; i < 100; i++) {
    list.push({
      key: i,
      rank: i,
      keyWords: `搜索关键词${i}`,
      user: Math.floor(Math.random() * 1000 + 100),
      up: 23 + i
    })
  }
  return {
    user: {
      count: 32112,
      trend: 25.6,
      flag: 'up'
    },
    people: {
      count: 23.4,
      trend: 21.1,
      flag: 'down'
    },
    tableData: list
  }
}

function getPieData() {
  const pieList = [
    {
      type: '分类一',
      value: 27
    },
    {
      type: '分类二',
      value: 25
    },
    {
      type: '分类三',
      value: 18
    },
    {
      type: '分类四',
      value: 15
    },
    {
      type: '分类五',
      value: 10
    },
    {
      type: '其他',
      value: 5
    }
  ]
  return {
    all: pieList,
    online: pieList.map((item) => ({ ...item, value: 20 })),
    stores: pieList.map((item) => ({ ...item, value: 25 }))
  }
}

function getTabList(): TabDataProps[] {
  const list: LineData[] = []
  const tabs: TabDataProps[] = []
  for (let i = 0; i < 24; i++) {
    const value = i < 10 ? `0${i}` : i
    list.push({
      date: `${value}:00`,
      value: 200 + i * 10
    })
  }
  for (let i = 0; i < 10; i++) {
    tabs.push({
      key: `tab${i + 1}`,
      title: `Tab${i + 1}`,
      rateDesc: '转化率',
      rate: 80 + i,
      progress: {
        percent: i / 10
      },
      list
    })
  }
  return tabs
}

export default function Analysis() {
  useTitle()
  const [loading, setLoading] = useState(false)
  const [rangerPickerValue, setRangerPickerValue] = useState<RangePickerValue>(getTimeDistance('year'))
  const [saleRank, setSaleRank] = useState<SaleRank[]>([])
  const [viewRank, setViewRank] = useState<SaleRank[]>([])
  const [columnChartViews, setColumnChartViews] = useState<ColumnData<string, number>[]>([])
  const [columnChartData, setColumnChartData] = useState<ColumnData<string, number>[]>([])
  const [topSearch, setTopSearch] = useState<TableSearchType>({
    user: {
      count: 0,
      trend: 0,
      flag: 'up'
    },
    people: {
      count: 0,
      trend: 0,
      flag: 'up'
    },
    tableData: []
  })
  const [radioValue, setRadioValue] = useState<RadioType>('all')
  const [pieData, setPieData] = useState<PieData[]>([])
  const [tabList, setTabList] = useState<TabDataProps[]>([])

  // change RangePicker
  const handleRangePickerChange = useCallback((dates: RangePickerValue) => {
    setRangerPickerValue(dates)
  }, [])

  const selectedDate = useCallback((date: TimeType) => {
    setRangerPickerValue(getTimeDistance(date))
  }, [])

  const isAvtive = useCallback(
    (date: TimeType) => {
      if (!rangerPickerValue) {
        return ''
      }

      const value = getTimeDistance(date)
      if (!value) {
        return ''
      }

      if (!rangerPickerValue[0] || !rangerPickerValue[1]) {
        return ''
      }
      if (rangerPickerValue[0].isSame(value[0], 'day') && rangerPickerValue[1].isSame(value[1], 'day')) {
        return 'currentDate'
      }

      return ''
    },
    [rangerPickerValue]
  )

  const changeRadioValue = useCallback((value: RadioType) => {
    setRadioValue(value)
  }, [])

  useEffect(() => {
    if (rangerPickerValue) {
      setLoading(true)
      timer = setTimeout(() => {
        const popularColumns = getColumnChartData()
        const popularLists = getSaleRank()
        const topSearchData = getSearchTop()
        const pieList = getPieData()
        const tabData = getTabList()

        setLoading(false)
        setColumnChartData(popularColumns.sales)
        setColumnChartViews(popularColumns.views)
        setSaleRank(popularLists.sales)
        setViewRank(popularLists.views)
        setTopSearch(topSearchData)
        setTabList(tabData)

        if (radioValue === 'all') {
          setPieData(pieList.all)
        }
        if (radioValue === 'online') {
          setPieData(pieList.online)
        }
        if (radioValue === 'stores') {
          setPieData(pieList.stores)
        }
      }, 500)
    }
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [rangerPickerValue, radioValue])

  return (
    <>
      <IntroduceRow loading={loading} />
      <PopularityCard<string, number>
        className='popular-card'
        loading={loading}
        saleRank={saleRank}
        viewRank={viewRank}
        columnChartViews={columnChartViews}
        columnChartData={columnChartData}
        rangerPickerValue={rangerPickerValue}
        handleRangePickerChange={handleRangePickerChange}
        isActive={isAvtive}
        selectedDate={selectedDate}
      />
      <Row gutter={[24, 24]} style={{ marginTop: 24, marginBottom: 24 }}>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <TopSearch loading={loading} topSearchData={topSearch} />
        </Col>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <SalesRates loading={loading} radioValue={radioValue} pie={{ pieData }} changeRadioValue={changeRadioValue} />
        </Col>
      </Row>
      <OfflineData loading={loading} tabList={tabList} />
    </>
  )
}
