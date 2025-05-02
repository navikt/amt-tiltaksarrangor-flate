import { BodyLong, Detail, ReadMore } from '@navikt/ds-react'
import { ForslagStatusType, HistorikkForslag } from '../../../../../api/data/forslag'
import { DeltakerEndring } from '../../../../../api/data/historikk'
import { Tiltakskode } from '../../../../../api/data/tiltak'
import { UlestEndringOppdateringDeltMedArrangor, UlestEndringOppdateringNav, UlestEndringOppdateringNavBruker, UlestEndringOppdateringNyDeltaker, UlestEndringOppdateringTildeltPlass } from '../../../../../api/data/ulestEndring'
import { formaterTelefonnummer } from '../../../../../utils/bruker-utils'
import { formatDate } from '../../../../../utils/date-utils'
import { getForslagTittel } from '../../../../../utils/text-mappers'
import { ForslagtypeDetaljer } from '../historikk/HistorikkElement'
import { getEndringsDetaljer } from '../historikk/HistorikkEndring'
import styles from './AktivtForslagPanel.module.scss'

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

interface NavBrukerDetaljerProps {
  oppdatering: UlestEndringOppdateringNavBruker
}

export const NavBrukerDetaljer = ({ oppdatering }: NavBrukerDetaljerProps) => {
  return (
    <>
      {oppdatering.telefonnummer && <BodyLong size="small">
        {`Telefonnummer til deltaker er oppdatert: ${formaterTelefonnummer(oppdatering.telefonnummer)}`}
      </BodyLong>}
      {oppdatering.epost && <BodyLong size="small">
        {`E-posten til deltaker er oppdatert: ${oppdatering.epost}`}
      </BodyLong>}
      <Detail className={styles.endring_detail} textColor="subtle">
        {`Oppdatert ${formatDate(oppdatering.oppdatert)}`}
      </Detail>
    </>
  )
}

interface NavDetaljerProps {
  oppdatering: UlestEndringOppdateringNav
}
export const NavDetaljer = ({ oppdatering }: NavDetaljerProps) => {
  return (
    <>
      {oppdatering.nyNavVeileder
        ? <BodyLong size="small">
          {'Deltakerens Nav-veileder er endret'}
        </BodyLong>
        : <>
          {oppdatering.navVeilederNavn && <BodyLong size="small">
            {`Navnet til Nav-veileder er endret til ${oppdatering.navVeilederNavn}`}
          </BodyLong>}
          {oppdatering.navVeilederEpost && <BodyLong size="small">
            {`E-posten til Nav-veileder er endret til ${oppdatering.navVeilederEpost}`}
          </BodyLong>}
          {oppdatering.navVeilederTelefonnummer && <BodyLong size="small">
            {`Telefonnummer til Nav-veileder er endret til ${formaterTelefonnummer(oppdatering.navVeilederTelefonnummer)}`}
          </BodyLong>}
          {oppdatering.navEnhet && <BodyLong size="small">
            {`Deltakerens Nav-enhet er endret til ${oppdatering.navEnhet}`}
          </BodyLong>}
        </>
      }
      <Detail className={styles.endring_detail} textColor="subtle">
        {`Oppdatert ${formatDate(oppdatering.oppdatert)}`}
      </Detail>
    </>
  )
}

interface NyDeltakerDetaljerProps {
  oppdatering: UlestEndringOppdateringNyDeltaker
}
export const NyDeltakerDetaljer = ({ oppdatering }: NyDeltakerDetaljerProps) => {
  return (
    <Detail className={styles.endring_detail} textColor="subtle">
      {oppdatering.opprettetAvEnhet && oppdatering.opprettetAvNavn
        ? `Meldt på av ${oppdatering.opprettetAvNavn} ${oppdatering.opprettetAvEnhet} ${formatDate(oppdatering.opprettet)}.`
        : `Meldt på ${formatDate(oppdatering.opprettet)}.`
      }
    </Detail>
  )
}

interface DeltMedArrangorDetaljerProps {
  oppdatering: UlestEndringOppdateringDeltMedArrangor
}
export const DeltMedArrangorDetaljer = ({ oppdatering }: DeltMedArrangorDetaljerProps) => {
  return (
    <Detail className={styles.endring_detail} textColor="subtle">
      {oppdatering.deltAvEnhet && oppdatering.deltAvNavn
        ? `Sendt av ${oppdatering.deltAvNavn} ${oppdatering.deltAvEnhet} ${formatDate(oppdatering.delt)}.`
        : `Sendt ${formatDate(oppdatering.delt)}.`
      }
    </Detail>
  )
}

interface TildeltPlassDetaljerProps {
  oppdatering: UlestEndringOppdateringTildeltPlass
}
export const TildeltPlassDetaljer = ({ oppdatering }: TildeltPlassDetaljerProps) => {
  return (
    <Detail className={styles.endring_detail} textColor="subtle">
      {oppdatering.tildeltPlassAvNavn && oppdatering.tildeltPlassAvEnhet
        ? `Tildelt plass av ${oppdatering.tildeltPlassAvNavn} ${oppdatering.tildeltPlassAvEnhet} ${formatDate(oppdatering.tildeltPlass)}.`
        : `Tildelt plass ${formatDate(oppdatering.tildeltPlass)}.`
      }
    </Detail>
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