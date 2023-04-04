import { VeiledersDeltaker } from '../api/data/deltaker'

const matcherDeltakerliste = (deltakerlisteFilter: string[], deltakerliste: string) => {
	if (deltakerlisteFilter.length === 0) return true
	return deltakerlisteFilter.includes(deltakerliste)
}

export const filtrerDeltakerliste = (brukere: VeiledersDeltaker[], deltakerlisteFilter: string[]): VeiledersDeltaker[] => {
	return brukere.filter(bruker => matcherDeltakerliste(deltakerlisteFilter, bruker.deltakerliste.navn))
}
