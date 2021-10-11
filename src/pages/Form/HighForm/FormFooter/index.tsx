import React from 'react'
import { Layout, Button, Space, Form } from 'antd'
import cn from 'classnames'
import { useSelector } from 'react-redux'
import './index.less'

const { Footer } = Layout

export interface FormFooterProp {
  className?: string
  htmltype?: 'submit' | 'reset' | 'button'
  reset: () => void
  submit?: () => void
}

export default function FormFooter({
  className,
  htmltype,
  children,
  reset,
  submit
}: React.PropsWithChildren<FormFooterProp>) {
  const collapsed = useSelector((state: any) => state.app.collapsed)

  const footerWidth = {
    width: collapsed ? 'calc(100% - 48px)' : 'calc(100% - 208px)'
  }
  return (
    <>
      <div className='form-footer-place' />
      <Footer className={cn('form-footer', 'form-footer-layout', className)} style={footerWidth}>
        <Space>
          <span>{children}</span>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button onClick={reset}>重置</Button>
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button type='primary' htmlType={htmltype} onClick={submit}>
              提交
            </Button>
          </Form.Item>
        </Space>
      </Footer>
    </>
  )
}
