import React from 'react'

export default function Message({ status, message, required, name, value }) {
  return (
    <div className='form-message'>
      <span style={{ color: 'red' }}>{message}</span>
    </div>
  )
}
