import React from 'react'
import { Steps as AntdSteps } from 'antd'

const { Step } = AntdSteps

export type StepsDataType = {
  key: string | number
  title: React.ReactNode
  content?: React.ReactNode
}

export interface StepsProps {
  initial?: number
  current: number
  steps: StepsDataType[]
  className?: string
  style?: React.CSSProperties
}

export default function Steps({
  children,
  className,
  initial = 0,
  current,
  steps,
  ...rest
}: React.PropsWithChildren<StepsProps>) {
  return (
    <>
      <AntdSteps size='default' initial={initial} current={current} {...rest}>
        {steps.map((step) => (
          <Step key={step.key} title={step.title} />
        ))}
      </AntdSteps>
      <div className={className}>{children || steps[current].content}</div>
    </>
  )
}
