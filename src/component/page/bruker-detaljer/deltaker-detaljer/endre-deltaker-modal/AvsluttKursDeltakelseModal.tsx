import { useEffect, useState } from 'react'

import { Radio, RadioGroup } from '@navikt/ds-react'
import { EndringAarsak } from '../../../../../api/data/forslag'
import { postAvsluttDeltakelse, postEndreAvslutning } from '../../../../../api/forslag-api'
import { maxDate } from '../../../../../utils/date-utils'
import { harDeltattMindreEnnFemtenDager } from '../../../../../utils/deltaker-utils'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { DateField } from '../../../../felles/DateField'
import { ModalDataProps } from '../ModalController'
import {
  avslutningsBeskrivelseTekstMapper,
  avslutningsTypeTekstMapper
} from '../tekst-mappers'
import { EndringType } from '../types'
import { AarsakSelector } from './AarsakSelector'
import { maxSluttdato } from './datoutils'
import { Endringsmodal } from './endringsmodal/Endringsmodal'
import { toEndringAarsakType } from './validering/aarsakValidering'
import { useAvsluttKursDeltakelseValidering } from './validering/useAvsluttKursDeltakelseValidering'
import { DeltakerStatusAarsakType } from '../../../../../api/data/deltakerStatusArsak'
import { ModalType } from '../modal-store'

export const AvsluttKursDeltakelseModal = (props: ModalDataProps) => {
  const {
    onClose,
    deltaker,
    onForslagSendt,
  } = props
  const [ sluttDato, settSluttDato ] = useState<Date | undefined>(deltaker.sluttDato ?? undefined)
  const [ aarsak, settAarsak ] = useState<DeltakerStatusAarsakType>()
  const [ beskrivelse, settBeskrivelse ] = useState<string>()
  const [ begrunnelse, setBegrunnelse ] = useState<string>()
  const [ avslutningsType, settAvslutningsType ] = useState<AvslutningsType>()
  const [ harFullfort, setHarFullfort ] = useState<boolean | null>(null)
  const harDeltatt = avslutningsType === AvslutningsType.IKKE_DELTATT ? false : null
  const skalOppgiSluttdato = props.endringstype === ModalType.AvsluttKursDeltaker &&
    (avslutningsType === AvslutningsType.FULLFORT ||
      avslutningsType === AvslutningsType.AVBRUTT)

  const skalOppgiAarsak =
    avslutningsType === AvslutningsType.AVBRUTT ||
    avslutningsType === AvslutningsType.IKKE_DELTATT
  const { validering } = useAvsluttKursDeltakelseValidering(avslutningsType, sluttDato, aarsak, beskrivelse, begrunnelse)

  const endringstype = props.endringstype === ModalType.EndreAvslutning ? EndringType.ENDRE_AVSLUTNING : EndringType.AVSLUTT_DELTAKELSE
  const skalViseHarDeltatt = harDeltattMindreEnnFemtenDager(deltaker, endringstype)

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
  }, [ avslutningsType ])

  const sendForslag = () => {
    if (!validering.isSuccess) {
      return Promise.reject(validering.feilmelding)
    }

    if (ModalType.EndreAvslutning === props.endringstype) {
      return endreAvslutning(toEndringAarsakType(aarsak, beskrivelse), begrunnelse)
    }
    else {
      return avslutt(toEndringAarsakType(aarsak, beskrivelse), begrunnelse)
    }
  }

  const avslutt = (nyaarsak: EndringAarsak | null, begrunnelse?: string) => postAvsluttDeltakelse(
    deltaker.id,
    harFullfort,
    harDeltatt,
    nyaarsak,
    harDeltatt === false ? null : sluttDato,
    begrunnelse
  ).then((res) => onForslagSendt(res.data))

  const endreAvslutning = (nyaarsak: EndringAarsak | null, begrunnelse?: string) => postEndreAvslutning(
    deltaker.id,
    harFullfort,
    harDeltatt,
    nyaarsak,
    begrunnelse
  ).then((res) => onForslagSendt(res.data))

  return (
    <Endringsmodal
      tittel="Avslutt deltakelse"
      endringstype={endringstype}
      erForslag={true}
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
        {skalViseHarDeltatt && <AvslutningstypeRadio avslutningstype={AvslutningsType.IKKE_DELTATT} />}
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
