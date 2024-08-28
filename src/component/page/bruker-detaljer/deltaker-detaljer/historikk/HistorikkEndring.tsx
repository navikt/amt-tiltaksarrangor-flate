import { BodyLong, Detail } from '@navikt/ds-react'
import { HistorikkElement } from './HistorikkElement'
import { DeltakerEndring, Endring, EndringType } from '../../../../../api/data/historikk'
import { EMDASH } from '../../../../../utils/constants'
import { DeltakelseInnholdListe } from '../DeltakelseInnholdListe'
import { formatDate } from '../../../../../utils/date-utils'
import { HistorikkEndringTypeIkon } from './HistorikkEndringTypeIkon'
import { getDeltakerStatusAarsakText, getEndringsTittel } from '../../../../../utils/text-mappers'

interface Props {
  deltakerEndring: DeltakerEndring
}

const getEndringsDetaljer = (endring: Endring) => {
  switch (endring.type) {
    case EndringType.IkkeAktuell: {
      return (
        <>
          <BodyLong size="small">
            Årsak: {getDeltakerStatusAarsakText(endring.aarsak)}
          </BodyLong>
          {endring.begrunnelse && (
            <BodyLong size="small">
              NAVs begrunnelse: {endring.begrunnelse}
            </BodyLong>
          )}
        </>
      )
    }
    case EndringType.AvsluttDeltakelse: {
      return (
        <>
          <BodyLong size="small">
            Årsak: {getDeltakerStatusAarsakText(endring.aarsak)}
          </BodyLong>
          {endring.begrunnelse && (
            <BodyLong size="small">
              NAVs begrunnelse: {endring.begrunnelse}
            </BodyLong>
          )}
        </>
      )
    }
    case EndringType.EndreBakgrunnsinformasjon: {
      return (
        <BodyLong size="small">
          {endring.bakgrunnsinformasjon || EMDASH}
        </BodyLong>
      )
    }
    case EndringType.EndreInnhold: {
      return (
        <DeltakelseInnholdListe
          deltakelsesinnhold={{ ledetekst: '', innhold: endring.innhold }}
          className="-mt-3 -mb-2"
        />
      )
    }
    case EndringType.ReaktiverDeltakelse: {
      return (
        <BodyLong size="small">
          NAVs begrunnelse: {endring.begrunnelse}
        </BodyLong>
      )
    }
    case EndringType.ForlengDeltakelse:
    case EndringType.EndreSluttdato:
    case EndringType.EndreDeltakelsesmengde:
    case EndringType.EndreSluttarsak: {
      return endring.begrunnelse ? (
        <BodyLong size="small">
          NAVs begrunnelse: {endring.begrunnelse}
        </BodyLong>
      ) : (
        <div className="-mb-1" />
      )
    }
    case EndringType.EndreStartdato: {
      return (
        <>
          <BodyLong size="small">
            Forventet sluttdato: {formatDate(endring.sluttdato)}
          </BodyLong>
          {endring.begrunnelse && (
            <BodyLong size="small">
              NAVs begrunnelse: {endring.begrunnelse}
            </BodyLong>
          )}
        </>
      )
    }
  }
}

export const HistorikkEndring = ({ deltakerEndring }: Props) => {
  return (
    <HistorikkElement
      tittel={getEndringsTittel(deltakerEndring.endring)}
      icon={<HistorikkEndringTypeIkon type={deltakerEndring.endring.type} size={'small'} />}
      forslag={deltakerEndring.forslag}
    >
      {getEndringsDetaljer(deltakerEndring.endring)}
      <Detail
        className="mt-1"
        textColor="subtle"
      >
        {`Endret ${formatDate(deltakerEndring.endret)} av ${deltakerEndring.endretAv} ${deltakerEndring.endretAvEnhet}.`}
      </Detail>
    </HistorikkElement>
  )
}
