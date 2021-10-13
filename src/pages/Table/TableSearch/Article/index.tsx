import React, { memo } from 'react'
import { Card } from 'antd'
import './index.less'

export default memo(function Article() {
  return (
    <>
      <Card bodyStyle={{ padding: 16 }}>文章</Card>
      <Card bodyStyle={{ padding: 16 }} className='article-wrap'>
        <div>内容</div>
      </Card>
    </>
  )
})
