import React, { useLayoutEffect } from 'react'
import { Form, Input, Select, DatePicker } from 'antd'
import moment from 'moment'
import Modal from '../Modal'
import { DataListType, Status } from '../ProTable'

const { Option } = Select

export interface EditModalProps {
  width: number
  title: string
  visible: boolean
  statusList: Array<{ value: Status; title: string }>
  onClose: () => void
  afterClose: () => void
  editData?: DataListType | undefined
  submit: (values: any) => void
}

export default function EditModal({
  editData,
  width,
  title,
  visible,
  statusList,
  submit,
  onClose,
  afterClose
}: EditModalProps) {
  const [form] = Form.useForm()

  useLayoutEffect(() => {
    if (editData) {
      form.setFieldsValue({
        name: editData.name,
        desc: editData.desc,
        serveCount: editData.serveCount,
        status: editData.status,
        serveTime: moment(moment(editData.serveTime).format('YYYY-MM-DD'), 'YYYY-MM-DD')
      })
    }
    return () => {
      form.resetFields()
    }
  }, [form, editData])

  return (
    <Modal
      width={width}
      title={title}
      visible={visible}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            const serveTime = values.serveTime && values.serveTime.format('YYYY-MM-DD')
            submit({
              ...values,
              serveTime: moment(serveTime).valueOf()
            })
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }}
      onCancel={onClose}
      afterClose={afterClose}
      destroyOnClose
      forceRender>
      <Form form={form} labelCol={{ span: 5 }}>
        <Form.Item label='规则名称' name='name' rules={[{ required: true, message: '规则名称不能为空' }]}>
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item label='描述' name='desc' rules={[{ required: true, message: '描述不能为空' }]}>
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item label='服务调用次数' name='serveCount' rules={[{ required: true, message: '服务调用次数不能为空' }]}>
          <Input placeholder='请输入' type='number' />
        </Form.Item>
        <Form.Item label='状态' name='status' rules={[{ required: true, message: '请选择状态' }]}>
          <Select placeholder='请选择'>
            {statusList.map((item) => (
              <Option key={item.value} value={item.value}>
                {item.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label='上次调用时间'
          name='serveTime'
          rules={[
            { required: true, message: '上次调用时间不能为空' },
            { type: 'object', message: '日期类型' }
          ]}>
          <DatePicker style={{ width: '100%' }} placeholder='请选择' />
        </Form.Item>
      </Form>
    </Modal>
  )
}
