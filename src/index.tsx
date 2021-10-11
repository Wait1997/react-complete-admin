import React from 'react'
import ReactDom from 'react-dom'
import App from 'Src/app'
import 'normalize.css'
import 'antd/dist/antd.css'

// 热更新
if (module && module.hot) {
  module.hot.accept()
}

ReactDom.render(<App />, document.querySelector('#root'))
