import React, { forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useState } from 'react'
import FormContext from './formContext'
import useForm from './useForm'
import Label from './Label.jsx'
import Message from './Message.jsx'

function Form({ form, onFinish, onFinishFailed, initialValues = {}, children }, ref) {
  const formInstance = useForm(form, initialValues)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { setCallback, dispatch, ...providerFormInstance } = formInstance

  setCallback({ onFinish, onFinishFailed })

  useImperativeHandle(ref, () => providerFormInstance)

  return (
    <form
      onReset={(e) => {
        e.stopPropagation()
        e.preventDefault()
        formInstance.resetFields()
      }}
      onSubmit={(e) => {
        e.stopPropagation()
        e.preventDefault()
        formInstance.submit()
      }}>
      <FormContext.Provider value={formInstance}>{children}</FormContext.Provider>
    </form>
  )
}

function FormItem({
  name,
  label,
  height = 50,
  labelWidth,
  required = false,
  trigger = 'onChange',
  validateTrigger = 'onBlur',
  rules,
  children
}) {
  const formInstance = useContext(FormContext)
  const { registerValidateFields, dispatch, unRegisterValidate } = formInstance

  const [, forceUpdate] = useState({})

  const onStoreChange = useMemo(() => {
    return {
      changeValue() {
        forceUpdate({})
      }
    }
  }, [])

  useEffect(() => {
    if (name) {
      registerValidateFields(name, onStoreChange, { ...rules, required })
    }
    return () => {
      if (name) {
        unRegisterValidate(name)
      }
    }
  }, [name, onStoreChange, required, rules, registerValidateFields, unRegisterValidate])

  const getControlled = (childElement) => {
    const mergeChildProps = { ...childElement.props }
    if (!name) {
      return mergeChildProps
    }

    const handleChange = (e) => {
      const { value } = e.target
      dispatch({ type: 'setFieldsValue' }, name, value)
    }
    mergeChildProps[trigger] = handleChange

    if (required || rules) {
      mergeChildProps[validateTrigger] = (e) => {
        if (validateTrigger === trigger) {
          handleChange(e)
        }
        dispatch({ type: 'validateFieldValue' }, name)
      }
    }
    mergeChildProps.value = dispatch({ type: 'getFieldValue' }, name) || ''

    return mergeChildProps
  }

  return (
    <Label label={label} height={height} labelWidth={labelWidth} required={required}>
      {React.isValidElement(children) ? React.cloneElement(children, getControlled(children)) : children}
      <Message name={name} {...dispatch({ type: 'getFieldModel' }, name)} />
    </Label>
  )
}

const ForwardForm = forwardRef(Form)
ForwardForm.Item = FormItem

export default ForwardForm
