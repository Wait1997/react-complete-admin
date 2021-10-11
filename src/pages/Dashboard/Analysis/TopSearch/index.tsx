import React, { memo, useMemo, useState } from 'react'
import { Dropdown, Menu, Tooltip, Row, Col, Table } from 'antd'
import { TinyArea } from '@ant-design/charts'
import ProCard from 'Pages/Dashboard/component/ProCard'
import { EllipsisOutlined, InfoCircleOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import './index.less'

const { Item } = Menu

const Title = memo(function Title({ title }: { title: React.ReactNode }) {
  return (
    <div className='top-title-wrap'>
      <span className='top-title'>{title}</span>
      <Tooltip title='指标说明'>
        <InfoCircleOutlined />
      </Tooltip>
    </div>
  )
})

const TopSign = memo(function TopSign({ count, rate, flag }: { count: number; rate: number; flag: 'up' | 'down' }) {
  return (
    <div className='top-trend-wrap'>
      <span className='top-count'>{count}</span>
      <span className='top-trend'>
        {rate}
        {flag === 'up' ? (
          <CaretUpOutlined style={{ color: 'red', fontSize: 16 }} />
        ) : (
          <CaretDownOutlined style={{ color: 'green', fontSize: 16 }} />
        )}
      </span>
    </div>
  )
})

export type TopTitleType = { count: number; trend: number; flag: 'up' | 'down' }
export type TableDataType = { key: number; rank: number; keyWords: string; user: number; up: number }
export type TableSearchType = {
  tableData: TableDataType[]
  user: TopTitleType
  people: TopTitleType
}
export interface TopSearchProps {
  loading: boolean
  topSearchData: TableSearchType
}

export default function TopSearch({ loading, topSearchData }: TopSearchProps) {
  const count = topSearchData.tableData.length
  const { tableData, user, people } = topSearchData
  const [pageIndex, setPageIndex] = useState(1)
  const columns = useMemo(() => {
    return [
      {
        title: '排名',
        dataIndex: 'rank',
        key: 'rank'
      },
      {
        title: '搜索关键词',
        dataIndex: 'keyWords',
        key: 'keyWords'
      },
      {
        title: '用户数',
        dataIndex: 'user',
        key: 'user'
      },
      {
        title: '周涨幅',
        dataIndex: 'up',
        key: 'up'
      }
    ]
  }, [])

  const extraEl = useMemo(() => {
    return (
      <Dropdown
        overlay={
          <Menu>
            <Item key='1'>操作一</Item>
            <Item key='2'>操作一</Item>
          </Menu>
        }
        placement='bottomRight'>
        <EllipsisOutlined />
      </Dropdown>
    )
  }, [])

  return (
    <ProCard loading={loading} title='线上热门搜索' extra={extraEl} bodyStyle={{ padding: 24 }}>
      <Row gutter={[24, 24]}>
        <Col span={12} style={{ marginBottom: 24 }}>
          <Title title='搜索用户数' />
          <TopSign flag={user.flag} count={user.count} rate={user.trend} />
          <div className='tiny-wrap'>
            <TinyArea data={[264, 617, 238, 687, 309, 697, 240, 575, 263, 600]} autoFit smooth />
          </div>
        </Col>
        <Col span={12} style={{ marginBottom: 24 }}>
          <Title title='人均搜索次数' />
          <TopSign flag={people.flag} count={people.count} rate={people.trend} />
          <div className='tiny-wrap'>
            <TinyArea data={[664, 217, 638, 287, 609, 220, 650, 275, 663, 230]} autoFit smooth />
          </div>
        </Col>
      </Row>
      <Table
        size='small'
        columns={columns}
        dataSource={tableData}
        pagination={{
          total: count,
          current: pageIndex,
          pageSize: 5,
          showSizeChanger: false,
          onChange: (current) => {
            setPageIndex(current)
          }
        }}
      />
    </ProCard>
  )
}
