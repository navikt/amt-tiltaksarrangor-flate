import { CaretRightCircleFillIcon } from '@navikt/aksel-icons'
import { BodyLong, Detail } from '@navikt/ds-react'
import { InnsokPaaFellesOppstart } from '../../../../../api/data/historikk'
import { dateStrWithMonthName, formatDate } from '../../../../../utils/date-utils'
import styles from './Historikk.module.scss'
import { HistorikkElement } from './HistorikkElement'

interface Props {
  soktInnHistorikk: InnsokPaaFellesOppstart
}

export const HistorikkSoktInn = ({ soktInnHistorikk }: Props) => {
  const {
    innsokt,
    innsoktAv,
    innsoktAvEnhet,
    deltakelsesinnholdVedInnsok
  } = soktInnHistorikk

  return (
    <HistorikkElement
      tittel={`Søknad om plass ${dateStrWithMonthName(innsokt)}`}
      icon={<CaretRightCircleFillIcon color="var(--a-limegreen-800)" />}
    >
      {deltakelsesinnholdVedInnsok?.ledetekst && (<>
        <BodyLong size="small" weight="semibold">
          Dette er innholdet
        </BodyLong>
        <BodyLong size="small">{deltakelsesinnholdVedInnsok.ledetekst}</BodyLong>
        </>)
      }

      <Detail className={styles.fattet_av} textColor="subtle">
        Meldt på av {innsoktAv} {innsoktAvEnhet} {formatDate(innsokt)}.
      </Detail>
    </HistorikkElement>
  )
}
