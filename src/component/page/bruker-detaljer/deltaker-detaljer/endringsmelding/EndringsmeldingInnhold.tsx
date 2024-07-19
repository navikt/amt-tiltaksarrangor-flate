import { BodyShort } from '@navikt/ds-react'
import React from 'react'

import {
  DeltakerStatusAarsak,
  DeltakerStatusAarsakType,
  Endringsmelding,
  EndringsmeldingType
} from '../../../../../api/data/endringsmelding'
import { formatDate } from '../../../../../utils/date-utils'
import { aarsakTekstMapper } from '../tekst-mappers'
import styles from './Endringsmeldinger.module.scss'
import { getDagerPerUkeTekst } from '../../../../../utils/deltaker-utils'

export interface EndringsmeldingInnholdProps {
  endringsmelding: Endringsmelding
}

export const EndringsmeldingInnhold = (props: EndringsmeldingInnholdProps) => {
  const { endringsmelding } = props

  const getAarsakTekst = (aarsak: DeltakerStatusAarsak) => {
    return aarsak.type === DeltakerStatusAarsakType.ANNET
      ? aarsak.beskrivelse
      : aarsakTekstMapper(aarsak.type)
  }

  switch (endringsmelding.type) {
    case EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO:
      return (
        <div>
          <BodyShort
            size="small"
            weight="semibold"
            className={styles.innholdTitle}
          >
            Legg til oppstartsdato
          </BodyShort>
          <BodyShort size="small">
            Ny oppstartsdato:{' '}
            {formatDate(endringsmelding.innhold.oppstartsdato)}
          </BodyShort>
        </div>
      )
    case EndringsmeldingType.ENDRE_OPPSTARTSDATO:
      return (
        <div>
          <BodyShort
            size="small"
            weight="semibold"
            className={styles.innholdTitle}
          >
            Endre oppstartsdato
          </BodyShort>
          <BodyShort size="small">
            Ny oppstartsdato:{' '}
            {formatDate(endringsmelding.innhold.oppstartsdato)}
          </BodyShort>
        </div>
      )
    case EndringsmeldingType.FORLENG_DELTAKELSE:
      return (
        <div>
          <BodyShort
            size="small"
            weight="semibold"
            className={styles.innholdTitle}
          >
            Forlengelse
          </BodyShort>
          <BodyShort size="small">
            Ny sluttdato: {formatDate(endringsmelding.innhold.sluttdato)}
          </BodyShort>
        </div>
      )
    case EndringsmeldingType.DELTAKER_IKKE_AKTUELL:
      return (
        <div>
          <BodyShort
            size="small"
            weight="semibold"
            className={styles.innholdTitle}
          >
            Personen er ikke aktuell
          </BodyShort>
          <BodyShort size="small">
            Årsak: {getAarsakTekst(endringsmelding.innhold.aarsak)}
          </BodyShort>
        </div>
      )
    case EndringsmeldingType.AVSLUTT_DELTAKELSE:
      return (
        <div>
          <BodyShort
            size="small"
            weight="semibold"
            className={styles.innholdTitle}
          >
            Avslutt deltakelse{' '}
          </BodyShort>
          <BodyShort size="small">
            Årsak: {getAarsakTekst(endringsmelding.innhold.aarsak)}
          </BodyShort>
          <BodyShort size="small">
            Ny sluttdato: {formatDate(endringsmelding.innhold.sluttdato)}
          </BodyShort>
        </div>
      )
    case EndringsmeldingType.ENDRE_DELTAKELSE_PROSENT:
      return (
        <div>
          <BodyShort
            size="small"
            weight="semibold"
            className={styles.innholdTitle}
          >
            Endre deltakelsesmengde
          </BodyShort>
          <BodyShort size="small">
            Ny deltakelsesprosent: {endringsmelding.innhold.deltakelseProsent}%
          </BodyShort>
          {endringsmelding.innhold.dagerPerUke && (
            <BodyShort size="small">
              {getDagerPerUkeTekst(endringsmelding.innhold.dagerPerUke)}
            </BodyShort>
          )}
          {endringsmelding.innhold.gyldigFraDato && (
            <BodyShort size="small">
              Gjelder fra {formatDate(endringsmelding.innhold.gyldigFraDato)}
            </BodyShort>
          )}
        </div>
      )
    case EndringsmeldingType.ENDRE_SLUTTDATO:
      return (
        <div>
          <BodyShort
            size="small"
            weight="semibold"
            className={styles.innholdTitle}
          >
            Endre sluttdato
          </BodyShort>
          <BodyShort size="small">
            Ny sluttdato: {formatDate(endringsmelding.innhold.sluttdato)}
          </BodyShort>
        </div>
      )
    case EndringsmeldingType.ENDRE_SLUTTAARSAK:
      return (
        <div>
          <BodyShort
            size="small"
            weight="semibold"
            className={styles.innholdTitle}
          >
            Endre sluttårsak
          </BodyShort>
          <BodyShort size="small">
            Årsak: {getAarsakTekst(endringsmelding.innhold.aarsak)}
          </BodyShort>
        </div>
      )
    default:
      return null
  }
}
