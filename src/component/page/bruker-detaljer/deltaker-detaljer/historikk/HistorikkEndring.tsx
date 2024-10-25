import { BodyLong, Detail } from '@navikt/ds-react'
import { HistorikkElement } from './HistorikkElement'
import { DeltakerEndring, Endring, EndringType } from '../../../../../api/data/historikk'
import { EMDASH } from '../../../../../utils/constants'
import { DeltakelseInnholdListe } from '../DeltakelseInnholdListe'
import { formatDate } from '../../../../../utils/date-utils'
import { getDeltakerStatusAarsakText, getEndringsTittel } from '../../../../../utils/text-mappers'
import styles from './Historikk.module.scss'
import { EndringTypeIkon } from '../EndringTypeIkon'
import globalStyles from '../../../../../globals.module.scss'

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
            <BodyLong size="small" className={globalStyles.textPreWrap}>
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
            <BodyLong size="small" className={globalStyles.textPreWrap}>
              NAVs begrunnelse: {endring.begrunnelse}
            </BodyLong>
          )}
        </>
      )
    }
    case EndringType.EndreBakgrunnsinformasjon: {
      return (
        <BodyLong size="small" className={globalStyles.textPreWrap}>
          {endring.bakgrunnsinformasjon || EMDASH}
        </BodyLong>
      )
    }
    case EndringType.EndreInnhold: {
      return (<>
        {
          endring.ledetekst && <BodyLong size="small">{endring.ledetekst}</BodyLong>
        }
        <DeltakelseInnholdListe
          deltakelsesinnhold={{ ledetekst: endring.ledetekst ?? '', innhold: endring.innhold }}
          className={styles.innhold_liste}
        />
      </>)
    }
    case EndringType.ReaktiverDeltakelse: {
      return (
        <BodyLong size="small" className={globalStyles.textPreWrap}>
          NAVs begrunnelse: {endring.begrunnelse}
        </BodyLong>
      )
    }
    case EndringType.ForlengDeltakelse:
    case EndringType.EndreSluttdato:
    case EndringType.EndreDeltakelsesmengde:
    case EndringType.EndreSluttarsak: {
      return endring.begrunnelse ? (
        <BodyLong size="small" className={globalStyles.textPreWrap}>
          NAVs begrunnelse: {endring.begrunnelse}
        </BodyLong>
      ) : (
          <div className={styles.tomDiv} />
      )
    }
    case EndringType.EndreStartdato: {
      return (
        <>
          <BodyLong size="small">
            Forventet sluttdato: {formatDate(endring.sluttdato)}
          </BodyLong>
          {endring.begrunnelse && (
            <BodyLong size="small" className={globalStyles.textPreWrap}>
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
      icon={<EndringTypeIkon type={deltakerEndring.endring.type} size={'small'} />}
      forslag={deltakerEndring.forslag}
    >
      {getEndringsDetaljer(deltakerEndring.endring)}
      <Detail
        className={styles.endring_detail}
        textColor="subtle"
      >
        {`Endret ${formatDate(deltakerEndring.endret)} av ${deltakerEndring.endretAv} ${deltakerEndring.endretAvEnhet}.`}
      </Detail>
    </HistorikkElement>
  )
}
