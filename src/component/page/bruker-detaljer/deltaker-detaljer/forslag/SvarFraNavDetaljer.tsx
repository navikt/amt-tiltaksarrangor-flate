import { BodyLong, Detail, ReadMore } from '@navikt/ds-react'
import { DeltakerEndring } from '../../../../../api/data/historikk'
import { Tiltakskode } from '../../../../../api/data/tiltak'
import { formatDate } from '../../../../../utils/date-utils'
import { getForslagTittel } from '../../../../../utils/text-mappers'
import { ForslagtypeDetaljer } from '../historikk/HistorikkElement'
import { getEndringsDetaljer } from '../historikk/HistorikkEndring'
import styles from './AktivtForslagPanel.module.scss'
import { ForslagStatusType, HistorikkForslag } from '../../../../../api/data/forslag'

interface Props {
  deltakerEndring: DeltakerEndring
  tiltakstype: Tiltakskode
}

export const Endringsdetaljer = ({
  deltakerEndring,
  tiltakstype,
}: Props) => {
  return (
    <>
      {getEndringsDetaljer(deltakerEndring.endring, tiltakstype)}
      <Detail className={styles.endring_detail} textColor="subtle">
        {`Endret ${formatDate(deltakerEndring.endret)} av ${deltakerEndring.endretAv} ${deltakerEndring.endretAvEnhet}.`}
      </Detail>
      {deltakerEndring.forslag && getForslagEndringsdetaljer(deltakerEndring.forslag)}
    </>
  )
}

interface AvvistForslagDetaljerProps {
  forslag: HistorikkForslag
}

export const AvvistForslagDetaljer = ({
  forslag,
}: AvvistForslagDetaljerProps) => {
  return (
    <>
      {forslag.status.type === ForslagStatusType.Avvist && (
        <>
          <BodyLong size="small">{forslag.status.begrunnelseFraNav}</BodyLong>
          <Detail className={styles.endring_detail} textColor="subtle">
            {`Avvist ${formatDate(forslag.status.avvist)} av ${forslag.status.avvistAv} ${forslag.status.avvistAvEnhet}.`}
          </Detail>
        </>
      )}

      {forslag && getForslagEndringsdetaljer(forslag)}
    </>
  )
}

const getForslagEndringsdetaljer = (forslag: HistorikkForslag) => {
  return <div className={styles.forslag_detail_wrapper}>
    <ReadMore size="small" header="Forslaget fra arrangør">
      <BodyLong size="small" weight="semibold">
        {getForslagTittel(forslag.endring.type)}
      </BodyLong>
      <ForslagtypeDetaljer forslag={forslag} />
      <Detail
        className={styles.forslag_detail}
        textColor="subtle"
      >
        {`Sendt ${formatDate(forslag.opprettet)} fra ${forslag.arrangorNavn}.`}
      </Detail>
    </ReadMore>
  </div>
}