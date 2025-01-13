import { createContext, useContext, useState } from 'react'
import { Sortering } from '../utils/sortering-utils'

export interface DeltakerSorteringContextProps {
  deltakerSortering?: Sortering
  setDeltakerSortering: React.Dispatch<React.SetStateAction<Sortering | undefined>>
}

const DeltakerSorteringContext = createContext<DeltakerSorteringContextProps | undefined>(undefined)

const useDeltakerSorteringContext = () => {
  const context = useContext(DeltakerSorteringContext)

  if (!context) {
    throw new Error('useDeltakerSorteringContext must be used within an DeltakerSorteringContextProvider')
  }

  return context
}

const DeltakerSorteringContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [ deltakerSortering, setDeltakerSortering ] = useState<Sortering>()
  const contextValue: DeltakerSorteringContextProps = { deltakerSortering, setDeltakerSortering }

  return (
    <DeltakerSorteringContext.Provider value={contextValue} > {children} </DeltakerSorteringContext.Provider>
  )
}

export { DeltakerSorteringContext, useDeltakerSorteringContext, DeltakerSorteringContextProvider }
