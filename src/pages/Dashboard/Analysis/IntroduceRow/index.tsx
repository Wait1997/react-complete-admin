import React, { memo } from 'react'
import numeral from 'numeral'
import { Row, Col, Tooltip } from 'antd'
import { TinyArea, TinyColumn, Progress } from '@ant-design/charts'
import { InfoCircleOutlined } from '@ant-design/icons'
import ChartCard from '../../component/ChartCard'
import Trend from '../Trend'
import Field from '../../component/Field'
import './index.less'

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 }
}

export interface IntroduceProps {
  loading: boolean
}

export default memo(function IntroduceRow({ loading }: IntroduceProps) {
  return (
    <Row gutter={24}>
      <Col {...topColResponsiveProps}>
        <ChartCard
          loading={loading}
          title='总销售额'
          action={
            <Tooltip title='指标说明'>
              <InfoCircleOutlined />
            </Tooltip>
          }
          contentHeight={46}
          total={12341}
          footer={
            <Field
              style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid #f0f0f0' }}
              label='日销售额'
              value={`￥${numeral(12423).format('0,0')}`}
            />
          }>
          <Trend flag='up'>
            周同比
            <span className='increment'>12%</span>
          </Trend>
          <Trend flag='down'>
            日同比
            <span className='increment'>10%</span>
          </Trend>
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          loading={loading}
          title='访问量'
          action={
            <Tooltip title='指标说明'>
              <InfoCircleOutlined />
            </Tooltip>
          }
          contentHeight={46}
          total={8848}
          footer={
            <Field
              style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid #f0f0f0' }}
              label='日访问量'
              value={numeral(8846).format('0,0')}
            />
          }>
          <TinyArea
            style={{ width: '100%', height: 46 }}
            color='#975FE4'
            data={[
              999, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 983, 340, 539, 243, 226,
              192
            ]}
            autoFit
            smooth
          />
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          loading={loading}
          title='支付笔数'
          action={
            <Tooltip title='指标说明'>
              <InfoCircleOutlined />
            </Tooltip>
          }
          contentHeight={46}
          total={6560}
          footer={
            <Field style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid #f0f0f0' }} label='转化率' value='60%' />
          }>
          <TinyColumn style={{ width: '100%', height: 46 }} data={[1, 3, 4, 2, 4, 3, 6, 2, 7, 9, 4, 2, 1]} autoFit />
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          loading={loading}
          title='运营活动效果'
          action={
            <Tooltip title='指标说明'>
              <InfoCircleOutlined />
            </Tooltip>
          }
          contentHeight={46}
          total='78%'
          footer={
            <div className='progree-footer'>
              <Trend flag='up'>
                周同比
                <span className='increment'>12%</span>
              </Trend>
              <Trend flag='down'>
                日同比
                <span className='increment'>10%</span>
              </Trend>
            </div>
          }>
          <Progress style={{ width: '100%', height: 46 }} percent={0.78} color='#13C2C2' barWidthRatio={0.2} autoFit />
        </ChartCard>
      </Col>
    </Row>
  )
})
