import React, { useMemo } from 'react'
import { Radio, Dropdown, Menu, RadioChangeEvent } from 'antd'
import ProCard from 'Pages/Dashboard/component/ProCard'
import { Pie } from '@ant-design/charts'
import { EllipsisOutlined } from '@ant-design/icons'
import './index.less'

const { Item } = Menu

export type RadioType = 'all' | 'online' | 'stores'

export type PieData = {
  type: string
  value: number
}

export type PieType = {
  radius?: number
  innerRadius?: number
  pieData: PieData[]
}

export interface SalesRatesProps {
  loading: boolean
  radioValue: RadioType
  changeRadioValue: (value: RadioType) => void
  pie: PieType
}

export default function SalesRates({ loading, radioValue = 'all', pie, changeRadioValue }: SalesRatesProps) {
  const { radius = 1, innerRadius = 0.64, pieData } = pie

  const extraEl = useMemo(() => {
    return (
      <div className='sales-extra'>
        <div className='sales-radio'>
          <Radio.Group
            value={radioValue}
            size='middle'
            onChange={(e: RadioChangeEvent) => {
              changeRadioValue(e.target.value)
            }}>
            <Radio.Button value='all'>全部渠道</Radio.Button>
            <Radio.Button value='online'>线上</Radio.Button>
            <Radio.Button value='stores'>门店</Radio.Button>
          </Radio.Group>
        </div>
        <div className='sales-drop'>
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
        </div>
      </div>
    )
  }, [radioValue, changeRadioValue])

  return (
    <ProCard title='销售额类别占比' extra={extraEl} loading={loading} bodyStyle={{ padding: 24 }}>
      <div className='sales-pie'>
        <span className='sales-title'>销售额</span>
        <Pie
          style={{ height: 320 }}
          angleField='value'
          colorField='type'
          radius={radius}
          innerRadius={innerRadius}
          legend={{
            layout: 'vertical',
            position: 'right-top'
          }}
          data={pieData}
          autoFit
        />
      </div>
    </ProCard>
  )
}
