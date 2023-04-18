import { useEffect, useRef, useState } from 'react'

const useElementOnScreen = (options) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  
  const callbackFunction = (entries) => {
    const [entry] = entries
    setIsVisible(entry.isIntersecting)
  }

  useEffect(() => {

    const observer = new IntersectionObserver(callbackFunction, options)
    if ( ref.current ) observer.observe(ref.current)

    return () => {
      if ( ref.current ) observer.unobserve(ref.current)
    }
  }, [ref, options])
  
  return [ref, isVisible]
}

export default useElementOnScreen