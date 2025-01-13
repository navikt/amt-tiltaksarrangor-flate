import { createContext, useContext, useState } from 'react'

export interface TilbakelenkeContextProps {
  tilbakeTilUrl?: string | null
  setTilbakeTilUrl: React.Dispatch<React.SetStateAction<string | undefined | null>>
}

const TilbakelenkeContext = createContext<TilbakelenkeContextProps | undefined>(undefined)

const useTilbakelenkeContext = () => {
  const context = useContext(TilbakelenkeContext)

  if (!context) {
    throw new Error('useTilbakelenkeContext must be used within an TilbakelenkeContextProvider')
  }

  return context
}

const TilbakelenkeContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [ tilbakeTilUrl, setTilbakeTilUrl ] = useState<string | null>()
  const contextValue: TilbakelenkeContextProps = { tilbakeTilUrl, setTilbakeTilUrl }

  return (
    <TilbakelenkeContext.Provider value={contextValue} > {children} </TilbakelenkeContext.Provider>
  )
}

export { TilbakelenkeContext, useTilbakelenkeContext, TilbakelenkeContextProvider }
