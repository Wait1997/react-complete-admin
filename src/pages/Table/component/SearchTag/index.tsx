import React, { memo } from 'react'
import { Row, Col, Tag, Divider, Select, Form } from 'antd'
import './index.less'
import { SelectValue } from 'antd/lib/select'

const { CheckableTag } = Tag
const { Option } = Select
const { Item } = Form

const LabelTitle = memo(
  function LabelTitle({ title, className }: { title: string; className?: string }) {
    return (
      <div className={className}>
        <span className='title'>{title}</span>
      </div>
    )
  },
  () => true
)

const SelectWrap = memo(function SelectWrap({
  mode = 'multiple',
  placeholder,
  value,
  onChange,
  options,
  children
}: {
  mode?: 'multiple' | 'tags'
  placeholder?: string
  value: string[]
  onChange(values: SelectValue): void
  options: Array<{ title: string; value: string }>
  children?: React.ReactNode
}) {
  return (
    <>
      <div className='select-wrap'>
        <Select mode={mode} value={value} style={{ width: '100%' }} placeholder={placeholder} onChange={onChange}>
          {options.map((item) => {
            return (
              <Option value={item.value} key={item.value}>
                {item.title}
              </Option>
            )
          })}
        </Select>
      </div>
      {children}
    </>
  )
})

export type FormValuesType = { activeUser: string; evaluate: string }
export interface SearchtagProps {
  tagsList: Array<{ title: string; key: number; isChecked: boolean }>
  options: Array<{ title: string; value: string }>
  selectValues: string[]
  defaultFormValue: FormValuesType
  selectedTags: (values: Array<{ title: string; key: number; isChecked: boolean }>) => void
  onChangeSelect: (values: string[]) => void
  getFormValues: (values: FormValuesType) => void
}

export default function SearchTag({
  tagsList,
  options,
  selectValues,
  defaultFormValue,
  selectedTags,
  onChangeSelect,
  getFormValues
}: SearchtagProps) {
  const [form] = Form.useForm()
  return (
    <>
      <div className='search-tag-item'>
        <LabelTitle title='所属项目' className='search-item' />
        <div className='search-tags-wrap'>
          {tagsList.map((item) => {
            return (
              <CheckableTag
                key={item.key}
                checked={item.isChecked}
                onChange={(checked) => {
                  // 全部
                  if (item.key === -1) {
                    const selectedTagsList = tagsList.map((tag) => ({ ...tag, isChecked: checked }))
                    selectedTags(selectedTagsList)
                  } else {
                    const selectedTagsList = tagsList.map((tag) => {
                      if (tag.key === item.key) {
                        return { ...tag, isChecked: checked }
                      }
                      return { ...tag }
                    })
                    selectedTags(selectedTagsList)
                  }
                }}>
                {item.title}
              </CheckableTag>
            )
          })}
        </div>
      </div>
      <Divider dashed style={{ margin: '12px 0' }} />
      <div className='search-tag-item'>
        <LabelTitle title='拥有者' className='search-item' />
        <SelectWrap
          value={selectValues}
          options={options}
          onChange={(values) => {
            if (Array.isArray(values)) {
              onChangeSelect(values as string[])
            }
          }}>
          <span
            className='select-title'
            onClick={() => {
              onChangeSelect(['self'])
            }}>
            只看自己的
          </span>
        </SelectWrap>
      </div>
      <Divider dashed style={{ margin: '12px 0' }} />
      <div className='search-tag-item'>
        <LabelTitle title='其他选项' className='search-item' />
        <div className='search-form'>
          <Form
            form={form}
            initialValues={defaultFormValue}
            onValuesChange={(changedValues, allValues) => {
              getFormValues(allValues)
            }}>
            <Row gutter={16}>
              <Col span={8}>
                <Item label='活跃用户' name='activeUser'>
                  <Select placeholder='请选择' allowClear>
                    <Option value='xiaozhang'>小张</Option>
                  </Select>
                </Item>
              </Col>
              <Col span={8}>
                <Item label='好评度' name='evaluate'>
                  <Select placeholder='请选择' allowClear>
                    <Option value='good'>好评</Option>
                  </Select>
                </Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  )
}
