import React from 'react'
import { Modal as AntdModal } from 'antd'
import { LegacyButtonType } from 'antd/lib/button/button'

export interface TableModalProps {
  title: string
  visible: boolean
  width?: string | number
  mask?: boolean
  footer?: React.ReactNode
  okText?: string
  okType?: LegacyButtonType
  destroyOnClose?: boolean
  forceRender: boolean
  afterClose: () => void
  onCancel: () => void
  onOk: (values: any) => void
}

export default function Modal({
  title,
  width,
  visible,
  mask = false,
  okText = '提交',
  okType = 'primary',
  footer,
  destroyOnClose = false,
  children,
  afterClose,
  onCancel,
  onOk,
  forceRender = false
}: React.PropsWithChildren<TableModalProps>) {
  return (
    <AntdModal
      visible={visible}
      width={width}
      title={title}
      mask={mask}
      okText={okText}
      okType={okType}
      footer={footer}
      destroyOnClose={destroyOnClose}
      okButtonProps={{ htmlType: 'submit' }}
      onOk={onOk}
      onCancel={onCancel}
      afterClose={afterClose}
      forceRender={forceRender}>
      {children}
    </AntdModal>
  )
}
