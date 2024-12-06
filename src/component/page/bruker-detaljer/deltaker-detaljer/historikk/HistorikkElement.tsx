import {
  BodyLong,
  BodyShort,
  Detail,
  Heading,
  ReadMore,
  Tag
} from '@navikt/ds-react'
import {
  ForslagEndringType,
  ForslagStatusType,
  HistorikkForslag
} from '../../../../../api/data/forslag'
import { assertNever } from '../../../../../utils/assert-never'
import { formatDate } from '../../../../../utils/date-utils'
import { getDeltakelsesmengdetekst } from '../../../../../utils/deltaker-utils'
import {
  getForslagEndringAarsakText,
  getForslagStatusTypeText,
  getForslagTittel
} from '../../../../../utils/text-mappers'
import styles from './Historikk.module.scss'
import globalStyles from '../../../../../globals.module.scss'
import React from 'react'

interface Props {
  tittel: string
  icon: React.ReactNode
  forslag?: HistorikkForslag | null
  children: React.ReactNode
}

export const getForslagStatusTag = (forslagStatusType: ForslagStatusType) => {
  switch (forslagStatusType) {
    case ForslagStatusType.Erstattet:
    case ForslagStatusType.Tilbakekalt:
    case ForslagStatusType.Avvist:
      return (
        <Tag size="small" variant="neutral">
          {getForslagStatusTypeText(forslagStatusType)}
        </Tag>
      )
    case ForslagStatusType.VenterPaSvar:
      return (
        <Tag size="small" variant="info">
          {getForslagStatusTypeText(forslagStatusType)}
        </Tag>
      )
    case ForslagStatusType.Godkjent:
      return null // ForslagStatusType.Godkjent vises ikke per nå
  }
}

export const ForslagtypeDetaljer = ({
  forslag
}: {
  forslag: HistorikkForslag
}) => {
  const detaljer = (forslag: HistorikkForslag) => {
    switch (forslag.endring.type) {
      case ForslagEndringType.IkkeAktuell:
        return (
          <BodyLong size="small">
            Årsak: {getForslagEndringAarsakText(forslag.endring.aarsak)}
          </BodyLong>
        )
      case ForslagEndringType.AvsluttDeltakelse:
        return (
          <>
            <BodyLong size="small">
              Årsak: {getForslagEndringAarsakText(forslag.endring.aarsak)}
            </BodyLong>
            {forslag.endring.harDeltatt !== null && (
              <BodyLong size="small">
                Har personen deltatt?{' '}
                {forslag.endring.harDeltatt ? 'Ja' : 'Nei'}
              </BodyLong>
            )}
            {forslag.endring.sluttdato && (
              <BodyLong size="small">
                Ny sluttdato: {formatDate(forslag.endring.sluttdato)}
              </BodyLong>
            )}
          </>
        )
      case ForslagEndringType.ForlengDeltakelse:
        return (
          <BodyLong size="small">
            Ny sluttdato: {formatDate(forslag.endring.sluttdato)}
          </BodyLong>
        )
      case ForslagEndringType.Deltakelsesmengde:
        return (
          <BodyShort size="small">
            Ny deltakelsesmengde:{' '}
            {getDeltakelsesmengdetekst(
              forslag.endring.deltakelsesprosent,
              forslag.endring.dagerPerUke
            )}
          </BodyShort>
        )
      case ForslagEndringType.Sluttdato:
        return (
          <BodyLong size="small">
            Ny sluttdato: {formatDate(forslag.endring.sluttdato)}
          </BodyLong>
        )
      case ForslagEndringType.Startdato:
        return (
          <>
            <BodyLong size="small">
              Ny oppstartsdato: {formatDate(forslag.endring.startdato)}
            </BodyLong>
            {forslag.endring.sluttdato && (
              <BodyLong size="small">
                Forventet sluttdato: {formatDate(forslag.endring.sluttdato)}
              </BodyLong>
            )}
          </>
        )
      case ForslagEndringType.Sluttarsak:
        return (
          <BodyLong size="small">
            Ny sluttårsak: {getForslagEndringAarsakText(forslag.endring.aarsak)}
          </BodyLong>
        )
      default:
        assertNever(forslag.endring)
    }
  }
  return (
    <>
      {detaljer(forslag)}
      {forslag.begrunnelse && (
        <BodyLong size="small" className={globalStyles.textPreWrap}>
          Begrunnelse: {forslag.begrunnelse}
        </BodyLong>
      )}
    </>
  )
}

export const HistorikkElement = ({
  tittel,
  icon,
  forslag,
  children
}: Props) => {
  return (
    <div
      className={styles.historikk_item}
      style={{
        gridTemplateColumns: '1.25rem auto'
      }}
    >
      <div className={styles.historikk_ikon} aria-hidden>
        {icon}
      </div>

      <div className={styles.historikk_content_wrapper}>
        <div className={styles.historikk_heading_wrapper}>
          <Heading level="2" size="small" className={styles.historikk_heading}>
            {tittel}
          </Heading>
          {forslag && (
            <div className={styles.historikk_status_tag}>
              {getForslagStatusTag(forslag.status.type)}
            </div>
          )}
        </div>

        {children}
        {forslag && (
          <div className={styles.historikk_forslag_detail_wrapper}>
            <ReadMore size="small" header="Forslaget fra arrangør">
              <BodyLong size="small" weight="semibold">
                {getForslagTittel(forslag.endring.type)}
              </BodyLong>
              <ForslagtypeDetaljer forslag={forslag} />
              <Detail
                className={styles.endring_detail}
                textColor="subtle"
              >{`Sendt ${formatDate(forslag.opprettet)} fra ${forslag.arrangorNavn}.`}</Detail>
            </ReadMore>
          </div>
        )}
      </div>
    </div>
  )
}
