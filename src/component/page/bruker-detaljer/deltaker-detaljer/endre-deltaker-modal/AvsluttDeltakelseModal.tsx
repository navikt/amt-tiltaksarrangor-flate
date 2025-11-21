import { useState } from 'react'

import { Radio, RadioGroup } from '@navikt/ds-react'
import { DeltakerStatusAarsakType } from '../../../../../api/data/deltakerStatusArsak'
import { postAvsluttDeltakelse, postEndreAvslutning } from '../../../../../api/forslag-api'
import { maxDate } from '../../../../../utils/date-utils'
import { harDeltattMindreEnnFemtenDager } from '../../../../../utils/deltaker-utils'
import { Nullable } from '../../../../../utils/types/or-nothing'
import { DateField } from '../../../../felles/DateField'
import { ModalType } from '../modal-store'
import { ModalDataProps } from '../ModalController'
import { EndringType } from '../types'
import { AarsakSelector } from './AarsakSelector'
import styles from './AvsluttDeltakelseModal.module.scss'
import { maxSluttdato } from './datoutils'
import { Endringsmodal } from './endringsmodal/Endringsmodal'
import {
  toEndringAarsakType,
  useAarsakValidering
} from './validering/aarsakValidering'

export const AvsluttDeltakelseModal = (props: ModalDataProps) => {
  const {
    onClose,
    deltaker,
    onForslagSendt,
  } = props
  const endringstype = props.endringstype === ModalType.EndreAvslutning ? EndringType.ENDRE_AVSLUTNING : EndringType.AVSLUTT_DELTAKELSE
  const [ sluttDato, settSluttDato ] = useState<Date | undefined>(deltaker.sluttDato ?? undefined)
  const [ aarsak, settAarsak ] = useState<DeltakerStatusAarsakType | undefined>(deltaker.status.aarsak?.type ?? undefined)
  const [ beskrivelse, settBeskrivelse ] = useState<string | undefined>(deltaker.status.aarsak?.beskrivelse ?? undefined)
  const [ begrunnelse, setBegrunnelse ] = useState<string>()
  const [ harDeltatt, setHarDeltatt ] = useState<boolean | null>(harDeltattMindreEnnFemtenDager(deltaker) ? null : true)

  const { validering } = useAarsakValidering(aarsak, beskrivelse, begrunnelse)

  const valider = () => {
    if (!validering.isSuccess) {
      return { isSuccess: false, feilmelding: validering.feilmelding }
    }
    if (harDeltatt === null) {
      return { isSuccess: false, feilmelding: 'Valget om deltakeren har deltatt er påkrevd for å sende forslaget' }
    }
    if (harDeltatt && !sluttDato) {
      return { isSuccess: false, feilmelding: 'Sluttdato er påkrevd for å sende forslaget' }
    }
    return { isSuccess: true, feilmelding: null }
  }

  const sendForslag = () => {
    if (!valider().isSuccess) {
      return Promise.reject(validering.feilmelding)
    }

    if (EndringType.AVSLUTT_DELTAKELSE === endringstype) {
      return postAvsluttDeltakelse(
        deltaker.id,
        null,
        harDeltatt,
        toEndringAarsakType(aarsak, beskrivelse),
        harDeltatt === false ? null : sluttDato,
        begrunnelse
      ).then((res) => onForslagSendt(res.data))
    } else {
      return postEndreAvslutning(
        deltaker.id,
        null,
        harDeltatt,
        toEndringAarsakType(aarsak, beskrivelse),
        harDeltatt === false ? null : sluttDato,
        begrunnelse
      ).then((res) => onForslagSendt(res.data))
    }
  }

  const onAarsakSelected = (
    nyAarsak: DeltakerStatusAarsakType,
    nyBeskrivelse: Nullable<string>
  ) => {
    settAarsak(nyAarsak)
    settBeskrivelse(nyBeskrivelse ?? undefined)
  }

  return (
    <Endringsmodal
      tittel={endringstype == EndringType.AVSLUTT_DELTAKELSE ? 'Avslutt deltakelse' : 'Endre avslutning'}
      endringstype={endringstype}
      erForslag={true}
      erSendKnappDisabled={valider().isSuccess === false}
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
        defaultAarsak={aarsak}
        defaultBeskrivelse={beskrivelse}
      />

      <section className={styles.radiogruppe}>
        <RadioGroup
          legend="Har personen deltatt på tiltaket?"
          size="small"
          description="Dersom personen ikke har deltatt på tiltaket, vil statusen på tiltaket endres til “Ikke aktuell”."
          defaultValue={harDeltatt === null ? undefined : harDeltatt}
          onChange={(value: boolean) => {
            setHarDeltatt(value)
          }}
        >
          <Radio value={true}>Ja</Radio>
          <Radio value={false}>Nei</Radio>
        </RadioGroup>
      </section>

      {harDeltatt && (
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
