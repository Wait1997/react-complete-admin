import React from 'react'
import { Radio, RadioChangeEvent } from 'antd'
import { RouteComponentProps } from 'react-router-dom'
import StandardTable from './EditTable'
import './index.less'

export type RadioType = 'a' | 'b' | 'c' | 'd'
export interface StandardState {
  radioValue: RadioType
}
export default class EditTable extends React.Component<RouteComponentProps, StandardState> {
  constructor(props: RouteComponentProps) {
    super(props)
    this.state = {
      radioValue: 'a'
    }
  }

  render() {
    return (
      <>
        <div className='switch'>
          <Radio.Group
            value={this.state.radioValue}
            size='middle'
            onChange={(e: RadioChangeEvent) => {
              this.setState({
                radioValue: e.target.value
              })
            }}>
            <Radio.Button value='a'>可编辑的单元格(Hooks)</Radio.Button>
            <Radio.Button value='b'>可编辑的单元格(Class)</Radio.Button>
            <Radio.Button value='c'>可编辑行(Hooks)</Radio.Button>
            <Radio.Button value='d'>可编辑行(Class)</Radio.Button>
          </Radio.Group>
        </div>
        <StandardTable />
      </>
    )
  }
}
