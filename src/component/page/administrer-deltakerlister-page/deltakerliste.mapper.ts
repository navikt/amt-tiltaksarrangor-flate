import { AdminDeltakerliste } from '../../../api/data/tiltak'
import { ArrangorOverenhet } from './deltakerliste.viewobjects'

export const deltakerlisteMapper = (adminDeltakerlister: AdminDeltakerliste[]): ArrangorOverenhet[] => {
	const data: ArrangorOverenhet[] = []

	adminDeltakerlister.forEach((deltakerliste) => {
		if (!data.some((i) => i.navn === deltakerliste.arrangorParentNavn)) {
			data.push({ navn: deltakerliste.arrangorParentNavn, arrangorer: [] })
		}

		const overornetEnhet = data.find((i) => i.navn === deltakerliste.arrangorParentNavn)

		if (overornetEnhet !== undefined) {
			if (!overornetEnhet.arrangorer.some((i) => i.navn === deltakerliste.arrangorNavn)) {
				overornetEnhet.arrangorer.push({
					id: deltakerliste.arrangorOrgnummer,
					navn: deltakerliste.arrangorNavn,
					deltakerlister: []
				})
			}

			const enhet = overornetEnhet.arrangorer.find((i) => i.navn === deltakerliste.arrangorNavn)

			enhet?.deltakerlister.push({
				id: deltakerliste.id,
				navn: deltakerliste.navn,
				tiltaksnavn: deltakerliste.tiltaksnavn,
				startDato: deltakerliste.startDato,
				sluttDato: deltakerliste.sluttDato,
			})
		}


	})

	return data
}
