import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import md from '../md/README.md'
import './index.less'

export default function Markdown() {
  return (
    <div className='markdown-wrap'>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown>
    </div>
  )
}
