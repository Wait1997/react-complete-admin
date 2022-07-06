import React from 'react'

export default function Label({ required, children, label, labelWidth, height }) {
  return (
    <div className='form-label' style={{ height }}>
      <div className='form-label-width' style={{ width: labelWidth }}>
        {required && <span className='form-label-required'>*</span>}
        {label}:
      </div>
      {children}
    </div>
  )
}
