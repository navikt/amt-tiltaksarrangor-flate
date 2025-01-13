import { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { fetchMineRoller } from './api/tiltak-api'
import { Header } from './component/felles/header/Header'
import { AppRoutes } from './Routes'
import {
  isNotStartedOrPending,
  isRejected,
  isResolved,
  usePromise
} from './utils/use-promise'
import { Rolle } from './api/data/ansatt'
import { useInnloggetBrukerContext } from './store/InnloggetBrukerContextProvider'
import { useKoordinatorsDeltakerlisterContext } from './store/KoordinatorsDeltakerlisterContextProvider'
import { SpinnerPage } from './component/felles/spinner-page/SpinnerPage'
import { ErrorPage } from './component/page/error/ErrorPage'

export const App = (): React.ReactElement => {
  const fetchMineRollerPromise =
    usePromise<AxiosResponse<Rolle[]>>(fetchMineRoller)
  const { roller, setRoller } = useInnloggetBrukerContext()
  const { fetchDeltakerlister } = useKoordinatorsDeltakerlisterContext()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    if (isResolved(fetchMineRollerPromise)) {
      setRoller(fetchMineRollerPromise.result.data)
      setIsLoggedIn(true)
    }
  }, [fetchMineRollerPromise.result])

  useEffect(() => {
    if (roller && roller.find((x) => x == Rolle.KOORDINATOR)) {
      fetchDeltakerlister()
    }
  }, [roller])

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main id="maincontent" role="main" tabIndex={-1}>
        {isNotStartedOrPending(fetchMineRollerPromise) && <SpinnerPage />}
        {isRejected(fetchMineRollerPromise) && <ErrorPage />}
        {isLoggedIn && <AppRoutes roller={roller} />}
      </main>
    </>
  )
}
