import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import { Tabs, Input } from 'antd'
import useTitle from 'Src/hooks/useTitle'
import Article from './Article'
import Project, { DataListType } from './Project'
import Application from './Application'
import './index.less'

const { TabPane } = Tabs
const { Search } = Input

function getDataList() {
  const list = Array.from({ length: 200 }).fill(0)
  return list.map((item, index) => ({
    title: `react列表项${index}`,
    tags: ['react', 'rollup'],
    content:
      '落日与晚风，深情地相拥，曾相遇的路口，记忆盘旋了很久，退后的借口，失落的相守，已无法再陪你，到黑夜之后，走了多远 多久才敢抬头，看见孤独的沙漠 都有一片绿洲，再也不敢 轻易施舍温柔，怕在下一个路口 等不到你回眸'
  }))
}

export type TabsType = 'article' | 'project' | 'application'

// 这里的tab不需要通过useSate来控制key 直接通过路由就可以了
export default function TableSearch() {
  useTitle()
  const history = useHistory()
  const { pathname } = useLocation()
  const role = useSelector((state: any) => state.user.role)
  const pathList = pathname.split('/').filter(Boolean)

  const defaultActiveKey = pathList[pathList.length - 1]

  const [dataList, setDataList] = useState<DataListType[]>([])

  useEffect(() => {
    if (defaultActiveKey === 'project') {
      const list = getDataList()
      setDataList(list)
    }
  }, [defaultActiveKey])

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
        <Tabs
          defaultActiveKey={defaultActiveKey}
          onChange={(key) => {
            let path = ''
            pathList.pop()
            for (const item of pathList) {
              path += `/${item}`
            }
            history.push(`${path}/${key}`)
          }}>
          <TabPane tab='文章' key='article'>
            <Article />
          </TabPane>
          {role.includes('admin') && (
            <TabPane tab='项目' key='project'>
              <Project dataList={dataList} />
            </TabPane>
          )}
          <TabPane tab='应用' key='application'>
            <Application />
          </TabPane>
        </Tabs>
      </div>
    </>
  )
}
