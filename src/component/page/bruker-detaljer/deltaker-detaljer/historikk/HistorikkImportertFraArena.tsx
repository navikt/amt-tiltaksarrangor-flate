import { CaretRightCircleFillIcon } from '@navikt/aksel-icons'
import { BodyLong, Detail } from '@navikt/ds-react'

import { importertFraArena } from '../../../../../api/data/historikk'
import { Tiltakskode } from '../../../../../api/data/tiltak'
import { dateStrWithMonthName, formatDate } from '../../../../../utils/date-utils'
import { getDeltakelsesmengdetekst, skalViseDeltakelsesmengde } from '../../../../../utils/deltaker-utils'
import { getDeltakerHistorikkStatusDisplayText } from '../../../../../utils/text-mappers'
import { getDeltakerStatusAarsakText } from '../tekst-mappers'
import styles from './Historikk.module.scss'
import { HistorikkElement } from './HistorikkElement'

interface Props {
  deltakelseVedImport: importertFraArena
  tiltakskode: Tiltakskode
}

export const HistorikkImportertFraArena = ({
  deltakelseVedImport,
  tiltakskode
}: Props) => {
  const datoText = `${formatDate(deltakelseVedImport.startdato)} ${deltakelseVedImport.sluttdato
    ? '- ' + formatDate(deltakelseVedImport.sluttdato)
    : '—'
    }`

  return (
    <HistorikkElement
      tittel={`Deltakelsen ble importert ${dateStrWithMonthName(deltakelseVedImport.importertDato)}`}
      icon={<CaretRightCircleFillIcon color="var(--a-limegreen-800)" />}
    >
      <BodyLong size="small">
        {`Status: ${getDeltakerHistorikkStatusDisplayText(deltakelseVedImport.status.type)}`}
      </BodyLong>
      {deltakelseVedImport.status.aarsak && (
        <BodyLong size="small">
          {`Årsak: ${getDeltakerStatusAarsakText(deltakelseVedImport.status.aarsak)}`}
        </BodyLong>
      )}

      {deltakelseVedImport.startdato && (
        <BodyLong size="small">{`Dato: ${datoText}`}</BodyLong>
      )}

      {skalViseDeltakelsesmengde(tiltakskode) && (
        <>
          <BodyLong size="small">
            {`Deltakelsesmengde: ${getDeltakelsesmengdetekst(
              deltakelseVedImport.deltakelsesprosent,
              deltakelseVedImport.dagerPerUke
            )}`}
          </BodyLong>
        </>
      )}

      <Detail className={styles.import_text} textColor="subtle">
        Deltakelsen ble opprettet i et annet datasystem og dette var
        informasjonen da den ble importert.
      </Detail>
    </HistorikkElement>
  )
}
