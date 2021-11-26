import React from 'react'
import { Layout } from 'antd'
import './UserLayout.less'

export default function UserLayout(props: any) {
  const { children } = props

  return (
    <Layout className='user-layout'>
      <div className='user-header' />
      <Layout.Content className='user-content'>
        <div className='user-content-top'>
          <div className='user-content-top-header'>antd design</div>
          <div className='user-content-top-desc'>Ant Design admin template</div>
        </div>
        {children}
      </Layout.Content>
      <Layout.Footer className='user-footer'>Ant Design</Layout.Footer>
    </Layout>
  )
}
