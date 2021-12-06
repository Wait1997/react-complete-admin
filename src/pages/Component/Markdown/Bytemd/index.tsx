/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react'
import { Editor, Viewer } from '@bytemd/react'
import { Divider } from 'antd'
import gfm from '@bytemd/plugin-gfm'
import gemoji from '@bytemd/plugin-gemoji'
import highlight from '@bytemd/plugin-highlight-ssr'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import zhHans from 'bytemd/lib/locales/zh_Hans.json'
import 'bytemd/dist/index.min.css'
import 'highlight.js/styles/vs.css'
import './index.less'

const plugins = [gfm(), gemoji(), highlight(), mediumZoom()]

export default function Bytemd() {
  const [value, setValue] = useState('艾欧里亚，昂扬不灭！')

  return (
    <div>
      <Editor
        locale={zhHans}
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
