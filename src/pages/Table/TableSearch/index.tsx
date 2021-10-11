import React from 'react'
import { useLocation } from 'react-router-dom'
import { Tabs, Input } from 'antd'
import Article from './Article'
import Project from './Project'
import Application from './Application'
import './index.less'

const { TabPane } = Tabs
const { Search } = Input

export type TabsType = 'article' | 'project' | 'application'

export default function TableSearch() {
  const { pathname } = useLocation()
  const pathList = pathname.split('/').filter(Boolean)
  const defaultActiveKey = pathList[pathList.length - 1]

  return (
    <>
      <div className='search-wrap'>
        <div className='input-wrap'>
          <Search
            className='input-input'
            placeholder='请输入'
            enterButton='Search'
            size='large'
            onSearch={(value) => {
              // eslint-disable-next-line no-console
              console.log(value)
            }}
            onChange={(e) => {
              // eslint-disable-next-line no-console
              console.log(e.target.value)
            }}
          />
        </div>
        <Tabs defaultActiveKey={defaultActiveKey}>
          <TabPane tab='文章' key='article'>
            <Article />
          </TabPane>
          <TabPane tab='项目' key='project'>
            <Project />
          </TabPane>
          <TabPane tab='应用' key='application'>
            <Application />
          </TabPane>
        </Tabs>
      </div>
    </>
  )
}
