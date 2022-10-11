import * as faker from 'faker'

import { Endringsmelding } from '../../api/data/tiltak'
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
				startDato: null,
				sluttDato: faker.date.soon(),
				aktiv: faker.datatype.boolean()
			}
		]
	}
	return [
		{
			id: endringsmeldingId(),
			startDato: faker.date.soon(),
			sluttDato: null,
			aktiv: faker.datatype.boolean()
		}
	]
}
