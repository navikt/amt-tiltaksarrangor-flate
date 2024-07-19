import { Rolle } from '../api/data/ansatt'
import { MineDeltakerlister } from '../api/data/deltaker'

export const isOnlyVeileder = (roller: Rolle[]): boolean => {
  return isVeileder(roller) && !isKoordinator(roller)
}

export const isOnlyKoordinator = (roller: Rolle[]): boolean => {
  return isKoordinator(roller) && !isVeileder(roller)
}

export const isKoordinatorAndVeileder = (roller: Rolle[]): boolean => {
  return isKoordinator(roller) && isVeileder(roller)
}

export const isVeileder = (roller: Rolle[]): boolean => {
  return roller.includes(Rolle.VEILEDER)
}

export const isKoordinator = (roller: Rolle[]): boolean => {
  return roller.includes(Rolle.KOORDINATOR)
}

export const isKoordinatorForDeltakerliste = (
  deltakerliste: string,
  koordinatorsDeltakerlister: MineDeltakerlister | undefined
): boolean => {
  if (
    !koordinatorsDeltakerlister ||
    !koordinatorsDeltakerlister.koordinatorFor
  ) {
    return false
  }
  return (
    koordinatorsDeltakerlister.koordinatorFor.deltakerlister.find(
      (l) => l.id === deltakerliste
    ) != undefined
  )
}
