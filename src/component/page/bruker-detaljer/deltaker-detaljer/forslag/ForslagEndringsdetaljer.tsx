import React from 'react'
import {
  ForslagEndring,
  ForslagEndringType
} from '../../../../../api/data/forslag'
import { assertNever } from '../../../../../utils/assert-never'
import { BodyLong, BodyShort, Detail } from '@navikt/ds-react'
import { formatDate } from '../../../../../utils/date-utils'
import { endringAarsakTekstMapper } from '../tekst-mappers'
import { getDagerPerUkeTekst } from '../../../../../utils/deltaker-utils'

interface Props {
  readonly endring: ForslagEndring
  readonly begrunnelse: string | null
  readonly sendt: Date
}

export function ForslagEndringsdetaljer({
  endring,
  begrunnelse,
  sendt
}: Props) {
  return (
    <>
      <EndringsDetaljer endring={endring} />
      {begrunnelse && (
        <BodyLong size="small">Begrunnelse: {begrunnelse}</BodyLong>
      )}
      <Detail>Forslag sendt fra arrangør: {formatDate(sendt)}</Detail>
    </>
  )
}

function EndringsDetaljer({ endring }: { readonly endring: ForslagEndring }) {
  switch (endring.type) {
    case ForslagEndringType.ForlengDeltakelse:
      return (
        <>
          <BodyShort size="small">
            Ny sluttdato: {formatDate(endring.sluttdato)}
          </BodyShort>
        </>
      )
    case ForslagEndringType.IkkeAktuell: {
      return (
        <>
          <BodyShort size="small">
            Årsak: {endringAarsakTekstMapper(endring.aarsak)}
          </BodyShort>
        </>
      )
    }
    case ForslagEndringType.AvsluttDeltakelse: {
      return (
        <>
          <BodyShort size="small">
            Årsak: {endringAarsakTekstMapper(endring.aarsak)}
          </BodyShort>
          <BodyShort size="small">
            Ny sluttdato: {formatDate(endring.sluttdato)}
          </BodyShort>
        </>
      )
    }
    case ForslagEndringType.Deltakelsesmengde: {
      return (
        <BodyShort size="small">
          Ny deltakelsesmengde: {endring.deltakelsesprosent} %
          {endring.dagerPerUke && (
            <> fordelt på {getDagerPerUkeTekst(endring.dagerPerUke)}</>
          )}
        </BodyShort>
      )
    }
    default:
      assertNever(endring)
  }
}
