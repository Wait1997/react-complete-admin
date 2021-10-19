import React from 'react'
import Upload from 'Src/components/UploadExcel'

export default function UploadExcel() {
  return (
    <div className='upload-excel-wrap'>
      <Upload accept='.xlsx, .xls' />
    </div>
  )
}
