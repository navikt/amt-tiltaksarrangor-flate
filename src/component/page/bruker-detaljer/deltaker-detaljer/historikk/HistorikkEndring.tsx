import { BodyLong, Detail } from '@navikt/ds-react'
import { HistorikkElement } from './HistorikkElement'
import {
  DeltakerEndring,
  Endring,
  EndringType,
  Oppstartstype
} from '../../../../../api/data/historikk'
import { EMDASH } from '../../../../../utils/constants'
import { DeltakelseInnholdListe } from '../DeltakelseInnholdListe'
import { formatDate } from '../../../../../utils/date-utils'
import {
  getDeltakerStatusAarsakText,
  getEndringsTittel
} from '../../../../../utils/text-mappers'
import styles from './Historikk.module.scss'
import { EndringTypeIkon } from '../EndringTypeIkon'
import globalStyles from '../../../../../globals.module.scss'
import { Tiltakskode } from '../../../../../api/data/tiltak'

interface Props {
  deltakerEndring: DeltakerEndring
  tiltakstype: Tiltakskode
}

export const getEndringsDetaljer = (endring: Endring, tiltakstype: Tiltakskode) => {
  switch (endring.type) {
    case EndringType.IkkeAktuell: {
      return (
        <>
          <BodyLong size="small">
            Årsak: {getDeltakerStatusAarsakText(endring.aarsak)}
          </BodyLong>
          {endring.begrunnelse && (
            <BodyLong size="small" className={globalStyles.textPreWrap}>
              Navs begrunnelse: {endring.begrunnelse}
            </BodyLong>
          )}
        </>
      )
    }
    case EndringType.AvsluttDeltakelse: {
      return (
        <>
          {endring.aarsak && (
            <BodyLong size="small">
              Årsak: {getDeltakerStatusAarsakText(endring.aarsak)}
            </BodyLong>
          )}
          {endring.oppstartstype === Oppstartstype.FELLES && (
            <BodyLong size="small">
              Er kurset fullført: {endring.harFullfort ? 'Ja' : 'Nei'}
            </BodyLong>
          )}
          {endring.begrunnelse && (
            <BodyLong size="small" className={globalStyles.textPreWrap}>
              Navs begrunnelse: {endring.begrunnelse}
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
      return (
        <>
          {endring.ledetekst && (
            <BodyLong size="small">{endring.ledetekst}</BodyLong>
          )}
          <DeltakelseInnholdListe
            tiltakstype={tiltakstype}
            deltakelsesinnhold={{
              ledetekst: endring.ledetekst ?? '',
              innhold: endring.innhold
            }}
            className={styles.innhold_liste}
          />
        </>
      )
    }
    case EndringType.ReaktiverDeltakelse: {
      return (
        <BodyLong size="small" className={globalStyles.textPreWrap}>
          Navs begrunnelse: {endring.begrunnelse}
        </BodyLong>
      )
    }
    case EndringType.EndreDeltakelsesmengde: {
      return (
        <>
          {endring.gyldigFra && (
            <BodyLong size="small">
              Gjelder fra: {formatDate(endring.gyldigFra)}
            </BodyLong>
          )}
          {endring.begrunnelse && (
            <BodyLong size="small" className={globalStyles.textPreWrap}>
              Navs begrunnelse: {endring.begrunnelse}
            </BodyLong>
          )}
        </>
      )
    }
    case EndringType.ForlengDeltakelse:
    case EndringType.FjernOppstartsdato:
    case EndringType.EndreSluttdato:
    case EndringType.EndreSluttarsak: {
      return endring.begrunnelse ? (
        <BodyLong size="small" className={globalStyles.textPreWrap}>
          Navs begrunnelse: {endring.begrunnelse}
        </BodyLong>
      ) : (
        <div className={styles.tomDiv} />
      )
    }
    case EndringType.EndreStartdato: {
      return (
        <>
          {endring.sluttdato && (
            <BodyLong size="small">
                Forventet sluttdato: {formatDate(endring.sluttdato)}
            </BodyLong>
          )}
          {endring.begrunnelse && (
            <BodyLong size="small" className={globalStyles.textPreWrap}>
              Navs begrunnelse: {endring.begrunnelse}
            </BodyLong>
          )}
        </>
      )
    }
  }
}

export const HistorikkEndring = ({ deltakerEndring, tiltakstype }: Props) => {
  return (
    <HistorikkElement
      tittel={getEndringsTittel(deltakerEndring.endring)}
      icon={
        <EndringTypeIkon type={deltakerEndring.endring.type} size={'small'} />
      }
      forslag={deltakerEndring.forslag}
    >
      {getEndringsDetaljer(deltakerEndring.endring, tiltakstype)}
      <Detail className={styles.endring_detail} textColor="subtle">
        {`Endret ${formatDate(deltakerEndring.endret)} av ${deltakerEndring.endretAv} ${deltakerEndring.endretAvEnhet}.`}
      </Detail>
    </HistorikkElement>
  )
}
