import { useRef, useState } from 'react'

import { Alert, Detail, Heading, Link } from '@navikt/ds-react'
import { Deltaker } from '../../../../../api/data/deltaker'
import { leggTilOppstartsdatoFraArrangor } from '../../../../../api/endring-api'
import { leggTilOppstartsdato } from '../../../../../api/tiltak-api'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { DateField } from '../../../../felles/DateField'
import { EndringType } from '../types'
import { kalkulerMaxDato, kalkulerMinDato, maxSluttdato } from './datoutils'
import { Endringsmodal } from './endringsmodal/Endringsmodal'
import styles from './LeggTilOppstartModal.module.scss'
import { SluttdatoRef, SluttdatoVelger } from './SluttdatoVelger'
import { finnValgtVarighet } from './varighet'
import { VeilederConfirmationPanel } from './VeilederConfirmationPanel'

export interface LeggTilOppstartModalProps {
  onClose: () => void
}

export interface LeggTilOppstartModalDataProps {
  readonly deltaker: Deltaker
  readonly visGodkjennVilkaarPanel: boolean
  readonly onEndringUtfort: () => void
  readonly onEndringSendt: (oppdatertDeltaker: Deltaker) => void
  readonly erForslagEnabled: boolean
}

export const LeggTilOppstartModal = ({
  deltaker,
  onClose,
  visGodkjennVilkaarPanel,
  onEndringUtfort,
  onEndringSendt,
  erForslagEnabled
}: LeggTilOppstartModalProps & LeggTilOppstartModalDataProps) => {
  const erEndringFraArrangorEnabled = erForslagEnabled
  const [ startdato, setStartdato ] = useState<Nullable<Date>>(null)
  const sluttdato = useRef<SluttdatoRef>(null)

  const [ vilkaarGodkjent, setVilkaarGodkjent ] = useState(false)

  const kanSendeMelding = erEndringFraArrangorEnabled
    ? startdato !== null && sluttdato !== null
    : startdato !== null

  const sendEndringsmelding = () => {
    if (!startdato) {
      return Promise.reject('Kan ikke sende endringsmelding uten oppstartsdato')
    }
    return leggTilOppstartsdato(deltaker.id, startdato).then(onEndringUtfort)
  }

  const lagreEndring = () => {
    if (!startdato) {
      return Promise.reject('Du må velge en oppstartsdato')
    }
    if (sluttdato.current && !sluttdato.current.validate()) {
      return Promise.reject('Du må velge en gyldig sluttdato')
    }

    return leggTilOppstartsdatoFraArrangor(
      deltaker.id,
      startdato,
      sluttdato.current?.sluttdato
    ).then((res) => onEndringSendt(res.data))
  }

  return (
    <Endringsmodal
      tittel="Legg til  oppstartsdato"
      endringstype={EndringType.LEGG_TIL_OPPSTARTSDATO}
      visGodkjennVilkaarPanel={visGodkjennVilkaarPanel}
      erSendKnappDisabled={!kanSendeMelding}
      erForslag={false}
      erEndringFraArrangor={erEndringFraArrangorEnabled}
      onClose={onClose}
      onSend={erEndringFraArrangorEnabled ? lagreEndring : sendEndringsmelding}
    >
      {erEndringFraArrangorEnabled && (
        <>
          <Detail>
            Oppstartsdato avtales med deltaker direkte. Når du lagrer så kan
            NAV-veileder se datoene i arbeidsverktøyet sitt og deltaker kan se
            datoene på nav.no.
          </Detail>
          <Alert variant="info" size="small" >
            <Heading spacing size="xsmall" level="3" className={styles.alert_heading}>
              Nytt: Oppstartsdato og varighet blir nå lagret med en gang
            </Heading>
            15. oktober fikk NAV-veiledere ny løsning for arbeidsmarkedstiltak.
            <Link href="https://www.nav.no/nytt-i-deltakeroversikten">
              Les mer om endringene i deltakeroversikten på nav.no her.</Link>
          </Alert>
        </>
      )}
      <DateField
        label="Oppstartsdato"
        defaultDate={startdato}
        onDateChanged={(d) => setStartdato(d)}
        min={kalkulerMinDato(deltaker.deltakerliste.startDato)}
        max={kalkulerMaxDato(deltaker.deltakerliste.sluttDato)}
      />
      {erEndringFraArrangorEnabled && (
        <SluttdatoVelger
          ref={sluttdato}
          tiltakskode={deltaker.deltakerliste.tiltakstype}
          legend="Hva er forventet varighet?"
          detailLabel="Forventet sluttdato"
          min={startdato ?? undefined}
          max={maxSluttdato(startdato, deltaker.deltakerliste)}
          defaultSluttdato={deltaker.sluttDato ?? undefined}
          defaultVarighet={
            deltaker.sluttDato
              ? finnValgtVarighet(
                deltaker.startDato,
                deltaker.sluttDato,
                deltaker.deltakerliste.tiltakstype
              )
              : undefined
          }
        />
      )}
      {visGodkjennVilkaarPanel && (
        <VeilederConfirmationPanel
          vilkaarGodkjent={vilkaarGodkjent}
          setVilkaarGodkjent={setVilkaarGodkjent}
        />
      )}
    </Endringsmodal>
  )
}
