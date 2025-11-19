import { useState } from 'react'

import { Radio, RadioGroup } from '@navikt/ds-react'
import { TiltakDeltakerStatus } from '../../../../../api/data/deltaker'
import { DeltakerStatusAarsakType } from '../../../../../api/data/deltakerStatusArsak'
import { postAvsluttDeltakelse, postEndreAvslutning } from '../../../../../api/forslag-api'
import { maxDate } from '../../../../../utils/date-utils'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { DateField } from '../../../../felles/DateField'
import { ModalType } from '../modal-store'
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

export const AvsluttKursDeltakelseModal = (props: ModalDataProps) => {
  const {
    onClose,
    deltaker,
    onForslagSendt,
  } = props
  const endringstype = props.endringstype === ModalType.EndreAvslutningKurs ? EndringType.ENDRE_AVSLUTNING : EndringType.AVSLUTT_DELTAKELSE
  const [ sluttDato, settSluttDato ] = useState<Date | undefined>(deltaker.sluttDato ?? undefined)
  const [ aarsak, settAarsak ] = useState<DeltakerStatusAarsakType | undefined>(deltaker.status.aarsak?.type ?? undefined)
  const [ beskrivelse, settBeskrivelse ] = useState<string>()
  const [ begrunnelse, setBegrunnelse ] = useState<string | undefined>(deltaker.status.aarsak?.beskrivelse ?? undefined)
  const [ avslutningsType, settAvslutningsType ] = useState<AvslutningsType | undefined>(() => {
    if (deltaker.status.type === TiltakDeltakerStatus.FULLFORT) return AvslutningsType.FULLFORT
    if (deltaker.status.type === TiltakDeltakerStatus.AVBRUTT) return AvslutningsType.AVBRUTT
    if (deltaker.status.type === TiltakDeltakerStatus.IKKE_AKTUELL) return AvslutningsType.IKKE_DELTATT
    return undefined
  })
  const [ harFullfort, setHarFullfort ] = useState<boolean | null>(avslutningsType === AvslutningsType.FULLFORT ? true : null)
  const harDeltatt = avslutningsType === AvslutningsType.IKKE_DELTATT ? false : null
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

  const sendForslag = () => {
    if (!validering.isSuccess) {
      return Promise.reject(validering.feilmelding)
    }

    if (EndringType.AVSLUTT_DELTAKELSE === endringstype) {
      return postAvsluttDeltakelse(
        deltaker.id,
        harFullfort,
        harDeltatt,
        toEndringAarsakType(aarsak, beskrivelse),
        harDeltatt === false ? null : sluttDato,
        begrunnelse
      ).then((res) => onForslagSendt(res.data))
    }
    else {
      return postEndreAvslutning(
        deltaker.id,
        harFullfort,
        harDeltatt,
        toEndringAarsakType(aarsak, beskrivelse),
        harDeltatt === false ? null : sluttDato,
        begrunnelse
      ).then((res) => onForslagSendt(res.data))
    }
  }

  return (
    <Endringsmodal
      tittel={endringstype == EndringType.AVSLUTT_DELTAKELSE ? 'Avslutt deltakelse' : 'Endre avslutning'}
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
        onChange={(newAvslutningsType) => {
          settAarsak(undefined)
          setHarFullfort(newAvslutningsType === AvslutningsType.FULLFORT)
          settAvslutningsType(newAvslutningsType as AvslutningsType)
        }}
        defaultValue={avslutningsType}
      >
        <AvslutningstypeRadio avslutningstype={AvslutningsType.FULLFORT} />
        <AvslutningstypeRadio avslutningstype={AvslutningsType.AVBRUTT} />
        <AvslutningstypeRadio avslutningstype={AvslutningsType.IKKE_DELTATT} />
      </RadioGroup>

      {skalOppgiAarsak && (
        <AarsakSelector
          tittel="Hva er årsaken til avslutning?"
          onAarsakSelected={onAarsakSelected}
          defaultAarsak={aarsak}
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
