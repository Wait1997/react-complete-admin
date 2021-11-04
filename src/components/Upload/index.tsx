import React, { useRef, forwardRef } from 'react'
import cn from 'classnames'
import './index.less'
import { message } from 'antd'

export type FileType = 'image' | 'audio' | 'video' | 'attachment'

export type UploadStatus = 'normal' | 'uploading' | 'success' | 'error'

export type ButtonType = 'button' | 'file' | 'dropdown'

export interface ToolbarIconButtonProps {
  icon: React.ReactNode
  className?: string
  text?: string
  type?: ButtonType
  file: FileChooseProps
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  /**
   * 选择文件的回调 如果方法返回 false 则终止上传行为
   */
  onChooseFile?: (data: IChooseFileResult) => void | false
}

export interface IconButtonProps {
  icon: React.ReactNode
  className?: string
  text?: string
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export interface IFileData {
  uid?: string
  name?: string
  url?: string
  size?: number
  file?: File
  progress?: number
  status?: UploadStatus
}

export interface IChooseFileResult {
  fileData?: IFileData | IFileData[]
  fileType?: FileType
}

export interface FileChooseProps {
  fileType?: FileType
  /**
   * 文件是否多选
   */
  multiple?: boolean
  /**
   * 限制接收文件的格式
   */
  accept?: string
}

export interface UploadProps {
  disabled?: boolean
  file: FileChooseProps
  /**
   * 选择文件的回调,如果方法返回 false 则终止上传
   */
  onChooseFile?: (data: IChooseFileResult) => void | false
}

const Upload = forwardRef<HTMLInputElement, UploadProps>(
  ({ disabled, file, onChooseFile }: UploadProps, ref: React.Ref<HTMLInputElement>) => {
    // 处理本地文件上传
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const fileData: File[] = Array.prototype.slice.call(event.target.files)
      const newFileData: IFileData[] = []

      const uids = []
      // 是否允许上传
      let isAllowUpload = true

      for (const [index, fileItem] of fileData.entries()) {
        if (fileItem.size > 10 * 1024 * 1024) {
          message.warning(`文件(${fileItem.name})大小超过了10M`)
          isAllowUpload = false
          return
        }

        uids.push(String(Math.random()))
        newFileData.push({
          url: URL.createObjectURL(fileItem),
          name: fileItem.name,
          size: fileItem.size,
          file: fileItem,
          progress: 1,
          uid: uids[index],
          status: 'normal'
        })
      }

      const res = onChooseFile?.({ fileData: newFileData, fileType: file.fileType })

      event.target.value = ''
      if (res === false || !isAllowUpload) {
        return
      }

      // 上传到服务器
      fileData.map((fileItenm, index) => {})

      // 阻止事件冒泡
      event.stopPropagation()
    }

    return (
      <input
        className='icon-button-file'
        disabled={disabled}
        ref={ref}
        accept={file.accept}
        multiple={file.multiple}
        type='file'
        onChange={handleFileChange}
      />
    )
  }
)

Upload.displayName = 'Upload'

const IconButton: React.FunctionComponent<IconButtonProps> = ({
  icon,
  className,
  text,
  disabled,
  onClick,
  children
}) => {
  return (
    <div className={cn([disabled], 'toolbar-button', className)} onClick={onClick}>
      {icon}
      <span className='toolbar-button-text'>{text}</span>
      {children}
    </div>
  )
}

const HBToolbarButton = ({
  icon,
  className,
  type = 'file',
  disabled,
  file,
  text,
  onChooseFile,
  onClick
}: ToolbarIconButtonProps) => {
  const fileRef = useRef<HTMLInputElement | null>(null)

  // 点击
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (disabled) {
      return
    }
    if (type === 'file' && fileRef.current) {
      fileRef.current?.click()
    }
    // 回调函数
    onClick?.(event)
  }
  return (
    <IconButton className={className} icon={icon} text={text} disabled={disabled} onClick={handleClick}>
      {type === 'file' && <Upload ref={fileRef} disabled={disabled} file={file} onChooseFile={onChooseFile} />}
    </IconButton>
  )
}

export default HBToolbarButton
