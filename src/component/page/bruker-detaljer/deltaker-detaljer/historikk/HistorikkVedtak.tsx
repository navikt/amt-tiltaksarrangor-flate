import { CaretRightCircleFillIcon } from '@navikt/aksel-icons'
import { BodyLong, Detail } from '@navikt/ds-react'
import { Vedtak } from '../../../../../api/data/historikk'
import { Tiltakskode } from '../../../../../api/data/tiltak'
import globalStyles from '../../../../../globals.module.scss'
import { dateStrWithMonthName, formatDate } from '../../../../../utils/date-utils'
import { getDeltakelsesmengdetekst, skalViseDeltakelsesmengde } from '../../../../../utils/deltaker-utils'
import styles from './Historikk.module.scss'
import { HistorikkElement } from './HistorikkElement'
import { HistorikkInnhold } from './HistorikkInnhold'

interface Props {
  endringsVedtak: Vedtak
  tiltakskode: Tiltakskode
}

export const HistorikkVedtak = ({ endringsVedtak, tiltakskode }: Props) => {
  const {
    fattet,
    opprettetAv,
    opprettetAvEnhet,
    deltakelsesinnhold,
    deltakelsesprosent,
    dagerPerUke,
    bakgrunnsinformasjon
  } = endringsVedtak

  return (
    <HistorikkElement
      tittel={`Påmelding ${dateStrWithMonthName(fattet)}`}
      icon={<CaretRightCircleFillIcon color="var(--a-limegreen-800)" />}
    >
      <HistorikkInnhold deltakelsesinnhold={deltakelsesinnhold} tiltakskode={tiltakskode} />

      {bakgrunnsinformasjon && bakgrunnsinformasjon.length > 0 && (
        <>
          <BodyLong size="small" weight="semibold" className={styles.vedtak_info}>
            Bakgrunnsinfo
          </BodyLong>
          <BodyLong size="small" className={globalStyles.textPreWrap}>{bakgrunnsinformasjon}</BodyLong>
        </>
      )}

      {skalViseDeltakelsesmengde(tiltakskode) && (
        <>
          <BodyLong size="small" weight="semibold" className={styles.vedtak_info}>
            Deltakelsesmengde
          </BodyLong>
          <BodyLong size="small">
            {getDeltakelsesmengdetekst(deltakelsesprosent, dagerPerUke)}
          </BodyLong>
        </>
      )}

      <Detail className={styles.fattet_av} textColor="subtle">
        Meldt på av {opprettetAv} {opprettetAvEnhet} {formatDate(fattet)}.
      </Detail>
    </HistorikkElement>
  )
}
