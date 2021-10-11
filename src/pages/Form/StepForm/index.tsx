import React, { memo, useState, useMemo, useEffect, useCallback } from 'react'
import { Card, Divider, Space, Button } from 'antd'
import Steps, { StepsDataType } from './Steps'
import FirstStep, { SelectOptions, FirstFormNameType } from './FirstStep'
import SecondStep, { TableType } from './SecondStep'
import ThirdStep from './ThirdStep'
import './index.less'

const paymentCounter = [
  {
    value: '1433193222@qq.com',
    title: '1433193222@qq.com'
  },
  {
    value: 'pursue97@163.com',
    title: 'pursue97@163.com'
  }
]

const receiveCounter = [
  {
    value: 'zhifubao',
    title: '支付宝'
  },
  {
    value: 'bank',
    title: '银行账户'
  }
]

export interface FooterTitleProps {
  style?: React.CSSProperties
  title?: React.ReactNode
  desc: React.ReactNode
  children?: React.ReactNode
}

const FooterTitle = memo(
  function FooterTitle({ title, desc, children, ...rest }: FooterTitleProps) {
    return (
      <div {...rest}>
        {title && <h3>{title}</h3>}
        <h4>{desc}</h4>
        {children}
      </div>
    )
  },
  () => true
)

export default function StepsForm() {
  const [current, setCurrent] = useState<number>(0)
  const [options, setOptions] = useState<SelectOptions[]>([])
  const [receiveOptions, setReceiveOptions] = useState<SelectOptions[]>([])

  const [descList, setDescList] = useState<TableType[]>([])

  const onNextStep = useCallback(
    (values: Record<FirstFormNameType, any>) => {
      const secondSteps = [
        { key: 'counter', label: '付款账户', content: values.counter },
        { key: 'receiveName', label: '收款账户', content: values.receiveName },
        { key: 'name', label: '收款人姓名', content: values.name },
        {
          key: 'money',
          label: '转账金额',
          content: (
            <>
              <span style={{ fontSize: 20 }}>{values.money}</span>元
            </>
          )
        }
      ]
      setDescList(secondSteps)
      setCurrent(current + 1)
    },
    [current]
  )

  const extraEl = useMemo(() => {
    return (
      <Space>
        <Button
          type='primary'
          onClick={() => {
            setCurrent(0)
          }}>
          再转一笔
        </Button>
        <Button>查看账单</Button>
      </Space>
    )
  }, [])

  const steps = useMemo((): StepsDataType[] => {
    return [
      {
        key: 0,
        title: '填写转账信息',
        content: (
          <FirstStep
            initialValues={{ name: 'xiongxiong', receiveName: '20210520', money: 520 }}
            options={options}
            receiveOptions={receiveOptions}
            submit={onNextStep}
          />
        )
      },
      {
        key: 1,
        title: '确认转账信息',
        content: (
          <SecondStep
            descList={descList}
            message='确认转账后，资金将直接打入对方账户，无法退回'
            previousStep={() => {
              setCurrent(current - 1)
            }}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            nextStep={(values: any) => {
              setCurrent(current + 1)
            }}
          />
        )
      },
      {
        key: 2,
        title: '完成',
        content: <ThirdStep title='操作成功' subTitle='预计两小时到账' extra={extraEl} />
      }
    ]
  }, [options, receiveOptions, descList, current, onNextStep, extraEl])

  useEffect(() => {
    setOptions(paymentCounter)
  }, [])

  useEffect(() => {
    setReceiveOptions(receiveCounter)
  }, [])

  return (
    <Card>
      <Steps className='steps-wrap' current={current} steps={steps} />
      <Divider style={{ margin: '40px 0 24px' }} />
      <FooterTitle title='说明' desc='转账到支付宝账户'>
        <p>
          如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
        </p>
      </FooterTitle>
      <FooterTitle desc='转账到银行卡'>
        <p>
          如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
        </p>
      </FooterTitle>
    </Card>
  )
}
