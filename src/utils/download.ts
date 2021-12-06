/* eslint-disable promise/no-callback-in-promise */
/* eslint-disable no-shadow */
import { saveAs } from 'file-saver'
import JSZip from 'jszip'

// 使用xhr或者axios下载数据
export enum FetchType {
  Xhr = 'xhr',
  Axios = 'axios'
}

// 用于下载一些blob数据
export function fetchBlob() {
  return Promise.resolve()
}

// clone https://github.com/eligrey/FileSaver.js/blob/master/src/FileSaver.js
function click(node: any) {
  try {
    node.dispatchEvent(new MouseEvent('click'))
  } catch {
    const evt = document.createEvent('MouseEvents')
    evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null)
    node.dispatchEvent(evt)
  }
}

/**
 * 下载简单的数据
 * @param url
 * @param name
 */
export function downloadURL(url: string, name = '') {
  const link = document.createElement('a')
  link.download = name
  link.href = url
  if ('download' in document.createElement('a')) {
    document.body.append(link)
    link.click()
    link.remove()
  } else {
    // 对不支持download进行兼容
    click(link)
  }
}

/**
 * 下载一个blob数据
 * @param blob
 * @param fileName
 */
export function downloadBlob(blob: Blob, fileName = '') {
  const objectUrl = URL.createObjectURL(blob)
  downloadURL(objectUrl, fileName)
  // 手动标记用于内存回收，防止内存泄漏
  URL.revokeObjectURL(objectUrl)
}

export interface FileToZipOption {
  files: Array<{
    name: string
    url: string
    folder: string
  }>
  zipName?: string
}

export interface FileToZipCallback {
  stage: 'download' | 'zip'
  percent: number // [下载/压缩]多少了
  currentFile: string // 正在[下载/压缩]的文件名字
  downloadFaleName?: string // 下载失败的名字
  msg?: string
}

/**
 * 批量下载数据
 * @param option
 * @param callback
 * @param fetch
 */
export async function downloadFileToZip(option: FileToZipOption, callback?: (call: FileToZipCallback) => void) {
  let index = 1
  const zip = new JSZip()

  const promises = option.files.map((file) =>
    fetchBlob()
      .then((blob: any) => {
        if (callback) {
          callback({
            stage: 'download',
            percent: Number(((index / option.files.length) * 100).toFixed(2)),
            currentFile: file.name
          })
        }
        index += 1
        if (file.folder) {
          zip.folder(file.folder)?.file(file.name, blob, { binary: true })
        } else {
          zip.file(file.name, blob, { binary: true })
        }
        return blob
      })
      .catch((error) => {
        if (callback) {
          callback({
            stage: 'download',
            percent: Number(((index / option.files.length) * 100).toFixed(2)),
            currentFile: file.name,
            downloadFaleName: file.name,
            msg: error.message
          })
        }
        index += 1
        return error
      })
  )

  await Promise.all(promises)

  // zip.folder(option.zipName)
  const zipBlob = await zip.generateAsync({ type: 'blob' }, (metadata) => {
    if (callback) {
      return callback({
        stage: 'zip',
        percent: Number(metadata.percent.toFixed(2)),
        currentFile: metadata.currentFile
      })
    }
    return null
  })
  saveAs(zipBlob, option.zipName || '压缩文件.zip')
}
