import React, { memo, useContext } from 'react'
import { LangKeys } from 'Src/locales'
import enUs from 'Src/locales/en-us'
import zhCn from 'Src/locales/zh-cn'
import { LangContext } from '../index'

export const useFormatMessage = (id: LangKeys, args?: Record<string, React.ReactNode>) => {
  const { defaultLang } = useContext(LangContext)
  const dictionary = defaultLang === 'zh-CN' ? zhCn : enUs
  const effectKeys = dictionary[id].split(/{\s*(\w+)\s*}/).filter(Boolean)

  return effectKeys.map<React.ReactNode>((item) => {
    if (args && item in args) {
      return args[item]
    }
    return item
  })
}

const FormattedMessage: React.FC<{ id: LangKeys; args?: Record<string, React.ReactNode> }> = ({ id, args }) => {
  const content = useFormatMessage(id, args)
  return <>{content}</>
}

export default memo(FormattedMessage)
