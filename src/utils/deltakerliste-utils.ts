import {
  Deltakerliste,
  KoordinatorForDeltakerliste
} from '../api/data/deltaker'
import { Oppstartstype } from '../api/data/historikk'
import { Tiltakskode } from '../api/data/tiltak'
import { Veiledertype } from '../api/data/veileder'

export const finnUnikeTiltakskoder = (
  detakerlister: Deltakerliste[]
): string[] => {
  const unikeTiltakskode: string[] = []

  detakerlister.forEach((deltakerliste) => {
    const type1 = unikeTiltakskode.find((t) => t === deltakerliste.type)

    if (!type1) {
      unikeTiltakskode.push(deltakerliste.type)
    }
  })

  return unikeTiltakskode
}

export const finnDeltakerlister = (
  type: string,
  deltakerlister: KoordinatorForDeltakerliste[]
): KoordinatorForDeltakerliste[] => {
  return deltakerlister.filter((deltakerliste) => deltakerliste.type === type)
}

export const tilVeiledertype = (erMedveileder: boolean) =>
  erMedveileder ? Veiledertype.MEDVEILEDER : Veiledertype.VEILEDER

export const harFellesOppstart = (oppstartstype: Oppstartstype) =>
  oppstartstype === Oppstartstype.FELLES

export const harLopendeOppstart = (oppstartstype: Oppstartstype) =>
  oppstartstype === Oppstartstype.LOPENDE

export const erOpplaringstiltak = (tiltakskode: Tiltakskode) =>
  [
    Tiltakskode.GRUPPE_ARBEIDSMARKEDSOPPLAERING,
    Tiltakskode.GRUPPE_FAG_OG_YRKESOPPLAERING,
    Tiltakskode.ARBEIDSMARKEDSOPPLAERING,
    Tiltakskode.NORSKOPPLAERING_GRUNNLEGGENDE_FERDIGHETER_FOV,
    Tiltakskode.STUDIESPESIALISERING,
    Tiltakskode.FAG_OG_YRKESOPPLAERING,
    Tiltakskode.HOYERE_YRKESFAGLIG_UTDANNING,
    Tiltakskode.HOYERE_UTDANNING,
    Tiltakskode.ENKELTPLASS_ARBEIDSMARKEDSOPPLAERING,
    Tiltakskode.ENKELTPLASS_FAG_OG_YRKESOPPLAERING
  ].includes(tiltakskode)

/**
 * Sier om tiltaket bruker avsluttende status: Fullført / Avbrutt.
 */
export const harKursAvslutning = (
  oppstartstype: Oppstartstype,
  tiltakskode: Tiltakskode
) => {
  return harFellesOppstart(oppstartstype) || erOpplaringstiltak(tiltakskode)
}
