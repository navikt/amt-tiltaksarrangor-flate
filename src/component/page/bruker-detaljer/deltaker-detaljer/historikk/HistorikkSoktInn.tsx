import { CaretRightCircleFillIcon } from '@navikt/aksel-icons'
import { Detail } from '@navikt/ds-react'
import { InnsokPaaFellesOppstart } from '../../../../../api/data/historikk'
import { Tiltakskode } from '../../../../../api/data/tiltak'
import { dateStrWithMonthName, formatDate } from '../../../../../utils/date-utils'
import styles from './Historikk.module.scss'
import { HistorikkElement } from './HistorikkElement'
import { HistorikkInnhold } from './HistorikkInnhold'

interface Props {
  soktInnHistorikk: InnsokPaaFellesOppstart
  tiltakskode: Tiltakskode
}

export const HistorikkSoktInn = ({ soktInnHistorikk, tiltakskode }: Props) => {
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
      <HistorikkInnhold deltakelsesinnhold={deltakelsesinnholdVedInnsok} tiltakskode={tiltakskode} />

      <Detail className={styles.fattet_av} textColor="subtle">
        Meldt på av {innsoktAv} {innsoktAvEnhet} {formatDate(innsokt)}.
      </Detail>
    </HistorikkElement>
  )
}
