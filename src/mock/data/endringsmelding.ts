import * as faker from 'faker'

import { Endringsmelding } from '../../api/data/tiltak'
import { randBetween, randomUuid } from '../utils/faker'

type MockEndringsmeldinger = { [id: string]: Endringsmelding[] }

export const lagMockEndringsmelding = (deltakere: { id: string }[]): MockEndringsmeldinger => {
	const meldinger: MockEndringsmeldinger = {}

	deltakere.forEach(d => {
		meldinger[d.id] = lagMockEndringsmeldingForDeltaker()
	})

	return meldinger
}

export const lagMockEndringsmeldingForDeltaker = (): Endringsmelding[] => {
	if (randBetween(0, 10) > 5) {
		return []
	}

	return [
		{
			id: randomUuid(),
			startDato: faker.date.soon(),
			aktiv: faker.datatype.boolean()
		}
	]
}