import React, { useState } from 'react'
import { FileAddOutlined } from '@ant-design/icons'
import HBToolbarButton from 'Src/components/Upload'

export default function Zip() {
  const [uploadList, setUploadList] = useState<string[]>([])
  return (
    <div>
      <HBToolbarButton
        icon={<FileAddOutlined />}
        text='上传'
        file={{ multiple: false }}
        onChooseFile={(values) => {
          if (Array.isArray(values.fileData)) {
            // setUploadList(values.fileData.map((item) => item.url))
          }
        }}
      />
      {uploadList.map((item) => (
        <img src={item} key={item} alt='' />
      ))}
    </div>
  )
}
