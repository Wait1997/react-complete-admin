import { get, set } from 'Src/utils/local-store'
import enUs from './en-us'
import zhCn from './zh-cn'

export type Language = 'zh-CN' | 'en-US'
export type LangInZh = keyof typeof zhCn
export type LangInEn = keyof typeof enUs
export type LangKeys = Extract<LangInZh, LangInEn>

export const LANGUAGE_KEY = 'locale'

const loadLang = (): Language => {
  const storeLang = get(LANGUAGE_KEY)
  if (storeLang) {
    return storeLang as Language
  }
  return navigator.language as Language
}

let currentLang = loadLang()

const saveLang = (lang: Language) => {
  set(LANGUAGE_KEY, lang)
  return lang
}

// const updateList = new Set<() => void>()

export const getLang = () => currentLang
export const setLang = (lang: Language) => {
  currentLang = saveLang(lang)
  // for (const fn of updateList) fn()
}
