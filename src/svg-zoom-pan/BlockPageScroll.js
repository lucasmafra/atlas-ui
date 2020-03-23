import React, { useRef, useEffect } from 'react'

const BlockPageScroll = ({ children, style }) => {
  const scrollRef = useRef(null)
  useEffect(() => {
    const scrollEl = scrollRef.current
    scrollEl.addEventListener('wheel', stopScroll)
    return () => scrollEl.removeEventListener('wheel', stopScroll)
  }, [])
  const stopScroll = (e) => e.preventDefault()
  return (
    <div ref={scrollRef} style={style}>
      {children}
    </div>
  )
}

export default BlockPageScroll
