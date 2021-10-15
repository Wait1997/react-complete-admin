import React, { useState } from 'react'
import useTitle from 'Src/hooks/useTitle'
import FormattedMessage from 'Src/components/LangProvider/FormattedMessage'
import { CSSTransition } from 'react-transition-group'
import { Button } from 'antd'
import './index.less'

export default function Workplace() {
  useTitle()
  const [show, setShow] = useState(true)
  return (
    <div>
      <FormattedMessage id='workSpace' args={{ name: '朱艳' }} />
      <CSSTransition classNames='fade' in={show} timeout={300} unmountOnExit>
        <div>123</div>
      </CSSTransition>
      <div>
        <Button
          type='primary'
          onClick={() => {
            setShow(!show)
          }}>
          按钮
        </Button>
      </div>
    </div>
  )
}
