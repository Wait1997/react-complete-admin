import React, { useRef, useState, useEffect } from 'react'
import cn from 'classnames'
import './index.less'

export interface VirtualListProp<T> {
  /**
   * @description 每个列表项的height
   */
  height: number
  /**
   * 最外层容器的高度
   */
  wrapheight: number
  /**
   * @description 缓冲区的个数
   */
  bufferCount: number
  /**
   * @description 要渲染的数据列表
   */
  dataList: T[]
  className?: string
}

export default function VirtualList<T>({
  height,
  wrapheight,
  bufferCount,
  className,
  dataList,
  children
}: React.PropsWithChildren<VirtualListProp<T>>) {
  const box = useRef<HTMLDivElement>(null)
  const scroll = useRef<HTMLDivElement>(null)
  const context = useRef<HTMLDivElement>(null)
  const renderCount = useRef<number>(0)
  const position = useRef<number[]>([])

  // 真实渲染的列表
  const [renderList, setRenderList] = useState<T[]>([])

  const handleScroll = (): void => {
    if (scroll.current) {
      const { scrollTop } = scroll.current
      const totalCount = renderCount.current
      // 滚动出去的整数个height的偏移量
      const currentOffset = scrollTop - (scrollTop % height)
      // 滚动出去的item的个数
      const start = Math.floor(scrollTop / height)
      if (context.current) {
        // 同步偏移
        context.current.style.transform = `translate3d(0, ${currentOffset}px, 0)`
      }
      const end = Math.floor(scrollTop / height + totalCount + 1)

      if (end !== position.current[1] || start !== position.current[0]) {
        position.current = [start, end]
        setRenderList(dataList.slice(start, end))
      }
    }
  }

  useEffect(() => {
    if (box.current && dataList.length > 0) {
      const wrapHeight = box.current.clientHeight
      // 渲染的总数
      const totalCount = wrapHeight && Math.ceil(wrapHeight / height) + bufferCount
      renderCount.current = totalCount
      // 当前的位置
      position.current = [0, totalCount]
      setRenderList(dataList.slice(0, totalCount))
    }
  }, [bufferCount, height, wrapheight, dataList])

  const { length } = dataList

  return (
    <div className={cn(className)} ref={box}>
      <div className='scroll_box' style={{ height: wrapheight }} ref={scroll} onScroll={handleScroll}>
        <div className='scroll_hold' style={{ height: length * height }} />
        <div className='context' ref={context}>
          {typeof children === 'function' ? children(renderList) : children}
        </div>
      </div>
    </div>
  )
}
