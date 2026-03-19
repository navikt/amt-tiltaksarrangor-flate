import { createContext, use, useState } from 'react'
import { Deltaker } from '../../../../api/data/deltaker'

export interface DeltakerContextProps {
  deltaker: Deltaker
  setDeltaker: React.Dispatch<React.SetStateAction<Deltaker>>
}

const DeltakerContext = createContext<DeltakerContextProps | undefined>(undefined)

const useDeltakerContext = () => {
  const context = use(DeltakerContext)

  if (!context) {
    throw new Error('useDeltakerContext must be used within an DeltakerContextProvider')
  }

  return context
}

const DeltakerContextProvider = ({
  initialDeltaker,
  children
}: {
  initialDeltaker: Deltaker
  children: React.ReactNode
}) => {
  const [ deltaker, setDeltaker ] = useState(initialDeltaker)
  const contextValue: DeltakerContextProps = { deltaker, setDeltaker }

  return (
    <DeltakerContext value={contextValue} > {children} </DeltakerContext>
  )
}

export { DeltakerContext, useDeltakerContext, DeltakerContextProvider }
