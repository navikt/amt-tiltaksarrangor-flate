import { Gjennomforing } from '../../../api/data/tiltak'
import { ArrangorOverenhet } from './deltakerliste.viewobjects'

export const deltakerlisteMapper = (gjennomforinger: Gjennomforing[]): ArrangorOverenhet[] => {
	const data: ArrangorOverenhet[] = []

	gjennomforinger.forEach((gjennomforing) => {
		const overordnetEnhetNavn = gjennomforing.arrangor.organisasjonNavn != null
			? gjennomforing.arrangor.organisasjonNavn
			: gjennomforing.arrangor.virksomhetNavn

		if (!data.some((i) => i.navn === overordnetEnhetNavn)) {
			data.push({ navn: overordnetEnhetNavn, arrangorer: [] })
		}

		const overornetEnhet = data.find((i) => i.navn === overordnetEnhetNavn)

		if (overornetEnhet !== undefined) {
			if (!overornetEnhet.arrangorer.some((i) => i.navn === gjennomforing.arrangor.virksomhetNavn)) {
				overornetEnhet.arrangorer.push({
					id: gjennomforing.arrangor.virksomhetOrgnr,
					navn: gjennomforing.arrangor.virksomhetNavn,
					deltakerlister: []
				})
			}

			const enhet = overornetEnhet.arrangorer.find((i) => i.navn === gjennomforing.arrangor.virksomhetNavn)

			enhet?.deltakerlister.push({
				id: gjennomforing.id,
				navn: gjennomforing.navn,
				tiltaksnavn: gjennomforing.tiltak.tiltaksnavn,
				startDato: gjennomforing.startDato,
				sluttDato: gjennomforing.sluttDato,
			})
		}


	})

	return data
}
