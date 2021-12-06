/* eslint-disable no-bitwise */
const uuid = (len: number, radix?: number): string => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz'.split('')
  const uid = []
  radix = radix || chars?.length

  if (len) {
    for (let i = 0; i < len; i++) {
      uid[i] = chars[0 | (Math.random() * radix)]
    }
  } else {
    let r
    // eslint-disable-next-line no-multi-assign
    uid[8] = uid[13] = uid[18] = uid[23] = '-'
    uid[14] = '4'
    for (let i = 0; i < 36; i++) {
      if (!uid[i]) {
        r = 0 | (Math.random() * 16)
        uid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uid.join('')
}

export default uuid
