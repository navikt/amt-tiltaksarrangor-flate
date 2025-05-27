import { Alert, Button, Loader } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import React, { useState } from 'react'

import { Deltaker, TiltakDeltakerStatus } from '../../../../api/data/deltaker'
import { AktivtForslag } from '../../../../api/data/forslag'
import { Tiltakskode } from '../../../../api/data/tiltak'
import { skjulDeltaker } from '../../../../api/tiltak-api'
import { useFeatureToggle } from '../../../../hooks/useFeatureToggle'
import { formatDate } from '../../../../utils/date-utils'
import {
  getDeltakelsesmengdetekst,
  skalViseDeltakelsesmengde
} from '../../../../utils/deltaker-utils'
import {
  isNotStarted,
  isPending,
  isRejected,
  isResolved,
  usePromise
} from '../../../../utils/use-promise'
import { StatusMerkelapp } from '../../../felles/status-merkelapp/StatusMerkelapp'
import styles from './DeltakelseInfo.module.scss'
import { useDeltakerContext } from './DeltakerContext'
import { ElementPanel } from './ElementPanel'
import { EndreDeltakelseKnapp } from './EndreDeltakelseKnapp'
import { Endringsmeldinger } from './endringsmelding/Endringsmeldinger'
import { FjernDeltakerModal } from './fjern-deltaker-modal/FjernDeltakerModal'
import { UbehandledeEndringer } from './forslag/UbehandledeEndringer'
import { SeEndringer } from './historikk/SeEndringer'
import { getDeltakerStatusAarsakText } from './tekst-mappers'

interface DeltakelseInfoProps {
  deltaker: Deltaker
}

export const DeltakelseInfo = ({
  deltaker
}: DeltakelseInfoProps): React.ReactElement => {
  const [ reloadEndringsmeldinger, setReloadEndringsmeldinger ] = useState(false)
  const [ visFjernDeltakerModal, setVisFjernDeltakerModal ] = useState(false)
  const [ forslag, setForslag ] = useState(deltaker.aktiveForslag)
  const [ ulesteEndringer, setUlesteEndringer ] = useState(deltaker.ulesteEndringer)

  const { setDeltaker } = useDeltakerContext()

  const skjulDeltakerPromise = usePromise<AxiosResponse>()

  const { erKometMasterForTiltak } = useFeatureToggle()
  const erKometMaster = erKometMasterForTiltak(
    deltaker.deltakerliste.tiltakstype
  )

  const handleForslagSendt = (forslag: AktivtForslag) => {
    setForslag((prev) => [
      forslag,
      ...prev.filter((it) => it.endring.type !== forslag.endring.type)
    ])
  }

  const handleForslagTilbakekalt = (forslagId: string) => {
    setForslag((prev) => prev.filter((it) => it.id !== forslagId))
  }

  const fjernLesteEndringer = (enringId: string) => {
    setUlesteEndringer((prev) => prev.filter((it) => it.id !== enringId))
  }

  const triggerReloadEndringsmeldinger = () => {
    setReloadEndringsmeldinger(true)
  }

  const handleSkjulDeltaker = () => {
    setVisFjernDeltakerModal(false)
    skjulDeltakerPromise.setPromise(skjulDeltaker(deltaker.id))
  }

  const oppdaterDeltaker = (deltaker: Deltaker) => {
    setDeltaker(deltaker)
  }

  const viseDeltakelsesmengde = skalViseDeltakelsesmengde(deltaker.tiltakskode)

  const nesteDeltakelsesmengde =
    deltaker.deltakelsesmengder?.nesteDeltakelsesmengde

  const kanFjerneDeltaker = [
    TiltakDeltakerStatus.IKKE_AKTUELL,
    TiltakDeltakerStatus.HAR_SLUTTET,
    TiltakDeltakerStatus.AVBRUTT,
    TiltakDeltakerStatus.FULLFORT
  ].includes(deltaker.status.type)

  const skruAvEndringer =
    (deltaker.deltakerliste.tiltakstype === Tiltakskode.GRUFAGYRKE ||
      deltaker.deltakerliste.tiltakstype === Tiltakskode.GRUPPEAMO ||
      deltaker.deltakerliste.tiltakstype === Tiltakskode.JOBBK) &&
    !erKometMaster

  return (
    <div className={styles.section}>
      <div className={styles.deltakerInfoWrapper}>
        <div className={styles.elementWrapper}>
          <ElementPanel tittel="Status:">
            <StatusMerkelapp status={deltaker.status} />
          </ElementPanel>
          {erKometMaster && deltaker.status.aarsak && (
            <ElementPanel tittel="Årsak:">
              <span>{getDeltakerStatusAarsakText(deltaker.status.aarsak)}</span>
            </ElementPanel>
          )}
          <ElementPanel tittel="Dato:">
            <span>
              {formatDate(deltaker.startDato)} -{' '}
              {formatDate(deltaker.sluttDato)}
            </span>
          </ElementPanel>
          {viseDeltakelsesmengde && (
            <ElementPanel tittel="Deltakelsesmengde:">
              {nesteDeltakelsesmengde ? (
                <span>
                  {getDeltakelsesmengdetekst(
                    deltaker.deltakelseProsent,
                    deltaker.dagerPerUke
                  )}{' '}
                  (
                  {getDeltakelsesmengdetekst(
                    nesteDeltakelsesmengde.deltakelsesprosent,
                    nesteDeltakelsesmengde.dagerPerUke
                  )}{' '}
                  fom. {formatDate(nesteDeltakelsesmengde.gyldigFra)})
                </span>
              ) : (
                <span>
                  {getDeltakelsesmengdetekst(
                    deltaker.deltakelseProsent,
                    deltaker.dagerPerUke
                  )}
                </span>
              )}
            </ElementPanel>
          )}
        </div>
        {!skruAvEndringer && (
          <EndreDeltakelseKnapp
            deltaker={deltaker}
            onEndringUtfort={triggerReloadEndringsmeldinger}
            erKometMaster={erKometMaster}
            onForslagSendt={handleForslagSendt}
            onEndringSendt={oppdaterDeltaker}
          />
        )}
      </div>

      <div className={styles.body}>
        <UbehandledeEndringer
          forslag={forslag}
          deltakerId={deltaker.id}
          ulesteEndringer={ulesteEndringer}
          onTilbakekalt={handleForslagTilbakekalt}
          onMarkertSomLest={fjernLesteEndringer}
          tiltakstype={deltaker.deltakerliste.tiltakstype}
        />

        {erKometMaster && (
          <SeEndringer
            className={styles.seEndringerKnapp}
            tiltakstype={deltaker.deltakerliste.tiltakstype}
            deltakerId={deltaker.id}
          />
        )}

        {!erKometMaster && (
          <Endringsmeldinger
            deltaker={deltaker}
            setReloadEndringsmeldinger={setReloadEndringsmeldinger}
            reloadEndringsmeldinger={reloadEndringsmeldinger}
          />
        )}

        {kanFjerneDeltaker && isNotStarted(skjulDeltakerPromise) && (
          <Alert variant="warning" size="small" className={styles.statusAlert}>
            Deltakeren fjernes fra listen {formatDate(deltaker.fjernesDato)}
            <Button
              variant="tertiary"
              size="small"
              className={styles.fjernDeltakerKnapp}
              onClick={() => setVisFjernDeltakerModal(true)}
            >
              Fjern deltaker nå
            </Button>
          </Alert>
        )}
        {isPending(skjulDeltakerPromise) && <Loader size="xlarge" />}
        {isResolved(skjulDeltakerPromise) && (
          <Alert variant="success">Deltakeren er fjernet</Alert>
        )}
        {isRejected(skjulDeltakerPromise) && (
          <Alert variant="error">
            Klarte ikke å fjerne deltaker, prøv igjen senere
          </Alert>
        )}
      </div>

      <FjernDeltakerModal
        open={visFjernDeltakerModal}
        onConfirm={handleSkjulDeltaker}
        onClose={() => setVisFjernDeltakerModal(false)}
      />
    </div>
  )
}
