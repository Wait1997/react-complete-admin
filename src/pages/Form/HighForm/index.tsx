/* eslint-disable no-console */
/* eslint-disable unicorn/consistent-function-scoping */
import React, { useState, useEffect } from 'react'
import { Form, message, Popover } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'
import moment from 'moment'
import FormCard from './FormCard'
import FormTopItem from './FormTopItem'
import FormBottomItem from './FormBottomItem'
import FormTable, { TableDataType } from './FormTable'
import FormFooter from './FormFooter'
import './index.less'

// 仓库管理员
const adminList = [
  { value: 'chen', title: '陈小姐' },
  { value: 'liu', title: '刘小云' }
]

// 仓库审批人
const reiviewList = [
  { value: 'chen', title: '陈曦' },
  { value: 'li', title: '李霞' }
]

// 执行人
const executorList = [
  { value: 'chen', title: '陈丽' },
  { value: 'xiong', title: '熊熊' }
]

// 责任人
const responseList = [
  { value: 'chen', title: '陈丽' },
  { value: 'xiong', title: '熊熊' }
]

export type Option = {
  value: string
  title: string
}

export default function HighForm() {
  const fieldLabels = {
    capsuleName: '仓库名',
    capsuleDomain: '仓库域名',
    capsuleAdmin: '仓库管理员',
    reviewPerson: '审批人',
    effectiveDate: '生效日期',
    capsuleType: '仓库类型',
    taskName: '任务名',
    taskDesc: '任务描述',
    executor: '执行人',
    responsible: '责任人',
    effectiveTime: '生效日期',
    taskType: '任务类型'
  }

  const [form] = Form.useForm()
  const [errorList, setErrorList] = useState<React.ReactNode[]>([])
  const [executorLists, setExectorLists] = useState<Option[]>([])
  const [responseLists, setResponseLists] = useState<Option[]>([])
  const [adminLists, setAdminLists] = useState<Option[]>([])
  const [reviewLists, setReviewLists] = useState<Option[]>([])
  const [tableData, setTableData] = useState<TableDataType[]>([])

  const submit = (values: any) => {
    const { effectiveDate, effectiveTime } = values

    const startDate = moment(effectiveDate[0]).valueOf()
    const endDate = moment(effectiveDate[1]).valueOf()
    const date = [startDate, endDate]
    const time = moment(effectiveTime).valueOf()
    const postForm = {
      ...values,
      effectiveDate: date,
      effectiveTime: time
    }
    console.log(postForm)
    message.success('success')
  }

  const scrollToField = (key: keyof typeof fieldLabels) => {
    const labelNode = document.querySelector(`label[for="${key}"]`)
    if (labelNode) {
      labelNode.scrollIntoView(true)
    }
  }

  const submitFailed = (errorInfo: any) => {
    const { errorFields } = errorInfo
    // 表单校验的错误信息
    const errorlist = errorFields.map((err: any) => {
      if (!err || err.errors.length === 0) {
        return null
      }
      const key = err.name[0] as keyof typeof fieldLabels
      return (
        <div
          key={key}
          className='error-wrap'
          onClick={() => {
            scrollToField(key)
          }}>
          <CloseCircleOutlined className='error-icon' />
          <div className='error-content'>
            <p>{err.errors[0]}</p>
            <span>{fieldLabels[key]}</span>
          </div>
        </div>
      )
    })
    setErrorList(errorlist)
  }

  useEffect(() => {
    const list: TableDataType[] = [
      {
        key: 1,
        name: 'kesha',
        worknum: 'no1001',
        department: 'kesha adc'
      },
      {
        key: 2,
        name: 'yasuo',
        worknum: 'no1002',
        department: 'happy boy'
      },
      {
        key: 3,
        name: 'dema',
        worknum: 'no1003',
        department: 'ben bi hero'
      }
    ]
    setTableData(list)
  }, [])

  return (
    <Form form={form} onFinish={submit} onFinishFailed={submitFailed}>
      <FormCard title='仓库管理' className='card-wrap'>
        <FormTopItem
          fieldLabels={fieldLabels}
          reviewLists={reviewLists}
          adminLists={adminLists}
          onCapsuleAdminOpen={(open) => {
            if (open && adminLists.length === 0) {
              setAdminLists(adminList)
            }
          }}
          onReviewPersonOpen={(open) => {
            if (open && reviewLists.length === 0) {
              setReviewLists(reiviewList)
            }
          }}
        />
      </FormCard>
      <FormCard title='任务管理' className='card-wrap'>
        <FormBottomItem
          fieldLabels={fieldLabels}
          executorLists={executorLists}
          responseLists={responseLists}
          onExectorOpen={(open) => {
            if (open && executorLists.length === 0) {
              setExectorLists(executorList)
            }
          }}
          onResonseOpen={(open) => {
            if (open && responseLists.length === 0) {
              setResponseLists(responseList)
            }
          }}
        />
      </FormCard>
      <FormCard title='成员管理'>
        <FormTable
          tableData={tableData}
          callbackData={(data) => {
            setTableData(data)
          }}
        />
      </FormCard>
      <FormFooter
        htmltype='submit'
        reset={() => {
          form.resetFields()
        }}>
        {errorList && errorList.length > 0 && (
          <Popover
            overlayClassName='popover-wrap'
            title={<span>表单验证信息</span>}
            content={errorList}
            getPopupContainer={(trigger: HTMLElement) => {
              console.log(trigger)
              if (trigger && trigger.parentNode) {
                return trigger.parentNode as HTMLElement
              }
              return trigger
            }}
            trigger='click'>
            <span className='footer-form-icon-wrap'>
              <CloseCircleOutlined className='footer-form-icon-tip' />
              <span className='footer-form-num'>{errorList.length}</span>
            </span>
          </Popover>
        )}
      </FormFooter>
    </Form>
  )
}
