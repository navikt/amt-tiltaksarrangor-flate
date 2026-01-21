import { Alert, BodyShort, Heading } from '@navikt/ds-react'
import globalStyles from '../../../globals.module.scss'
import styles from './AdministrerDeltakerlisterPage.module.scss'
import React, { useEffect, useState } from 'react'
import {
  isNotStartedOrPending,
  isRejected,
  usePromise
} from '../../../utils/use-promise'
import { AxiosResponse } from 'axios'
import { AdminDeltakerliste } from '../../../api/data/tiltak'
import {
  fetchAlleDeltakerlister,
  fjernDeltakerliste,
  leggTilDeltakerliste
} from '../../../api/tiltak-api'
import { ArrangorOverenhet } from './deltakerliste.viewobjects'
import { DeltakerlisterForArrangorWrapper } from './underenheter-pa-overenhet/DeltakerlisterForArrangorWrapper'
import { Show } from '../../felles/Show'
import { deltakerlisteMapper } from './deltakerliste.mapper'
import { SpinnerPage } from '../../felles/spinner-page/SpinnerPage'
import { AlertPage } from '../../felles/alert-page/AlertPage'
import { LeggTilDeltakerlisteModal } from './legg-til-deltakerliste-modal/LeggTilDeltakerlisteModal'
import { useTilbakelenkeContext } from '../../../store/TilbakelenkeContextProvider'
import { MINE_DELTAKERLISTER_PAGE_ROUTE } from '../../../navigation'
import { useTabTitle } from '../../../hooks/use-tab-title'
import { useKoordinatorsDeltakerlisterContext } from '../../../store/KoordinatorsDeltakerlisterContextProvider'
import { Oppstartstype } from '../../../api/data/historikk'

export const AdministrerDeltakerlisterPage = () => {
  const { setTilbakeTilUrl } = useTilbakelenkeContext()
  const { koordinatorsDeltakerlister, setKoordinatorsDeltakerlister } =
    useKoordinatorsDeltakerlisterContext()

  const [arrangorer, setArrangorer] = useState<ArrangorOverenhet[]>([])
  const [deltakerlisteIderLagtTil, setDeltakerlisteIderLagtTil] = useState<
    string[]
  >([])

  const [deltakerlisteIdUpdating, setDeltakerlisteIdUpdating] = useState<
    string | undefined
  >(undefined)
  const [showLeggTilModal, setShowLeggTilModal] = useState(false)

  const fetchAlleDeltakerlisterPromise = usePromise<
    AxiosResponse<AdminDeltakerliste[]>
  >(fetchAlleDeltakerlister)

  useTabTitle('Legg til og fjern deltakerlister')

  useEffect(() => {
    setTilbakeTilUrl(MINE_DELTAKERLISTER_PAGE_ROUTE)
  }, [])

  useEffect(() => {
    const alleDeltakerlister: AdminDeltakerliste[] =
      fetchAlleDeltakerlisterPromise.result?.data || []
    const deltakerlisteIderAlleredeLagtTil =
      fetchAlleDeltakerlisterPromise.result?.data
        .filter((dl) => dl.lagtTil)
        .map((d) => d.id) || []
    const data = deltakerlisteMapper(alleDeltakerlister).sort((a, b) =>
      a.navn.localeCompare(b.navn)
    )

    setDeltakerlisteIderLagtTil(deltakerlisteIderAlleredeLagtTil)
    setArrangorer(data)
  }, [fetchAlleDeltakerlisterPromise.result])

  const onLeggTil = (deltakerlisteId: string) => {
    setDeltakerlisteIdUpdating(deltakerlisteId)
    setShowLeggTilModal(true)
  }

  const onFjern = (deltakerlisteId: string) => {
    setDeltakerlisteIdUpdating(deltakerlisteId)

    fjernDeltakerliste(deltakerlisteId).then(() => {
      setDeltakerlisteIderLagtTil([
        ...deltakerlisteIderLagtTil.filter((i) => i !== deltakerlisteId)
      ])
      setDeltakerlisteIdUpdating(undefined)
      if (
        koordinatorsDeltakerlister &&
        koordinatorsDeltakerlister.koordinatorFor != null
      ) {
        const nyDeltakerliste =
          koordinatorsDeltakerlister.koordinatorFor.deltakerlister.filter(
            (l) => l.id != deltakerlisteId
          )
        const nyKoordinatorsDeltakerlister = {
          ...koordinatorsDeltakerlister,
          koordinatorFor: {
            ...koordinatorsDeltakerlister.koordinatorFor,
            deltakerlister: nyDeltakerliste
          }
        }
        setKoordinatorsDeltakerlister(nyKoordinatorsDeltakerlister)
      }
    })
  }

  const leggTilConfirmed = (id: string, navn: string, type: string, oppstartstype: Oppstartstype) => {
    leggTilDeltakerliste(id).then(() => {
      setDeltakerlisteIderLagtTil([...deltakerlisteIderLagtTil, id])
      setDeltakerlisteIdUpdating(undefined)
      if (
        koordinatorsDeltakerlister &&
        koordinatorsDeltakerlister.koordinatorFor != null
      ) {
        const nyDeltakerliste = [
          ...koordinatorsDeltakerlister.koordinatorFor.deltakerlister
        ]
        nyDeltakerliste.push({
          id: id,
          type: type,
          navn: navn,
          startdato: null,
          sluttdato: null,
          oppstartstype: oppstartstype
        })
        const nyKoordinatorsDeltakerlister = {
          ...koordinatorsDeltakerlister,
          koordinatorFor: {
            ...koordinatorsDeltakerlister.koordinatorFor,
            deltakerlister: nyDeltakerliste
          }
        }
        setKoordinatorsDeltakerlister(nyKoordinatorsDeltakerlister)
      }
    })

    setShowLeggTilModal(false)
  }

  const onLeggTilModalClosed = () => {
    setShowLeggTilModal(false)
    setDeltakerlisteIdUpdating(undefined)
  }

  const getNavnPaDeltakerliste = (
    deltakerlisteId: string | undefined
  ): string => {
    if (deltakerlisteId === undefined) return ''

    const deltakerliste = fetchAlleDeltakerlisterPromise.result?.data.find(
      (g) => g.id === deltakerlisteId
    )

    return deltakerliste != undefined ? deltakerliste.navn : ''
  }

  const getTiltaksnavnForDeltakerliste = (
    deltakerlisteId: string | undefined
  ): string => {
    if (deltakerlisteId === undefined) return ''

    const deltakerliste = fetchAlleDeltakerlisterPromise.result?.data.find(
      (g) => g.id === deltakerlisteId
    )

    return deltakerliste != undefined ? deltakerliste.tiltaksnavn : ''
  }

  const getOppstartstypeForDeltakerliste = (
    deltakerlisteId: string | undefined
  ): Oppstartstype => {
    if (deltakerlisteId === undefined) return Oppstartstype.LOPENDE

    const deltakerliste = fetchAlleDeltakerlisterPromise.result?.data.find(
      (g) => g.id === deltakerlisteId
    )

    return deltakerliste?.oppstartstype ? deltakerliste.oppstartstype : Oppstartstype.LOPENDE
  }

  if (isNotStartedOrPending(fetchAlleDeltakerlisterPromise)) {
    return <SpinnerPage />
  }

  if (isRejected(fetchAlleDeltakerlisterPromise)) {
    return <AlertPage variant="error" tekst="Noe gikk galt" />
  }

  return (
    <div className={styles.page} data-testid="administrer-deltakerlister-page">
      <Heading size="large" level="2" className={globalStyles.blokkM}>
        Legg til og fjern deltakerlister
      </Heading>

      <BodyShort className={globalStyles.blokkM}>
        Hvilke deltakerlister koordinerer du? Det er viktig at du kun legger til
        deltakerlister som du er koordinator for.
      </BodyShort>

      <Show if={arrangorer.length === 0}>
        <Alert variant="info">
          På organisasjonsnummeret du har tilgang til finnes det ingen aktive
          deltakerlister.
          <br />
          <br />
          Mangler det en deltakerliste? Den kan være registrert på et annet
          org.nr. i Navs datasystem. Ta kontakt med den i Nav som er ansvarlig
          for avtalen.
        </Alert>
      </Show>

      {arrangorer.map((o) => (
        <DeltakerlisterForArrangorWrapper
          key={o.navn}
          overskrift={o.navn}
          arrangorer={o.arrangorer}
          deltakerlisterLagtTil={deltakerlisteIderLagtTil}
          deltakerlisteIdLoading={deltakerlisteIdUpdating}
          onLeggTil={onLeggTil}
          onFjern={onFjern}
        />
      ))}

      <LeggTilDeltakerlisteModal
        open={showLeggTilModal}
        deltakerlisteNavn={getNavnPaDeltakerliste(deltakerlisteIdUpdating)}
        deltakerlisteTiltaksnavn={getTiltaksnavnForDeltakerliste(
          deltakerlisteIdUpdating
        )}
        deltakerlisteId={deltakerlisteIdUpdating as string}
        oppstartstype={getOppstartstypeForDeltakerliste(deltakerlisteIdUpdating)}
        onConfirm={leggTilConfirmed}
        onClose={onLeggTilModalClosed}
      />
    </div>
  )
}
