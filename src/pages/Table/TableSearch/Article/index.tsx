import React, { memo } from 'react'
import { Card, List, Typography } from 'antd'
import SearchTag, { FormValuesType } from '../../component/SearchTag'
import './index.less'

export interface ArticleProps {
  tagList: Array<{ title: string; key: number; isChecked: boolean }>
  options: Array<{ title: string; value: string }>
  selectValues: string[]
  onChangeSelect: (values: string[]) => void
  selectedTags: (values: Array<{ title: string; key: number; isChecked: boolean }>) => void
  getFormValues: (values: FormValuesType) => void
  defaultFormValue: FormValuesType
  contentList: string[]
}

export default memo(function Article({
  tagList,
  options,
  selectValues,
  defaultFormValue,
  contentList,
  onChangeSelect,
  selectedTags,
  getFormValues
}: ArticleProps) {
  return (
    <>
      <Card bodyStyle={{ padding: 16 }}>
        <SearchTag
          tagsList={tagList}
          options={options}
          selectedTags={selectedTags}
          onChangeSelect={onChangeSelect}
          selectValues={selectValues}
          defaultFormValue={defaultFormValue}
          getFormValues={getFormValues}
        />
      </Card>
      <Card bodyStyle={{ padding: 16 }} className='article-wrap' loading={false}>
        <List
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={contentList}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text mark>[ITEM]</Typography.Text> {item}
            </List.Item>
          )}
        />
      </Card>
    </>
  )
})
