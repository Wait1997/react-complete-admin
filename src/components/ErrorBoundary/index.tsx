/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { Result, Button } from 'antd'

export interface ErrorProps {
  children?: React.ReactNode
}

export interface ErrorStateProps {
  hasError: boolean
}
export default class ErrorBoundary extends React.Component<ErrorProps, ErrorStateProps> {
  constructor(props: ErrorProps) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError(error: unknown) {
    return { hasError: true }
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    // 可以将错误日志上报给服务器
    console.log(error)
    console.log(errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status='warning'
          title='There are some problems with your operation.'
          extra={<Button type='primary'>Go Console</Button>}
        />
      )
    }
    return this.props.children
  }
}
