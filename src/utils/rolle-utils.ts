import { Rolle } from '../api/data/ansatt'

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
