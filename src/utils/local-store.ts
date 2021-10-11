export const set = (storeName: string, storeValue: any): void => {
  localStorage.setItem(storeName, JSON.stringify(storeValue))
}

export const get = (storeName: string): string | null => {
  if (localStorage.getItem(storeName)) {
    return JSON.parse(localStorage.getItem(storeName) as string)
  }
  return null
}

export const remove = (storeName: string): void => {
  localStorage.removeItem(storeName)
}
