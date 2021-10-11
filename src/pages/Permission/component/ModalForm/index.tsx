import React, { memo } from 'react'
import { Modal } from 'antd'

export interface ModalFormProps {
  title: React.ReactNode
  visible: boolean
  onOk: () => void
  onCancel: () => void
  children?: React.ReactNode
}

export default memo(function ModalForm({ visible, title, onOk, onCancel, children }: ModalFormProps) {
  return (
    <Modal
      visible={visible}
      title={title}
      onOk={onOk}
      onCancel={onCancel}
      mask={false}
      maskClosable={false}
      forceRender>
      {children}
    </Modal>
  )
})
