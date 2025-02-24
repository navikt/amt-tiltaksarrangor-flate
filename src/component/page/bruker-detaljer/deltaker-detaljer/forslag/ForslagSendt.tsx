import { Box, Heading } from '@navikt/ds-react'
import { AktivtForslag } from '../../../../../api/data/forslag'
import { Tiltakskode } from '../../../../../api/data/tiltak'
import { getEndringsTittel } from '../../../../../utils/text-mappers'
import { EndringPanel } from './EndringPanel'
import { FjernEndring } from './FjernEndring'
import { FjernForslag } from './FjernForslag'
import styles from './Forslag.module.scss'
import { ForslagEndringsdetaljer } from './ForslagEndringsdetaljer'
import { ulestEndringErSvarFraNav } from './forslagUtils'
import { AvvistForslagDetaljer, Endringsdetaljer } from './SvarFraNavDetaljer'
import { UlestEndring, UlestEndringType } from '../../../../../api/data/ulestEndring'

interface Props {
  forslag: AktivtForslag[]
  deltakerId: string
  ulesteEndringer: UlestEndring[]
  tiltakstype: Tiltakskode
  onTilbakekalt: (forslagId: string) => void
  onMarkertSomLest: (endringId: string) => void
}

export const ForslagSendt = ({
  deltakerId,
  forslag,
  ulesteEndringer,
  tiltakstype,
  onTilbakekalt,
  onMarkertSomLest
}: Props) => {
  if (forslag.length === 0 && ulesteEndringer.length === 0) {
    return
  }

  const ulesteSvarFraNav = ulesteEndringer.filter(ulestEndringErSvarFraNav)
  const ulesteOppdateringerFraNav = ulesteEndringer.filter((it) => !ulestEndringErSvarFraNav(it))

  return (
    <Box
      background="bg-subtle"
      padding={{ xs: '2', md: '4' }}
      borderRadius="medium"
    >
      {(ulesteSvarFraNav.length > 0 || forslag.length > 0) && (<>
      <Heading level="3" size="small" className={styles.aktiveForslagTitle}>
        Forslag sendt til Nav:
      </Heading>
      {forslag.map((it) => {
        return (
          <EndringPanel
            key={it.id}
            erAktivtForslag
            endringType={it.endring.type}
            forslagStatusType={it.status.type}
            fjernEndringComponent={
              <FjernForslag forslagId={it.id} deltakerId={deltakerId} onTilbakekalt={onTilbakekalt} />
            }
          >
            <ForslagEndringsdetaljer
              endring={it.endring}
              begrunnelse={it.begrunnelse}
              sendt={it.opprettet}
            />
          </EndringPanel>
        )
      })}
      </>)}
      {ulesteSvarFraNav.map((it, i) => (
        <EndringPanel
          key={`${it.id}${i}`}
          erAktivtForslag={false}
          tittel={it.oppdatering.type === UlestEndringType.DeltakelsesEndring ? getEndringsTittel(it.oppdatering.endring.endring) : undefined}
          endringType={getEndringsType(it)}
          forslagStatusType={getForslagStatusType(it)}
          fjernEndringComponent={
            <FjernEndring endringId={it.id} deltakerId={deltakerId} onMarkertSomLest={onMarkertSomLest} />
          }
        >
          {
            it.oppdatering.type === UlestEndringType.DeltakelsesEndring
            && <Endringsdetaljer
                deltakerEndring={it.oppdatering.endring}
                tiltakstype={tiltakstype}
              />
          }
          {it.oppdatering.type === UlestEndringType.AvvistForslag
            && <AvvistForslagDetaljer forslag={it.oppdatering.forslag} />
          }
          {(it.oppdatering.type === UlestEndringType.NavBrukerEndring
            || it.oppdatering.type === UlestEndringType.NavEndring) && (
              <div>TODO Ny komponent</div>
            )
          }
        </EndringPanel>
      )
      )}

      {ulesteOppdateringerFraNav.length > 0 && (<>
        <Heading level="3" size="small" className={styles.aktiveForslagTitle}>
          Oppdatering fra Nav:
        </Heading>
        {ulesteOppdateringerFraNav.map((it, i) => (
          <EndringPanel
            key={`${it.id}${i}`}
            erAktivtForslag={false}
            tittel={it.oppdatering.type === UlestEndringType.DeltakelsesEndring ? getEndringsTittel(it.oppdatering.endring.endring) : undefined}
            endringType={getEndringsType(it)}
            fjernEndringComponent={
              <FjernEndring endringId={it.id} deltakerId={deltakerId} onMarkertSomLest={onMarkertSomLest} />
            }
          >
            {it.oppdatering.type === UlestEndringType.DeltakelsesEndring && (
              <Endringsdetaljer
                deltakerEndring={it.oppdatering.endring}
                tiltakstype={tiltakstype}
              />
            )}
          </EndringPanel>
        ))} </>
      )}
    </Box>
  )
}

const getEndringsType = (ulesteEndringer: UlestEndring) => {
  if (ulesteEndringer.oppdatering.type === UlestEndringType.DeltakelsesEndring) {
    return ulesteEndringer.oppdatering.endring.endring.type
  } else if (ulesteEndringer.oppdatering.type === UlestEndringType.AvvistForslag) {
    return ulesteEndringer.oppdatering.forslag.endring.type
  } else {
    return undefined
  }
}

const getForslagStatusType = (ulesteEndringer: UlestEndring) => {
  if (ulesteEndringer.oppdatering.type === UlestEndringType.DeltakelsesEndring) {
    return ulesteEndringer.oppdatering.endring.forslag?.status.type
  } else if (ulesteEndringer.oppdatering.type === UlestEndringType.AvvistForslag) {
    return ulesteEndringer.oppdatering.forslag.status.type
  } else {
    return undefined
  }
}