import { Box, Heading } from '@navikt/ds-react'
import { AktivtForslag } from '../../../../../api/data/forslag'
import { Tiltakskode } from '../../../../../api/data/tiltak'
import { UlestEndring, UlestEndringType } from '../../../../../api/data/ulestEndring'
import { dateStrWithMonthName } from '../../../../../utils/date-utils'
import { getEndringsTittel } from '../../../../../utils/text-mappers'
import { EndringPanel } from './EndringPanel'
import { FjernEndring } from './FjernEndring'
import { FjernForslag } from './FjernForslag'
import styles from './Forslag.module.scss'
import { ForslagEndringsdetaljer } from './ForslagEndringsdetaljer'
import { ulestEndringErSvarFraNav } from './forslagUtils'
import {
  AvvistForslagDetaljer,
  DeltMedArrangorDetaljer,
  Endringsdetaljer,
  NavBrukerDetaljer,
  NavDetaljer,
  NyDeltakerDetaljer,
  TildeltPlassDetaljer,
  UlestAvslagDetaljer
} from './UlestEndringDetaljer'

interface Props {
  forslag: AktivtForslag[]
  deltakerId: string
  ulesteEndringer: UlestEndring[]
  tiltakstype: Tiltakskode
  onTilbakekalt: (forslagId: string) => void
  onMarkertSomLest: (endringId: string) => void
}

export const UbehandledeEndringer = ({
  deltakerId,
  forslag,
  ulesteEndringer,
  tiltakstype,
  onTilbakekalt,
  onMarkertSomLest
}: Props) => {
  if (forslag.length === 0 && ulesteEndringer.length === 0) {
    return null
  }

  const ulesteSvarFraNav = ulesteEndringer.filter(ulestEndringErSvarFraNav)
  const ulesteOppdateringerFraNav = ulesteEndringer.filter((it) => !ulestEndringErSvarFraNav(it))

  return (
    <Box
      background="bg-subtle"
      padding={{ xs: '2', md: '4' }}
      borderRadius="medium"
      className={styles.ulesteEndringerContainer}
    >
      {(forslag.length > 0 || ulesteSvarFraNav.length > 0) && (<>
        <Heading level="3" size="small" className={styles.aktiveForslagTitle}>
          Forslag sendt til Nav:
        </Heading>
        {getSendteForslag(forslag, deltakerId, onTilbakekalt)}
        {getEndringsDetaljer(ulesteSvarFraNav, deltakerId, tiltakstype, onMarkertSomLest)}
      </>)}

      {ulesteOppdateringerFraNav.length > 0 && (<>
        <Heading level="3" size="small" className={styles.aktiveForslagTitle}>
          Oppdatering fra Nav:
        </Heading>
        {getEndringsDetaljer(ulesteOppdateringerFraNav, deltakerId, tiltakstype, onMarkertSomLest)}
      </>)}
    </Box>
  )
}

const getSendteForslag = (
  forslag: AktivtForslag[],
  deltakerId: string,
  onTilbakekalt: (forslagId: string) => void) => {
  return forslag.map((it) => {
    return (
      <EndringPanel
        key={it.id}
        erAktivtForslag
        endringType={it.endring.type}
        forslagStatusType={it.status.type}
        fjernEndring={
          <FjernForslag forslagId={it.id} deltakerId={deltakerId} onTilbakekalt={onTilbakekalt} />
        }
        nyNavVeileder={false}
      >
        <ForslagEndringsdetaljer
          endring={it.endring}
          begrunnelse={it.begrunnelse}
          sendt={it.opprettet}
        />
      </EndringPanel>
    )
  })
}

const getEndringsDetaljer = (
  ulesteEndringer: UlestEndring[],
  deltakerId: string,
  tiltakstype: Tiltakskode,
  onMarkertSomLest: (endringId: string) => void) => {
  return ulesteEndringer.map((it, i) => (
    <EndringPanel
      key={`${it.id}${i}`}
      tittel={getUlestOppdateringTittel(it)}
      ulestEndringType={it.oppdatering.type}
      endringType={getEndringsType(it)}
      forslagStatusType={getForslagStatusType(it)}
      fjernEndring={<FjernEndring endringId={it.id} deltakerId={deltakerId} onMarkertSomLest={onMarkertSomLest} />}
      nyNavVeileder={it.oppdatering.type === UlestEndringType.NavEndring && !!it.oppdatering.nyNavVeileder}
    >
      {it.oppdatering.type === UlestEndringType.DeltakelsesEndring &&
        <Endringsdetaljer
          deltakerEndring={it.oppdatering.endring}
          tiltakstype={tiltakstype}
        />
      }
      {it.oppdatering.type === UlestEndringType.AvvistForslag
        && <AvvistForslagDetaljer forslag={it.oppdatering.forslag} />
      }
      {it.oppdatering.type === UlestEndringType.NavBrukerEndring && (
        <NavBrukerDetaljer oppdatering={it.oppdatering} />
      )}
      {it.oppdatering.type === UlestEndringType.NavEndring && (
        <NavDetaljer oppdatering={it.oppdatering} />
      )}
      {it.oppdatering.type === UlestEndringType.NyDeltaker && (
        <NyDeltakerDetaljer oppdatering={it.oppdatering} />
      )}
      {it.oppdatering.type === UlestEndringType.DeltMedArrangor && (
        <DeltMedArrangorDetaljer oppdatering={it.oppdatering} />
      )}
      {it.oppdatering.type === UlestEndringType.TildeltPlass && (
        <TildeltPlassDetaljer oppdatering={it.oppdatering} />
      )}
			{it.oppdatering.type === UlestEndringType.Avslag && (
				<UlestAvslagDetaljer oppdatering={it.oppdatering} />
			)}
    </EndringPanel>
  ))
}

const getEndringsType = (ulesteEndringer: UlestEndring) => {
  if (ulesteEndringer.oppdatering.type === UlestEndringType.DeltakelsesEndring) {
    return ulesteEndringer.oppdatering.endring.endring.type
  } else if (ulesteEndringer.oppdatering.type === UlestEndringType.AvvistForslag) {
    return ulesteEndringer.oppdatering.forslag.endring.type
  }
  return undefined

}

const getForslagStatusType = (ulesteEndringer: UlestEndring) => {
  if (ulesteEndringer.oppdatering.type === UlestEndringType.DeltakelsesEndring) {
    return ulesteEndringer.oppdatering.endring.forslag?.status.type
  } else if (ulesteEndringer.oppdatering.type === UlestEndringType.AvvistForslag) {
    return ulesteEndringer.oppdatering.forslag.status.type
  }
  return undefined
}

const getUlestOppdateringTittel = (ulesteEndringer: UlestEndring) => {
  if (ulesteEndringer.oppdatering.type === UlestEndringType.DeltakelsesEndring) {
    return getEndringsTittel(ulesteEndringer.oppdatering.endring.endring)
  } else if (ulesteEndringer.oppdatering.type === UlestEndringType.NyDeltaker) {
    return `Påmelding ${dateStrWithMonthName(ulesteEndringer.oppdatering.opprettet)}`
  } else if (ulesteEndringer.oppdatering.type === UlestEndringType.DeltMedArrangor) {
    return 'Informasjon sendt til arrangør'
  } else if (ulesteEndringer.oppdatering.type === UlestEndringType.TildeltPlass) {
    return 'Fått plass'
  }
  return undefined
}
