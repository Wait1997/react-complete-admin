import React, { useImperativeHandle } from 'react'
import cn from 'classnames'
import { FormProps } from './type'

const defaultContext = {}
const FormContext = React.createContext(defaultContext)

const Form: React.ForwardRefRenderFunction<any, FormProps> = (
  { initialValues, className, children, onFinish, onFinishFailed, ...rest },
  ref
) => {
  useImperativeHandle(ref, () => ({}))
  return (
    <div className={cn(className)} {...rest}>
      <FormContext.Provider value={{}}>{children}</FormContext.Provider>
    </div>
  )
}

const FormItem: React.ForwardRefRenderFunction<any, any> = ({ children }, ref) => {
  return (
    <div>
      {/* {React.isValidElement(children)
        ? React.cloneElement(children, {
            value: 'xxx',
            name: 'xxxx',
            onChange: 'xxx',
            onBlur: 'xxx'
          })
        : children} */}
      {children}
    </div>
  )
}

const ForwardForm = React.forwardRef<any, FormProps>(Form)

export default ForwardForm
