import React, { useEffect, useState } from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import './index.less'

const content = '<p>艾欧里亚，昂扬不灭！</p>'
export default function RichText() {
  // 创建一个空的editorState作为初始值
  const defaultEditorState = BraftEditor.createEditorState(null)

  const [editor, setEditor] = useState(defaultEditorState)

  const submitContent = () => {
    const htmlContent = editor.toHTML()
    // eslint-disable-next-line no-console
    console.log(htmlContent)
  }

  useEffect(() => {
    setEditor(BraftEditor.createEditorState(content))
  }, [])

  return (
    <BraftEditor
      className='editor-wrap'
      value={editor}
      onChange={(editorState) => {
        setEditor(editorState)
      }}
      onSave={submitContent}
    />
  )
}
