import React, { memo } from 'react'
import { Card } from 'antd'
import SearchTag from '../../component/SearchTag'
import './index.less'

export default memo(function Article() {
  return (
    <>
      <Card bodyStyle={{ padding: 16 }}>
        <SearchTag />
      </Card>
      <Card bodyStyle={{ padding: 16 }} className='article-wrap'>
        <div>内容</div>
      </Card>
    </>
  )
})
