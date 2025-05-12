import { useState } from 'react'

import { Radio, RadioGroup } from '@navikt/ds-react'
import { Deltaker } from '../../../../../api/data/deltaker'
import { DeltakerStatusAarsakType } from '../../../../../api/data/endringsmelding'
import { postAvsluttDeltakelse } from '../../../../../api/forslag-api'
import { avsluttDeltakelse } from '../../../../../api/tiltak-api'
import { maxDate } from '../../../../../utils/date-utils'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { DateField } from '../../../../felles/DateField'
import { EndringType } from '../types'
import { AarsakSelector } from './AarsakSelector'
import styles from './AvsluttDeltakelseModal.module.scss'
import { maxSluttdato } from './datoutils'
import { Endringsmodal } from './endringsmodal/Endringsmodal'
import {
  useAarsakValidering,
  validerAarsakForm
} from './validering/aarsakValidering'
import { ModalDataProps } from '../ModalController'

export const AvsluttDeltakelseModal = (
  props: ModalDataProps
) => {
  const {
    onClose,
    deltaker,
    visGodkjennVilkaarPanel,
    onEndringUtfort,
    onForslagSendt,
    erForslagEnabled
  } = props
  const [sluttDato, settSluttDato] = useState<Nullable<Date>>()
  const [aarsak, settAarsak] = useState<DeltakerStatusAarsakType>()
  const [beskrivelse, settBeskrivelse] = useState<Nullable<string>>()
  const [begrunnelse, setBegrunnelse] = useState<string>()
  const [harDeltatt, setHarDeltatt] = useState<boolean | null>(null)

  const { validering } = useAarsakValidering(aarsak, beskrivelse, begrunnelse)
  const skalViseHarDeltatt = erForslagEnabled && showHarDeltatt(deltaker)
  const isSluttdatoValid = () => {
    if ((harDeltatt || harDeltatt === null) && !sluttDato) {
      return false
    }
    if (skalViseHarDeltatt && harDeltatt === null) {
      return false
    }
    return true
  }

  const skalViseSluttdato = () => {
    if (harDeltatt === null) {
      return !skalViseHarDeltatt
    }
    return harDeltatt
  }

  const sendEndringsmelding = () => {
    if (!sluttDato) {
      return Promise.reject(
        'Sluttdato er påkrevd for å sende AvsluttDeltakelse endringsmelding'
      )
    }
    return validerAarsakForm(aarsak, beskrivelse)
      .then((validertForm) =>
        avsluttDeltakelse(
          deltaker.id,
          sluttDato,
          validertForm.endringsmelding.aarsak
        )
      )
      .then(onEndringUtfort)
  }

  const sendForslag = () => {
    if ((harDeltatt || harDeltatt === null) && !sluttDato) {
      return Promise.reject(
        'Sluttdato er påkrevd for å sende AvsluttDeltakelse forslag'
      )
    }

    return validerAarsakForm(aarsak, beskrivelse, begrunnelse)
      .then((validertForm) =>
        postAvsluttDeltakelse(
          deltaker.id,
          validertForm.forslag.aarsak,
          harDeltatt === true,
          harDeltatt,
          harDeltatt === false ? null : sluttDato,
          validertForm.forslag.begrunnelse
        )
      )
      .then((res) => onForslagSendt(res.data))
  }

  const onAarsakSelected = (
    nyAarsak: DeltakerStatusAarsakType,
    nyBeskrivelse: Nullable<string>
  ) => {
    settAarsak(nyAarsak)
    settBeskrivelse(nyBeskrivelse)
  }

  return (
    <Endringsmodal
      tittel="Avslutt deltakelse"
      endringstype={EndringType.AVSLUTT_DELTAKELSE}
      visGodkjennVilkaarPanel={visGodkjennVilkaarPanel}
      erForslag={erForslagEnabled}
      erSendKnappDisabled={!validering.isSuccess || !isSluttdatoValid()}
      begrunnelseType="valgfri"
      onClose={onClose}
      onSend={erForslagEnabled ? sendForslag : sendEndringsmelding}
      onBegrunnelse={(begrunnelse) => {
        setBegrunnelse(begrunnelse)
      }}
    >
      <AarsakSelector
        tittel="Hva er årsaken til avslutning?"
        onAarsakSelected={onAarsakSelected}
      />
      {skalViseHarDeltatt && (
        <section className={styles.radiogruppe}>
          <RadioGroup
            legend="Har personen deltatt på tiltaket?"
            size="small"
            description="Dersom personen ikke har deltatt på tiltaket, vil statusen på tiltaket endres til “Ikke aktuell”."
            onChange={(value: boolean) => {
              setHarDeltatt(value)
            }}
          >
            <Radio value={true}>Ja</Radio>
            <Radio value={false}>Nei</Radio>
          </RadioGroup>
        </section>
      )}
      {skalViseSluttdato() && (
        <DateField
          label="Hva er ny sluttdato?"
          defaultDate={sluttDato}
          min={maxDate(deltaker.startDato, deltaker.deltakerliste.startDato)}
          max={maxSluttdato(deltaker.startDato, deltaker.deltakerliste)}
          onDateChanged={(d) => settSluttDato(d)}
        />
      )}
    </Endringsmodal>
  )
}

const showHarDeltatt = (deltaker: Deltaker) => {
  const startDato = deltaker.startDato
  if (startDato === null) throw Error('startdato er null')
  const femtenDagerSiden = new Date()
  femtenDagerSiden.setDate(femtenDagerSiden.getDate() - 15)
  return startDato > femtenDagerSiden
}
