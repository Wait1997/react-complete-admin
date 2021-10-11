import React from 'react'
import './index.less'

export default function Feild({
  label,
  value,
  style
}: {
  label: React.ReactNode
  value: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <div style={style} className='field'>
      <span className='label'>{label}</span>
      <span className='number'>{value}</span>
    </div>
  )
}
