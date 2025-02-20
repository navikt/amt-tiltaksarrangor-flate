import { Box, Heading } from '@navikt/ds-react'
import { UlestEndring, UlestEndringType } from '../../../../../api/data/deltaker'
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
  const ulesteSvarFraNav = ulesteEndringer.filter(ulestEndringErSvarFraNav)
  if (forslag.length === 0 && ulesteSvarFraNav.length === 0) {
    return
  }

  return (
    <Box
      background="bg-subtle"
      padding={{ xs: '2', md: '4' }}
      borderRadius="medium"
    >
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
      {ulesteSvarFraNav.filter(ulestEndringErSvarFraNav).map((it, i) => {
        return (
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
                ? <Endringsdetaljer
                  deltakerEndring={it.oppdatering.endring}
                  tiltakstype={tiltakstype}
                />
                : <AvvistForslagDetaljer forslag={it.oppdatering.forslag} />
            }
          </EndringPanel>
        )
      })}
    </Box>
  )
}

const getEndringsType = (ulesteEndringer: UlestEndring) => {
  if (ulesteEndringer.oppdatering.type === UlestEndringType.DeltakelsesEndring) {
    return ulesteEndringer.oppdatering.endring.endring.type
  } else {
    return ulesteEndringer.oppdatering.forslag.endring.type
  }
}

const getForslagStatusType = (ulesteEndringer: UlestEndring) => {
  if (ulesteEndringer.oppdatering.type === UlestEndringType.DeltakelsesEndring) {
    return ulesteEndringer.oppdatering.endring.forslag?.status.type
  } else {
    return ulesteEndringer.oppdatering.forslag.status.type
  }
}