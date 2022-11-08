import * as faker from 'faker'

import { DeltakerStatusAarsak, Endringsmelding, EndringsmeldingType } from '../../api/data/endringsmelding'
import { randBetween } from '../utils/faker'
import { endringsmeldingId } from './id'

type MockEndringsmeldinger = { [id: string]: Endringsmelding[] }

export const lagMockEndringsmelding = (deltakere: { id: string }[]): MockEndringsmeldinger => {
	const meldinger: MockEndringsmeldinger = {}

	deltakere.forEach(d => {
		meldinger[d.id] = lagMockEndringsmeldingForDeltaker()
	})

	return meldinger
}

export const lagMockEndringsmeldingForDeltaker = (): Endringsmelding[] => {
	const n = randBetween(0, 10)
	if (n < 2) {
		return []
	}
	if (n < 5) {
		return [
			{
				id: endringsmeldingId(),
				type: EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO,
				innhold: { oppstartsdato: faker.date.soon() }
			}
		]
	}
	return [
		{
			id: endringsmeldingId(),
			type: EndringsmeldingType.AVSLUTT_DELTAKELSE,
			innhold: { sluttdato: faker.date.soon(), aarsak: DeltakerStatusAarsak.ANNET }
		}
	]
}
