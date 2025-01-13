import { createContext, useContext, useEffect, useState } from 'react'
import { MineDeltakerlister } from '../api/data/deltaker'
import { fetchDeltakeroversikt } from '../api/tiltak-api'
import { isResolved, UsePromise, usePromise } from '../utils/use-promise'
import { AxiosResponse } from 'axios'

export interface KoordinatorsDeltakerlisterContextProps {
  fetchDeltakerlister: () => void,
  fetchMineDeltakerlisterPromise: UsePromise<AxiosResponse<MineDeltakerlister>>,
  koordinatorsDeltakerlister?: MineDeltakerlister,
  setKoordinatorsDeltakerlister: React.Dispatch<React.SetStateAction<MineDeltakerlister | undefined>>
}

const KoordinatorsDeltakerlisterContext = createContext<KoordinatorsDeltakerlisterContextProps | undefined>(undefined)

const useKoordinatorsDeltakerlisterContext = () => {
  const context = useContext(KoordinatorsDeltakerlisterContext)

  if (!context) {
    throw new Error('useKoordinatorsDeltakerlisterContext must be used within an KoordinatorsDeltakerlisterContextProvider')
  }

  return context
}

const KoordinatorsDeltakerlisterContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [ koordinatorsDeltakerlister, setKoordinatorsDeltakerlister ] =
    useState<MineDeltakerlister>()
  const fetchMineDeltakerlisterPromise =
    usePromise<AxiosResponse<MineDeltakerlister>>()

  const fetchDeltakerlister = () =>
    fetchMineDeltakerlisterPromise.setPromise(fetchDeltakeroversikt)

  useEffect(() => {
    if (isResolved(fetchMineDeltakerlisterPromise)) {
      setKoordinatorsDeltakerlister(fetchMineDeltakerlisterPromise.result.data)
    }
  }, [ fetchMineDeltakerlisterPromise.result ])

  const contextValue: KoordinatorsDeltakerlisterContextProps = {
    koordinatorsDeltakerlister,
    setKoordinatorsDeltakerlister,
    fetchMineDeltakerlisterPromise,
    fetchDeltakerlister
  }

  return (
    <KoordinatorsDeltakerlisterContext.Provider value={contextValue} > {children} </KoordinatorsDeltakerlisterContext.Provider>
  )
}

export { KoordinatorsDeltakerlisterContext, useKoordinatorsDeltakerlisterContext, KoordinatorsDeltakerlisterContextProvider }
