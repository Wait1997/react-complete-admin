import React, { createContext, useCallback, useState } from 'react'
import { ConfigProvider } from 'antd'
import { getLang, setLang, Language } from 'Src/locales'
import zhCN from 'antd/es/locale/zh_CN'
import enUS from 'antd/es/locale/en_US'

export type LangContextType = { defaultLang: Language; checkChange: (lang: Language) => void }
export const LangContext = createContext<LangContextType>({ defaultLang: 'zh-CN', checkChange: () => null })

export interface LangProviderProps {
  children?: React.ReactNode
}

const lang = getLang()

const LangProvider: React.FC<LangProviderProps> = ({ children }) => {
  const [defaultLang, setDefaultLang] = useState<Language>(lang)

  const checkChange = useCallback((language: Language) => {
    setDefaultLang(language)
    setLang(language)
  }, [])

  const antdLocale = defaultLang === 'zh-CN' ? zhCN : enUS
  return (
    <LangContext.Provider value={{ defaultLang, checkChange }}>
      <ConfigProvider locale={antdLocale}>{children}</ConfigProvider>
    </LangContext.Provider>
  )
}

export default LangProvider
