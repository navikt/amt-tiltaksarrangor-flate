import { BodyLong, Detail } from '@navikt/ds-react'
import { ArrangorEndring, ArrangorEndringsType, DeltakerEndringFraArrangor, EndringType } from '../../../../../api/data/historikk'
import { dateStrWithMonthName, formatDate } from '../../../../../utils/date-utils'
import { EndringTypeIkon } from '../EndringTypeIkon'
import styles from './Historikk.module.scss'
import { HistorikkElement } from './HistorikkElement'

interface Props {
  deltakerEndringFraArrangor: DeltakerEndringFraArrangor
}

const mapEndringsType = (endringType: ArrangorEndringsType) => {
  switch (endringType) {
    case ArrangorEndringsType.LeggTilOppstartsdato:
      return EndringType.EndreStartdato
  }
}

const getEndringsTittel = (endring: ArrangorEndring) => {
  switch (endring.type) {
    case ArrangorEndringsType.LeggTilOppstartsdato:
      return `Oppstartsdato er ${dateStrWithMonthName(endring.startdato)}`
  }
}

const getEndringsDetaljer = (endring: ArrangorEndring) => {
  switch (endring.type) {
    case ArrangorEndringsType.LeggTilOppstartsdato:
      return endring.sluttdato && (
          <BodyLong size="small">
            Forventet sluttdato: {formatDate(endring.sluttdato)}
          </BodyLong>
      )
  }
}

export const HistorikkArrangorEndring = ({
  deltakerEndringFraArrangor
}: Props) => {
  const endringsType = mapEndringsType(
    deltakerEndringFraArrangor.endring.type
  )

  return (
    <HistorikkElement
      tittel={getEndringsTittel(deltakerEndringFraArrangor.endring)}
      icon={<EndringTypeIkon type={endringsType} size={'small'} />}
      forslag={null}
    >
      {getEndringsDetaljer(deltakerEndringFraArrangor.endring)}
      <Detail
        className={styles.endring_detail}
        textColor="subtle"
      >{`Endret ${formatDate(deltakerEndringFraArrangor.opprettet)} av ${deltakerEndringFraArrangor.arrangorNavn}.`}</Detail>
    </HistorikkElement>
  )
}
