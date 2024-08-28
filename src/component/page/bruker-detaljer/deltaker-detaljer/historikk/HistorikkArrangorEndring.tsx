import { BodyLong, Detail } from '@navikt/ds-react'
import { HistorikkElement } from './HistorikkElement'
import { ArrangorEndring, ArrangorEndringsType, DeltakerEndringFraArrangor, EndringType } from '../../../../../api/data/historikk'
import { dateStrWithMonthName, formatDate } from '../../../../../utils/date-utils'
import { HistorikkEndringTypeIkon } from './HistorikkEndringTypeIkon'

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
      return (
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
      icon={<HistorikkEndringTypeIkon type={endringsType} size={'small'} />}
      forslag={null}
    >
      {getEndringsDetaljer(deltakerEndringFraArrangor.endring)}
      <Detail
        className="mt-1"
        textColor="subtle"
      >{`Endret ${formatDate(deltakerEndringFraArrangor.opprettet)} av ${deltakerEndringFraArrangor.arrangorNavn}.`}</Detail>
    </HistorikkElement>
  )
}
