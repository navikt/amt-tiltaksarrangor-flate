import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { DeltakerDetaljerPage } from './component/page/bruker-detaljer/DeltakerDetaljerPage'
import { DeltakerlisteDetaljerPage } from './component/page/deltakerliste-detaljer/DeltakerlisteDetaljerPage'
import { MineDeltakerlisterPage } from './component/page/mine-deltakerlister-page/MineDeltakerlisterPage'
import { IngenRollePage } from './component/page/ingen-rolle-page/IngenRollePage'
import { Driftsmelding } from './Driftsmelding'
import {
  DELTAKER_DETALJER_PAGE_ROUTE,
  MINE_DELTAKERE_PAGE_ROUTE,
  DELTAKERLISTE_DETALJER_PAGE_ROUTE,
  MINE_DELTAKERLISTER_PAGE_ROUTE,
  INGEN_ROLLE_PAGE_ROUTE,
  LEGG_TIL_DELTAKERLISTE_PAGE_ROUTE,
  GJENNOMFORING_DETALJER_PAGE_ROUTE,
  getDeltakerlisteDetaljerRedirectUrl
} from './navigation'
import { MineDeltakerePage } from './component/page/veileder/MineDeltakerePage'
import { AdministrerDeltakerlisterPage } from './component/page/administrer-deltakerlister-page/AdministrerDeltakerlisterPage'
import { Rolle } from './api/data/ansatt'
import {
  isKoordinator,
  isKoordinatorAndVeileder,
  isOnlyVeileder
} from './utils/rolle-utils'

interface AppRoutesProps {
  roller: Rolle[]
}

export const AppRoutes = ({ roller }: AppRoutesProps) => {
  if (roller.length === 0) return <IngenRolleRoutes />
  else if (isKoordinatorAndVeileder(roller))
    return <VeilederOgKoordinatorRoutes />
  else if (isOnlyVeileder(roller)) return <VeilederRoutes />
  else if (isKoordinator(roller)) return <KoordinatorRoutes />
  return <></>
}

const KoordinatorRoutes = (): React.ReactElement => {
  return (
    <>
      <Driftsmelding />
      <Routes>
        <Route
          path={DELTAKER_DETALJER_PAGE_ROUTE}
          element={<DeltakerDetaljerPage />}
        />
        <Route
          path={DELTAKERLISTE_DETALJER_PAGE_ROUTE}
          element={<DeltakerlisteDetaljerPage />}
        />
        <Route
          path={MINE_DELTAKERLISTER_PAGE_ROUTE}
          element={<MineDeltakerlisterPage />}
        />
        <Route
          path={LEGG_TIL_DELTAKERLISTE_PAGE_ROUTE}
          element={<AdministrerDeltakerlisterPage />}
        />
        <Route
          path={GJENNOMFORING_DETALJER_PAGE_ROUTE}
          element={
            <Navigate
              replace
              state
              to={getDeltakerlisteDetaljerRedirectUrl(useLocation().pathname)}
            />
          }
        />
        <Route
          path="*"
          element={<Navigate replace to={MINE_DELTAKERLISTER_PAGE_ROUTE} />}
        />
      </Routes>
    </>
  )
}

const VeilederRoutes = (): React.ReactElement => {
  return (
    <>
      <Driftsmelding />
      <Routes>
        <Route
          path={MINE_DELTAKERE_PAGE_ROUTE}
          element={<MineDeltakerePage />}
        />
        <Route
          path={DELTAKER_DETALJER_PAGE_ROUTE}
          element={<DeltakerDetaljerPage />}
        />
        <Route
          path="*"
          element={<Navigate replace to={MINE_DELTAKERE_PAGE_ROUTE} />}
        />
      </Routes>
    </>
  )
}

const VeilederOgKoordinatorRoutes = (): React.ReactElement => {
  return (
    <>
      <Driftsmelding />
      <Routes>
        <Route
          path={MINE_DELTAKERE_PAGE_ROUTE}
          element={<MineDeltakerePage />}
        />
        <Route
          path={DELTAKER_DETALJER_PAGE_ROUTE}
          element={<DeltakerDetaljerPage />}
        />
        <Route
          path={DELTAKERLISTE_DETALJER_PAGE_ROUTE}
          element={<DeltakerlisteDetaljerPage />}
        />
        <Route
          path={MINE_DELTAKERLISTER_PAGE_ROUTE}
          element={<MineDeltakerlisterPage />}
        />
        <Route
          path={LEGG_TIL_DELTAKERLISTE_PAGE_ROUTE}
          element={<AdministrerDeltakerlisterPage />}
        />
        <Route
          path={GJENNOMFORING_DETALJER_PAGE_ROUTE}
          element={
            <Navigate
              replace
              state
              to={getDeltakerlisteDetaljerRedirectUrl(useLocation().pathname)}
            />
          }
        />
        <Route
          path="*"
          element={<Navigate replace to={MINE_DELTAKERLISTER_PAGE_ROUTE} />}
        />
      </Routes>
    </>
  )
}

const IngenRolleRoutes = (): React.ReactElement => {
  return (
    <Routes>
      <Route path={INGEN_ROLLE_PAGE_ROUTE} element={<IngenRollePage />} />
      <Route
        path="*"
        element={<Navigate replace to={INGEN_ROLLE_PAGE_ROUTE} />}
      />
    </Routes>
  )
}
