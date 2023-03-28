import * as faker from 'faker'

import { TiltakDeltakerStatus } from '../../api/data/deltaker'
import { DeltakerStatusAarsakType, Endringsmelding, EndringsmeldingType } from '../../api/data/endringsmelding'
import { randBetween } from '../utils/faker'
import { endringsmeldingId } from './id'

export const lagMockEndringsmeldingForDeltaker = (deltakerStatus: TiltakDeltakerStatus): Endringsmelding[] => {
	const n = randBetween(0, 10)

	if ((n >= 1 && n <= 2) && deltakerStatus == TiltakDeltakerStatus.VENTER_PA_OPPSTART) {
		return [
			{
				id: endringsmeldingId(),
				type: EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO,
				innhold: { oppstartsdato: faker.date.soon() }
			}
		]
	}

	if (n == 3 && deltakerStatus == TiltakDeltakerStatus.DELTAR) {
		return [
			{
				id: endringsmeldingId(),
				type: EndringsmeldingType.ENDRE_OPPSTARTSDATO,
				innhold: { oppstartsdato: faker.date.soon() }
			}
		]
	}

	if (n == 4 && deltakerStatus == TiltakDeltakerStatus.DELTAR) {
		return [
			{
				id: endringsmeldingId(),
				type: EndringsmeldingType.AVSLUTT_DELTAKELSE,
				innhold: { sluttdato: faker.date.soon(), aarsak: { type: DeltakerStatusAarsakType.SYK, beskrivelse: null } }
			}
		]
	}

	if (n == 5 && deltakerStatus == TiltakDeltakerStatus.DELTAR) {
		return [
			{
				id: endringsmeldingId(),
				type: EndringsmeldingType.AVSLUTT_DELTAKELSE,
				innhold: {
					sluttdato: faker.date.soon(), aarsak: {
						type: DeltakerStatusAarsakType.ANNET,
						beskrivelse: 'Har flyttet til annen kommune'
					}
				}
			}
		]
	}

	return []
}
