import React, { memo, useState } from 'react'
import { Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import './index.less'

const { Option } = Select

export interface HeaderSearchProps {
  placeholder?: string
  options: { value: string; title: string }[]
  onSearch: (value: string) => void
}

export default memo(function HeadSearch({ placeholder = '请输入', options = [], onSearch }: HeaderSearchProps) {
  const [show, setShow] = useState(false)
  const [value, setValue] = useState('')

  return (
    <>
      <SearchOutlined
        className='search-icon'
        onClick={() => {
          setShow(!show)
        }}
      />
      {show && (
        <Select
          className='search-select'
          value={value}
          placeholder={placeholder}
          showArrow={false}
          defaultActiveFirstOption={false}
          filterOption={false}
          notFoundContent={null}
          showSearch
          onChange={(text) => {
            setValue(text)
          }}
          onSearch={(text) => {
            onSearch(text)
          }}>
          {options.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.title}
            </Option>
          ))}
        </Select>
      )}
    </>
  )
})
