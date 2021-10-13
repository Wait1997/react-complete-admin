import React, { memo, useEffect, useState } from 'react'
import { Card, Tag, Typography, Divider } from 'antd'
import VirtualList from '../VirtualList'
import './index.less'

function getDataList() {
  const list = Array.from({ length: 200 }).fill(0)
  return list.map((item, index) => ({
    title: `react列表项${index}`,
    tags: ['react', 'rollup'],
    content:
      '落日与晚风，深情地相拥，曾相遇的路口，记忆盘旋了很久，退后的借口，失落的相守，已无法再陪你，到黑夜之后，走了多远 多久才敢抬头，看见孤独的沙漠 都有一片绿洲，再也不敢 轻易施舍温柔，怕在下一个路口 等不到你回眸'
  }))
}

export type DataListType = {
  title: string
  tags: string[]
  content: string
}

export default memo(function Project() {
  const [dataList, setDataList] = useState<DataListType[]>([])

  useEffect(() => {
    const list = getDataList()
    setDataList(list)
  }, [])

  return (
    <>
      <Card bodyStyle={{ padding: 16 }}>项目</Card>
      <Card bodyStyle={{ padding: 16 }} className='project-wrap'>
        <Typography.Title level={4} className='virtual-title'>
          自定义虚拟加载列表
        </Typography.Title>
        <Divider />
        <VirtualList<DataListType> wrapheight={520} height={130} bufferCount={8} dataList={dataList}>
          {(renderList: DataListType[]) => {
            return renderList.map((item) => (
              <div style={{ height: 130 }} key={item.title}>
                <h4>{item.title}</h4>
                <div className='tags-wrap'>
                  {item.tags.map((tag) => (
                    <Tag color='red' key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </div>
                <p>{item.content}</p>
              </div>
            ))
          }}
        </VirtualList>
      </Card>
    </>
  )
})
