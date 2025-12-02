import { useEffect, useState } from 'react'

const useSessionStorage = <T>(
  storageKey: string,
  fallbackState: T
): [T, (value: T) => void] => {
  const [value, setValue] = useState<T>(() => {
    const sessionStorageItem = sessionStorage.getItem(storageKey)
    return sessionStorageItem ? JSON.parse(sessionStorageItem) : fallbackState
  })

  useEffect(() => {
    sessionStorage.setItem(storageKey, JSON.stringify(value))
  }, [value, storageKey])

  return [value, setValue]
}

export default useSessionStorage
