import { useState } from 'react'

import { Radio, RadioGroup } from '@navikt/ds-react'
import { postAvsluttDeltakelse } from '../../../../../api/forslag-api'
import { maxDate } from '../../../../../utils/date-utils'
import { harDeltattMindreEnnFemtenDager } from '../../../../../utils/deltaker-utils'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { DateField } from '../../../../felles/DateField'
import { ModalDataProps } from '../ModalController'
import { EndringType } from '../types'
import { AarsakSelector } from './AarsakSelector'
import styles from './AvsluttDeltakelseModal.module.scss'
import { maxSluttdato } from './datoutils'
import { Endringsmodal } from './endringsmodal/Endringsmodal'
import {
  useAarsakValidering,
  validerAarsakForm
} from './validering/aarsakValidering'
import { DeltakerStatusAarsakType } from '../../../../../api/data/deltakerStatusArsak'

export const AvsluttDeltakelseModal = (props: ModalDataProps) => {
  const {
    onClose,
    deltaker,
    visGodkjennVilkaarPanel,
    onForslagSendt,
  } = props
  const [sluttDato, settSluttDato] = useState<Nullable<Date>>()
  const [aarsak, settAarsak] = useState<DeltakerStatusAarsakType>()
  const [beskrivelse, settBeskrivelse] = useState<Nullable<string>>()
  const [begrunnelse, setBegrunnelse] = useState<string>()
  const [harDeltatt, setHarDeltatt] = useState<boolean | null>(null)

  const { validering } = useAarsakValidering(aarsak, beskrivelse, begrunnelse)
  const skalViseHarDeltatt = harDeltattMindreEnnFemtenDager(deltaker)
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
          null,
          harDeltatt,
          validertForm.forslag.aarsak,
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
      erForslag={true}
      erSendKnappDisabled={!validering.isSuccess || !isSluttdatoValid()}
      begrunnelseType="valgfri"
      onClose={onClose}
      onSend={sendForslag}
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
