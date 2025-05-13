import React, { useEffect, useState } from 'react'

import { Radio, RadioGroup } from '@navikt/ds-react'
import { DeltakerStatusAarsakType } from '../../../../../api/data/endringsmelding'
import { postAvsluttDeltakelse } from '../../../../../api/forslag-api'
import { maxDate } from '../../../../../utils/date-utils'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { DateField } from '../../../../felles/DateField'
import { EndringType } from '../types'
import { AarsakSelector } from './AarsakSelector'
import { maxSluttdato } from './datoutils'
import { Endringsmodal } from './endringsmodal/Endringsmodal'
import { toEndringAarsakType } from './validering/aarsakValidering'
import { ModalDataProps } from '../ModalController'
import {
  avslutningsBeskrivelseTekstMapper,
  avslutningsTypeTekstMapper
} from '../tekst-mappers'
import { EndringAarsak } from '../../../../../api/data/forslag'
import { useAvsluttKursDeltakelseValidering } from './validering/useAvsluttKursDeltakelseValidering'

export const AvsluttKursDeltakelseModal = (props: ModalDataProps) => {
  const {
    onClose,
    deltaker,
    visGodkjennVilkaarPanel,
    onForslagSendt,
    erForslagEnabled
  } = props
  const [sluttDato, settSluttDato] = useState<Date>()
  const [aarsak, settAarsak] = useState<DeltakerStatusAarsakType>()
  const [beskrivelse, settBeskrivelse] = useState<string>()
  const [begrunnelse, setBegrunnelse] = useState<string>()
  const [avslutningsType, settAvslutningsType] = useState<AvslutningsType>()
  const [harFullfort, setHarFullfort] = useState<boolean | null>(null)
  const harDeltatt = avslutningsType != AvslutningsType.IKKE_DELTATT
  const skalOppgiSluttdato =
    avslutningsType === AvslutningsType.FULLFORT ||
    avslutningsType === AvslutningsType.AVBRUTT

  const skalOppgiAarsak =
    avslutningsType === AvslutningsType.AVBRUTT ||
    avslutningsType === AvslutningsType.IKKE_DELTATT
  const { validering } = useAvsluttKursDeltakelseValidering(avslutningsType, sluttDato, aarsak, beskrivelse, begrunnelse)

  const onAarsakSelected = (
    nyAarsak: DeltakerStatusAarsakType,
    nyBeskrivelse: Nullable<string>
  ) => {
    settAarsak(nyAarsak)
    settBeskrivelse(nyBeskrivelse ?? undefined)
  }

  useEffect(() => {
    settAarsak(undefined)
    setHarFullfort(avslutningsType === AvslutningsType.FULLFORT)
  }, [avslutningsType])

  const sendForslag = () => {
    if(!validering.isSuccess) {
      return Promise.reject(validering.feilmelding)
    }

    return avslutt(toEndringAarsakType(aarsak, beskrivelse), begrunnelse)

  }

  const avslutt = (nyaarsak: EndringAarsak | null, begrunnelse?: string) => postAvsluttDeltakelse(
      deltaker.id,
      harFullfort,
      harDeltatt,
      nyaarsak,
      !harDeltatt ? null : sluttDato,
      begrunnelse
  ).then((res) => onForslagSendt(res.data))

  return (
    <Endringsmodal
      tittel="Avslutt deltakelse"
      endringstype={EndringType.AVSLUTT_DELTAKELSE}
      visGodkjennVilkaarPanel={visGodkjennVilkaarPanel}
      erForslag={erForslagEnabled}
      erSendKnappDisabled={!validering.isSuccess}
      begrunnelseType="valgfri"
      onClose={onClose}
      onSend={sendForslag}
      onBegrunnelse={(begrunnelse) => {
        setBegrunnelse(begrunnelse)
      }}
    >
      <RadioGroup
        size="small"
        legend="Har deltakeren fullført kurset?"
        onChange={settAvslutningsType}
      >
        <AvslutningstypeRadio avslutningstype={AvslutningsType.FULLFORT} />
        <AvslutningstypeRadio avslutningstype={AvslutningsType.AVBRUTT} />
        <AvslutningstypeRadio avslutningstype={AvslutningsType.IKKE_DELTATT} />
      </RadioGroup>

      {skalOppgiAarsak && (
        <AarsakSelector
          tittel="Hva er årsaken til avslutning?"
          onAarsakSelected={onAarsakSelected}
        />
      )}
      {skalOppgiSluttdato && (
        <DateField
          label="Hva er ny sluttdato?"
          defaultDate={sluttDato}
          min={maxDate(deltaker.startDato, deltaker.deltakerliste.startDato)}
          max={maxSluttdato(deltaker.startDato, deltaker.deltakerliste)}
          onDateChanged={(d) => settSluttDato(d ?? undefined)}
        />
      )}
    </Endringsmodal>
  )
}

export enum AvslutningsType {
  FULLFORT = 'FULLFORT',
  AVBRUTT = 'AVBRUTT',
  IKKE_DELTATT = 'IKKE_DELTATT'
}

export const AvslutningstypeRadio = ({
  avslutningstype
}: {
  avslutningstype: AvslutningsType
}) => {
  const tekst = avslutningsTypeTekstMapper(avslutningstype)
  const beskrivelse = avslutningsBeskrivelseTekstMapper(avslutningstype)
  return (
    <Radio value={avslutningstype} description={beskrivelse}>
      {tekst}
    </Radio>
  )
}
