import React, { memo } from 'react'
import { Card, Tag, Typography, Divider } from 'antd'
import VirtualList from '../VirtualList'
import './index.less'

export type DataListType = {
  title: string
  tags: string[]
  content: string
}
export interface ProjectProps {
  dataList: DataListType[]
}
export default memo(function Project({ dataList }: ProjectProps) {
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
