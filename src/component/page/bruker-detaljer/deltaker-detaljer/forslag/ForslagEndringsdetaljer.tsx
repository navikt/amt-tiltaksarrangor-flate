import { BodyLong, Detail } from '@navikt/ds-react'
import {
  ForslagEndring,
  ForslagEndringType
} from '../../../../../api/data/forslag'
import globalStyles from '../../../../../globals.module.scss'
import { assertNever } from '../../../../../utils/assert-never'
import { formatDate } from '../../../../../utils/date-utils'
import { getDagerPerUkeTekst } from '../../../../../utils/deltaker-utils'
import { endringAarsakTekstMapper } from '../tekst-mappers'
import styles from './Forslag.module.scss'

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
        <BodyLong size="small" className={globalStyles.textPreWrap}>
          Begrunnelse: {begrunnelse}
        </BodyLong>
      )}
      <Detail className={styles.forslag_detail_sendt}>
        Forslag sendt fra arrangør: {formatDate(sendt)}
      </Detail>
    </>
  )
}

function EndringsDetaljer({ endring }: { readonly endring: ForslagEndring }) {
  switch (endring.type) {
    case ForslagEndringType.ForlengDeltakelse:
      return (
        <>
          <BodyLong size="small">
            Ny sluttdato: {formatDate(endring.sluttdato)}
          </BodyLong>
        </>
      )
    case ForslagEndringType.IkkeAktuell: {
      return (
        <>
          <BodyLong size="small">
            Årsak: {endringAarsakTekstMapper(endring.aarsak)}
          </BodyLong>
        </>
      )
    }
    case ForslagEndringType.AvsluttDeltakelse: {
      return (
        <>
          <BodyLong size="small">
            Årsak: {endringAarsakTekstMapper(endring.aarsak)}
          </BodyLong>
          {endring.harDeltatt !== null && (
            <BodyLong size="small">
              Har personen deltatt? {endring.harDeltatt ? 'Ja' : 'Nei'}
            </BodyLong>
          )}
          {endring.sluttdato && (
            <BodyLong size="small">
              Ny sluttdato: {formatDate(endring.sluttdato)}
            </BodyLong>
          )}
        </>
      )
    }
    case ForslagEndringType.Deltakelsesmengde: {
      return (
        <>
          <BodyLong size="small">
            Ny deltakelsesmengde: {endring.deltakelsesprosent} %
            {endring.dagerPerUke && (
              <> fordelt på {getDagerPerUkeTekst(endring.dagerPerUke)}</>
            )}
          </BodyLong>
          {endring.gyldigFra && (
            <BodyLong size="small">
              Gjelder fra: {formatDate(endring.gyldigFra)}
            </BodyLong>
          )}
        </>
      )
    }
    case ForslagEndringType.Sluttdato: {
      return (
        <BodyLong size="small">
          Ny sluttdato: {formatDate(endring.sluttdato)}
        </BodyLong>
      )
    }
    case ForslagEndringType.Startdato:
      return (
        <>
          <BodyLong size="small">
            Ny oppstartsdato: {formatDate(endring.startdato)}
          </BodyLong>
          {endring.sluttdato && (
            <BodyLong size="small">
              Forventet sluttdato: {formatDate(endring.sluttdato)}
            </BodyLong>
          )}
        </>
      )
    case ForslagEndringType.Sluttarsak:
      return (
        <BodyLong size="small">
          Ny sluttårsak: {endringAarsakTekstMapper(endring.aarsak)}
        </BodyLong>
      )
    case ForslagEndringType.FjernOppstartsdato:
      return null
    default:
      assertNever(endring)
  }
}
