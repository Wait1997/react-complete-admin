const instanceApi = [
  'setCallback',
  'dispatch',
  'registerValidateFields',
  'resetFields',
  'setFields',
  'setFieldsValue',
  'getFieldsValue',
  'getFieldValue',
  'validateFields'
]

// 是否是正则表达式
export const isReg = (value) => value instanceof RegExp

export default class FormStore {
  constructor(initFormValue) {
    this.model = {}
    this.control = {}
    this.callback = {}
    this.penddingValidateQueue = []
    this.initFormValue = initFormValue
  }

  // 提供操作form的方法
  getForm() {
    return instanceApi.reduce((all, item) => {
      all[item] = this[item].bind(this)
      return all
    }, {})
  }

  // 处理回调函数
  setCallback(callback) {
    if (callback) {
      this.callback = callback
    }
  }

  // 触发事件
  dispatch(action, ...args) {
    if (!action && typeof action !== 'object') {
      return null
    }

    const { type } = action
    if (!instanceApi.includes(type)) {
      return null
    }
    if (typeof this[type] === 'function') {
      return this[type](...args)
    }
    return this[type](...args)
  }

  registerValidateFields(name, control, model) {
    if (this.initFormValue[name]) {
      model.value = this.initFormValue[name]
    }
    const validate = FormStore.createValidate(model)
    this.model[name] = validate
    this.control[name] = control
  }

  unRegisterValidate(name) {
    delete this.model[name]
    delete this.control[name]
  }

  resetFields() {
    for (const modelName of Object.keys(this.model)) {
      this.setValueClearStatus(this.model[modelName], modelName, null)
    }
  }

  setFields(model) {
    if (typeof model !== 'object') {
      return false
    }
    for (const modelName of Object.keys(model)) {
      this.setFieldsValue(modelName, model[modelName])
    }
    return true
  }

  setFieldsValue(name, modelValue) {
    const model = this.model[name]
    if (!model) {
      return false
    }
    if (typeof modelValue === 'object') {
      const { value, message, rule } = modelValue
      if (value) {
        model.value = value
      }
      if (message) {
        model.message = message
      }
      if (rule) {
        model.rule = rule
      }
      model.status = 'pending'
      this.validateFieldValue(name)
    }
    this.setValueClearStatus(model, name, modelValue)
    return true
  }

  // 通知对应formItem更新
  notifyChange(name) {
    const controller = this.control[name]
    if (controller) {
      controller?.changeValue()
    }
  }

  setValueClearStatus(model, name, value) {
    model.value = value
    model.status = 'pending'
    this.notifyChange(name)
  }

  getFieldsValue() {
    Object.keys(this.model).map((modelName) => {
      return {
        [modelName]: this.model[modelName]
      }
    })
  }

  getFieldModel(name) {
    const model = this.mode[name]

    return model || {}
  }

  getFieldValue(name) {
    const model = this.model[name]
    if (!model && this.initFormValue[name]) {
      return this.initFormValue[name]
    }
    return model ? model.value : null
  }

  validateFieldValue(name) {
    const model = this.model[name]
    if (!model) {
      return null
    }

    const lastStatus = model.status

    const { required, rule, value } = model
    let status = 'resolve'

    if (required && !value) {
      status = 'reject'
    }
    if (isReg(rule)) {
      status = rule.test(value) ? 'resolve' : 'reject'
    }
    if (typeof rule === 'function') {
      status = rule(value) ? 'resolve' : 'reject'
    }
    model.status = status

    if (lastStatus !== status) {
      const notify = this.notifyChange.bind(this, name)
      this.penddingValidateQueue.push(notify)
    }
    this.scheduleValidate()
    return status
  }

  scheduleValidate() {
    for (const notify of this.penddingValidateQueue) {
      notify()
    }
  }

  validateFields(callback) {
    let status = true
    for (const modelName of Object.keys(this.model)) {
      const modelStates = this.validateFieldValue(modelName)
      if (modelStates === 'reject') {
        status = false
      }
    }
    callback(status)
  }

  submit(cb) {
    this.validateFields((res) => {
      const { onFinish, onFinishFailed } = this.callback
      if (cb) {
        cb(res)
      }
      if (!res && onFinishFailed && typeof onFinishFailed === 'function') {
        onFinishFailed()
      }
      if (onFinish && typeof onFinish === 'function') {
        onFinish(this.getFieldsValue())
      }
    })
  }

  static createValidate(validate) {
    const { value, rule, required, message } = validate
    return {
      value,
      rule: rule || (() => true),
      required: required || false,
      message: message || '',
      status: 'pending'
    }
  }
}
