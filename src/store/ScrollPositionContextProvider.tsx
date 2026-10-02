import { createContext, use, useState } from 'react'

export interface ScrollPositionContextProps {
  scrollPositions: Record<string, number>
  activeKey: string | null
    setActiveKey: (key: string | null) => void
    saveActiveScrollPosition: () => void
}

const ScrollPositionContext = createContext<ScrollPositionContextProps | undefined>(undefined)

const useScrollPositionContext = () => {
  const context = use(ScrollPositionContext)

  if (!context) {
    throw new Error('useScrollPositionContext must be used within an ScrollPositionContextProvider')
  }

  return context
}

const ScrollPositionContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [ scrollPositions, setScrollPositions ] = useState<Record<string, number>>({})
  const [ activeKey, setActiveKey ] = useState<string | null>(null)

  const saveScrollPosition = (key: string, position: number) => {
    setScrollPositions((prev) => ({ ...prev, [key]: position }))
  }
    const saveActiveScrollPosition = () => {
        if (activeKey) saveScrollPosition(activeKey, window.scrollY)
    }

  const contextValue: ScrollPositionContextProps = {
    scrollPositions,
    activeKey,
      setActiveKey,
      saveActiveScrollPosition
  }

  return (
    <ScrollPositionContext value={contextValue}>{children}</ScrollPositionContext>
  )
}

export { ScrollPositionContext, useScrollPositionContext, ScrollPositionContextProvider }
