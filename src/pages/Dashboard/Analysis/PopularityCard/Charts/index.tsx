import React from 'react'
import { Column } from '@ant-design/charts'

/**
 * xAxis的参数:
 * tickLine 控制刻度线的长度
 */

export type ColumnData<T, V> = { type: T; value: V }

export interface ColumnProps<T, V> {
  padding?: number | number[] | 'auto'
  data: ColumnData<T, V>[]
  xField: string
  yField: string
  style: React.CSSProperties
  isGroup: boolean
}

export default function ColumnCharts<T, V>({
  data,
  xField,
  yField,
  style,
  isGroup,
  padding = 'auto'
}: ColumnProps<T, V>) {
  return (
    <Column
      isGroup={isGroup}
      style={style}
      padding={padding}
      data={data}
      xField={xField}
      yField={yField}
      xAxis={{
        tickLine: { length: 0 },
        line: { style: { fill: '#975FE4', lineWidth: 2 } }
      }}
      meta={{ value: { alias: '销售量' } }}
      autoFit
    />
  )
}
