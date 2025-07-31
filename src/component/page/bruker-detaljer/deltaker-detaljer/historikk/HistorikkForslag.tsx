import { BodyLong, Detail } from '@navikt/ds-react'
import { HistorikkForslag as Forslag, ForslagStatusType } from '../../../../../api/data/forslag'
import globalStyles from '../../../../../globals.module.scss'
import { formatDate } from '../../../../../utils/date-utils'
import { getForslagTittel } from '../../../../../utils/text-mappers'
import { EndringTypeIkon } from '../EndringTypeIkon'
import { HistorikkElement } from './HistorikkElement'

interface Props {
  forslag: Forslag
}

const getForslagStatusTekst = (forslag: Forslag) => {
  const forslagStatus = forslag.status
  switch (forslagStatus.type) {
    case ForslagStatusType.Avvist:
      return `Avvist ${formatDate(forslagStatus.avvist)} av ${forslagStatus.avvistAv} ${forslagStatus.avvistAvEnhet}.`
    case ForslagStatusType.Tilbakekalt:
      return `Tilbakekalt ${formatDate(forslagStatus.tilbakekalt)} av ${forslag.arrangorNavn}.`
    case ForslagStatusType.Erstattet:
      return `Erstattet av et nyere forslag ${formatDate(forslagStatus.erstattet)} av ${forslag.arrangorNavn}.`
    default:
      return '' // Vi viser ikke andre statuser i historikken.
  }
}

export const HistorikkForslag = ({ forslag }: Props) => {
  const forslagStatusTekst = getForslagStatusTekst(forslag)
  return (
    <HistorikkElement
      tittel={`Forslag: ${getForslagTittel(forslag.endring.type)}`}
      icon={<EndringTypeIkon type={forslag.endring.type} size={'small'} />}
      forslag={forslag}
    >
      {forslag.status.type === ForslagStatusType.Avvist && (
        <BodyLong size="small" className={globalStyles.textPreWrap}>
          {forslag.status.begrunnelseFraNav}
        </BodyLong>
      )}

      {forslagStatusTekst && (
        <Detail textColor="subtle">{forslagStatusTekst}</Detail>
      )}
    </HistorikkElement>
  )
}
