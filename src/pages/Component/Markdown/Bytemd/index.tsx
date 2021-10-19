/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react'
import { Editor, Viewer } from '@bytemd/react'
import { Divider } from 'antd'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import 'bytemd/dist/index.min.css'
import 'highlight.js/styles/vs.css'
import './index.less'

const plugins = [gfm(), highlight()]

export default function Bytemd() {
  const [value, setValue] = useState('艾欧里亚，昂扬不灭！')

  return (
    <div>
      <Editor
        value={value}
        plugins={plugins}
        onChange={(v) => {
          setValue(v)
        }}
      />
      <Divider />
      <div className='viewer'>
        <Viewer value={value} plugins={plugins} />
      </div>
    </div>
  )
}
