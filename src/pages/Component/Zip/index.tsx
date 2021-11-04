import React from 'react'
import { FileAddOutlined } from '@ant-design/icons'
import HBToolbarButton from 'Src/components/Upload'

export default function Zip() {
  return (
    <div>
      <HBToolbarButton icon={<FileAddOutlined />} text='上传' file={{ multiple: false }} />
    </div>
  )
}
