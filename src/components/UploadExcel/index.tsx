import React, { useState } from 'react'
import { Upload, message } from 'antd'
// import XLSX from 'xlsx'
import { InboxOutlined } from '@ant-design/icons'
import { RcFile } from 'antd/lib/upload'
import { UploadFile } from 'antd/es/upload/interface'

const { Dragger } = Upload

// const getHeaderRow = (sheet) => {
//   const headers = []
//   const range = XLSX.utils.decode_range(sheet['!ref'])
//   let C
//   const R = range.s.r
//   /* start in the first row */
//   for (C = range.s.c; C <= range.e.c; ++C) {
//     /* walk every column in the range */
//     const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
//     /* find the cell in the first row */
//     let hdr = `UNKNOWN ${C}` // <-- replace with your desired default
//     if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
//     headers.push(hdr)
//   }
//   return headers
// }

const isExcel = (file: RcFile) => {
  return /\.(xlsx|xls|csv)$/.test(file.name)
}

export interface UploadExcelProps {
  name?: string
  accept: string
  multiple?: boolean
}

export default function UploadExcel({
  name,
  accept,
  multiple = false,
  children
}: React.PropsWithChildren<UploadExcelProps>) {
  // 已上传的文件列表
  const [excelFileList, setExcelFileList] = useState<RcFile[]>([])

  const beforeUpload = (file: RcFile) => {
    if (!isExcel(file)) {
      message.error('仅支持上传.xlsx, .xls, .csv 文件')
      return false
    }
    setExcelFileList([...excelFileList, file])
    return Promise.resolve(file)
  }

  const onRemove = (file: UploadFile) => {
    setExcelFileList(excelFileList.filter((item) => item.uid !== file.uid))
  }

  return (
    <>
      <Dragger
        fileList={excelFileList}
        name={name}
        accept={accept}
        multiple={multiple}
        beforeUpload={beforeUpload}
        onRemove={onRemove}>
        <p className='ant-upload-drag-icon'>
          <InboxOutlined />
        </p>
        <p className='ant-upload-text'>Click or drag file to this area to upload</p>
      </Dragger>
      {children && <div>{children}</div>}
    </>
  )
}
