import { useEffect, useMemo } from 'react'

export const useStyle = (className: string, querySelector: string): void => {
  const element = useMemo(
    () => document.querySelector(querySelector),
    [querySelector]
  )

  useEffect(() => {
    if (element) {
      if (!element.classList.contains(className)) {
        element.classList.add(className)
      }
    }

    return () => {
      if (element) {
        if (element.classList.contains(className)) {
          element.classList.remove(className)
        }
      }
    }
  }, [element, className])
}
