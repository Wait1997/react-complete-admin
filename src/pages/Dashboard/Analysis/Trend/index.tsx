import React from 'react'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import cn from 'classnames'
import './index.less'

export interface TrendProps {
  flag?: 'up' | 'down'
  className?: string
  style?: React.CSSProperties
}

export default function Trend({ flag, className, style, children }: React.PropsWithChildren<TrendProps>) {
  return (
    <div className={cn(className, 'trend-wrap')} style={style}>
      <span>{children}</span>
      {flag && (
        <span className='flag'>
          {flag === 'up' ? (
            <CaretUpOutlined style={{ color: 'red', fontSize: 12 }} />
          ) : (
            <CaretDownOutlined style={{ color: 'green', fontSize: 12 }} />
          )}
        </span>
      )}
    </div>
  )
}
