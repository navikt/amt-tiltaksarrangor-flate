import {
  Deltakerliste,
  KoordinatorForDeltakerliste
} from '../api/data/deltaker'
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
