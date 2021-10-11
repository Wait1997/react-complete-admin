import React from 'react'
import Router from 'Router/index'
import { Provider } from 'react-redux'
import LangProvider from 'Components/LangProvider'
import store from './store'

export default function App() {
  return (
    <LangProvider>
      <Provider store={store}>
        <Router />
      </Provider>
    </LangProvider>
  )
}
