import { useRef } from 'react'
import FormStore from './instance'

export default function useForm(form, initFormValue) {
  const formRef = useRef(null)
  if (!formRef.current) {
    if (form) {
      formRef.current = form
    } else {
      const formStoreCurrent = new FormStore(initFormValue)
      formRef.current = formStoreCurrent.getForm()
    }
  }
  return formRef.current
}
