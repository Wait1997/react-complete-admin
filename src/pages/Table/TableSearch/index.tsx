/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Tabs, Input } from 'antd'
import useTitle from 'Src/hooks/useTitle'
import Article from './Article'
import Project, { DataListType } from './Project'
import Application from './Application'
import { FormValuesType } from '../component/SearchTag'
import './index.less'
import { useActiveKey } from './hooks/useActiveKey'

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

function getTags() {
  const list = Array.from({ length: 12 }).fill(0)
  return list.map((item, index) => ({
    title: `类目${index + 1}`,
    key: index
  }))
}

function getOwners() {
  return [
    { value: 'zhangsan', title: '张三' },
    { value: 'lisi', title: '李四' },
    { value: 'wangwu', title: '王五' },
    { value: 'lixiang', title: '理想' },
    { value: 'xiwang', title: '希望' },
    { value: 'self', title: '自己' }
  ]
}

export type TabsType = 'article' | 'project' | 'application'

// 这里的tab不需要通过useSate来控制key 直接通过路由就可以了
export default function TableSearch() {
  useTitle()
  const history = useHistory()
  const [defaultActiveKey, pathList] = useActiveKey()
  const role = useSelector((state: any) => state.user.role)

  const [dataList, setDataList] = useState<DataListType[]>([])
  // 选中的tag
  const [tagList, setTagList] = useState<Array<{ title: string; key: number; isChecked: boolean }>>([])
  const [optionList, setOptionList] = useState<Array<{ title: string; value: string }>>([])
  // 选中的下拉框
  const [selectValues, setSelectValues] = useState<string[]>(['zhangsan', 'lisi'])
  // 初始化表单搜索值
  const [formValues, setFormValues] = useState<FormValuesType>({ activeUser: 'xiaozhang', evaluate: 'good' })
  const [contentList, setContentList] = useState<string[]>([])

  useEffect(() => {
    if (defaultActiveKey === 'article') {
      const list = getTags()
      const options = getOwners()
      list.unshift({ title: '全部', key: -1 })
      // 添加是否可选中项
      setTagList(list.map((item) => ({ ...item, isChecked: false })))
      setOptionList(options)
    }
    if (defaultActiveKey === 'project') {
      const list = getDataList()
      setDataList(list)
    }
  }, [defaultActiveKey])

  useEffect(() => {
    const restTags = tagList.filter((item) => {
      if (item.key === -1 || !item.isChecked) {
        return false
      }
      return true
    })
    // 组成接口需要的数据请求数据
    const apiDataModel = {
      selectValues,
      formValues,
      tags: restTags
    }
    console.log(apiDataModel)
    setContentList([
      'Racing car sprays burning fuel into crowd.',
      'Japanese princess to wed commoner.',
      'Australian walks 100km after outback crash.',
      'Man charged over missing wedding girl.',
      'Los Angeles battles huge wildfires.',
      'Racing car sprays burning fuel into crowd.',
      'Japanese princess to wed commoner.',
      'Australian walks 100km after outback crash.',
      'Man charged over missing wedding girl.',
      'Los Angeles battles huge wildfires.'
    ])
  }, [tagList, selectValues, formValues])

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
            <Article
              tagList={tagList}
              options={optionList}
              selectValues={selectValues}
              contentList={contentList}
              selectedTags={(values) => {
                setTagList(values)
              }}
              onChangeSelect={(values) => {
                setSelectValues(values)
              }}
              defaultFormValue={formValues}
              getFormValues={(values: FormValuesType) => {
                setFormValues(values)
              }}
            />
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
