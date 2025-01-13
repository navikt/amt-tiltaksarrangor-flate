import { createContext, useContext, useState } from 'react'
import { Sortering } from '../utils/sortering-utils'

export interface TiltaksoversiktSokContextProps {
  deltakerSortering?: Sortering
  setDeltakerSortering: React.Dispatch<React.SetStateAction<Sortering | undefined>>
}

const TiltaksoversiktSokContext = createContext<TiltaksoversiktSokContextProps | undefined>(undefined)

const useTiltaksoversiktSokContext = () => {
  const context = useContext(TiltaksoversiktSokContext)

  if (!context) {
    throw new Error('useTiltaksoversiktSokContext must be used within an TiltaksoversiktSokContextProvider')
  }

  return context
}

const TiltaksoversiktSokContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [ deltakerSortering, setDeltakerSortering ] = useState<Sortering>()
  const contextValue: TiltaksoversiktSokContextProps = { deltakerSortering, setDeltakerSortering }

  return (
    <TiltaksoversiktSokContext.Provider value={contextValue} > {children} </TiltaksoversiktSokContext.Provider>
  )
}

export { TiltaksoversiktSokContext, useTiltaksoversiktSokContext, TiltaksoversiktSokContextProvider }
