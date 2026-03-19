import { createContext, use, useState } from 'react'
import { Rolle } from '../api/data/ansatt'

export interface InnloggetBrukerContextProps {
  roller: Rolle[]
  setRoller: React.Dispatch<React.SetStateAction<Rolle[]>>
}

const InnloggetBrukerContext = createContext<InnloggetBrukerContextProps | undefined>(undefined)

const useInnloggetBrukerContext = () => {
  const context = use(InnloggetBrukerContext)

  if (!context) {
    throw new Error('useInnloggetBrukerContext must be used within an InnloggetBrukerContextProvider')
  }

  return context
}

const InnloggetBrukerContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [ roller, setRoller ] = useState<Rolle[]>([])
  const contextValue: InnloggetBrukerContextProps = { roller, setRoller }

  return (
    <InnloggetBrukerContext value={contextValue} > {children} </InnloggetBrukerContext>
  )
}

export { InnloggetBrukerContext, useInnloggetBrukerContext, InnloggetBrukerContextProvider }
