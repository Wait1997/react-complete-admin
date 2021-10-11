import React from 'react'
import './index.less'

export interface TableheadProps {
  title: string
}

export default function TableHead({ title, children }: React.PropsWithChildren<TableheadProps>) {
  return (
    <div className='pro-table-head'>
      <span className='head-title'>{title}</span>
      <>{children}</>
    </div>
  )
}
