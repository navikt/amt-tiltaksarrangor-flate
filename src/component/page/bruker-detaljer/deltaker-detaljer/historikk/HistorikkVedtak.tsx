import { CaretRightCircleFillIcon } from '@navikt/aksel-icons'
import { BodyLong, Detail } from '@navikt/ds-react'
import { Vedtak } from '../../../../../api/data/historikk'
import { Tiltakskode } from '../../../../../api/data/tiltak'
import { dateStrWithMonthName, formatDate } from '../../../../../utils/date-utils'
import { getDeltakelsesmengdetekst, skalViseDeltakelsesmengde } from '../../../../../utils/deltaker-utils'
import { DeltakelseInnholdListe } from '../DeltakelseInnholdListe'
import styles from './Historikk.module.scss'
import { HistorikkElement } from './HistorikkElement'
import globalStyles from '../../../../../globals.module.scss'

interface Props {
  endringsVedtak: Vedtak
  tiltakstype: Tiltakskode
}

export const HistorikkVedtak = ({ endringsVedtak, tiltakstype }: Props) => {
  const {
    fattet,
    opprettetAv,
    opprettetAvEnhet,
    deltakelsesinnhold,
    deltakelsesprosent,
    dagerPerUke,
    bakgrunnsinformasjon
  } = endringsVedtak

  const harInnhold = deltakelsesinnhold.innhold.length > 0 || deltakelsesinnhold.ledetekst

  return (
    <HistorikkElement
      tittel={`Påmelding ${dateStrWithMonthName(fattet)}`}
      icon={<CaretRightCircleFillIcon color="var(--a-limegreen-800)" />}
    >
      {harInnhold && (<>
        <BodyLong size="small" weight="semibold">
          Dette er innholdet
        </BodyLong>
        {deltakelsesinnhold.ledetekst && (
          <BodyLong size="small">{deltakelsesinnhold.ledetekst}</BodyLong>
        )}
        <DeltakelseInnholdListe
          tiltakstype={tiltakstype}
          deltakelsesinnhold={deltakelsesinnhold}
          className={styles.innhold_liste}
        /> </>
      )}

      {bakgrunnsinformasjon && bakgrunnsinformasjon.length > 0 && (
        <>
          <BodyLong size="small" weight="semibold" className={styles.vedtak_info}>
            Bakgrunnsinfo
          </BodyLong>
          <BodyLong size="small" className={globalStyles.textPreWrap}>{bakgrunnsinformasjon}</BodyLong>
        </>
      )}

      {skalViseDeltakelsesmengde(tiltakstype) && (
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
