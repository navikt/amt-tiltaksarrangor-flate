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
import { useInnloggetBrukerStore } from './store/innlogget-bruker-store'
import { useKoordinatorsDeltakerlisterStore } from './store/koordinators-deltakerlister-store'
import { SpinnerPage } from './component/felles/spinner-page/SpinnerPage'
import { ErrorPage } from './component/page/error/ErrorPage'

export const App = (): React.ReactElement => {
  const fetchMineRollerPromise =
    usePromise<AxiosResponse<Rolle[]>>(fetchMineRoller)
  const { roller, setRoller } = useInnloggetBrukerStore()
  const { fetchDeltakerlister } = useKoordinatorsDeltakerlisterStore()
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
