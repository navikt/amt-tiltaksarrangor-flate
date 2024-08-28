import { BodyLong, BodyShort, Detail, Heading, ReadMore, Tag } from '@navikt/ds-react'
import { ForslagEndringType, ForslagStatusType, HistorikkForslag } from '../../../../../api/data/forslag'
import { deltakerprosentText, getForslagEndringAarsakText, getForslagStatusTypeText, getForslagTittel } from '../../../../../utils/text-mappers'
import { formatDate } from '../../../../../utils/date-utils'
import { assertNever } from '../../../../../utils/assert-never'

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

export const ForslagtypeDetaljer = ({ forslag }: { forslag: HistorikkForslag }) => {
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
              Ny sluttdato: {formatDate(forslag.endring.sluttdato)}
            </BodyLong>
            <BodyLong size="small">
              Årsak: {getForslagEndringAarsakText(forslag.endring.aarsak)}
            </BodyLong>
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
            {deltakerprosentText(
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
            <BodyLong size="small">
              Forventet sluttdato: {formatDate(forslag.endring.sluttdato)}
            </BodyLong>
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
        <BodyLong size="small">Begrunnelse: {forslag.begrunnelse}</BodyLong>
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
      className="grid gap-2"
      style={{
        gridTemplateColumns: '1.25rem auto'
      }}
    >
      <div className="mt-3 text-xl" aria-hidden>
        {icon}
      </div>

      <div className="pt-2">
        <div className="flex md:flex-row flex-col justify-between w-full">
          <Heading level="2" size="small" className="mb-1">
            {tittel}
          </Heading>
          {forslag && (
            <div className="w-fit md:mb-0 mb-1">
              {getForslagStatusTag(forslag.status.type)}
            </div>
          )}
        </div>

        {children}
        {forslag && (
          <div className="mt-1 mb-1">
            <ReadMore size="small" header="Forslaget fra arrangør">
              <BodyLong size="small" weight="semibold">
                {getForslagTittel(forslag.endring.type)}
              </BodyLong>
              <ForslagtypeDetaljer forslag={forslag} />
              <Detail
                className="mt-1"
                textColor="subtle"
              >{`Sendt ${formatDate(forslag.opprettet)} fra ${forslag.arrangorNavn}.`}</Detail>
            </ReadMore>
          </div>
        )}
      </div>
    </div>
  )
}
