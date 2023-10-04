import * as faker from 'faker'

import { TiltakDeltakerStatus } from '../../api/data/deltaker'
import { DeltakerStatusAarsakType, Endringsmelding, EndringsmeldingStatus, EndringsmeldingType } from '../../api/data/endringsmelding'
import { randBetween } from '../utils/faker'
import { endringsmeldingId } from './id'

export const lagMockEndringsmeldingForDeltaker = (deltakerStatus: typeof TiltakDeltakerStatus): Endringsmelding[] => {
	const n = randBetween(0, 10)

	if ( ( n >= 1 && n <= 2 ) && typeof deltakerStatus === typeof TiltakDeltakerStatus.VENTER_PA_OPPSTART) {
		return [
			{
				id: endringsmeldingId(),
				type: EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO,
				innhold: { oppstartsdato: faker.date.soon() },
				sendt: faker.date.recent(),
				status: EndringsmeldingStatus.AKTIV
			}
		]
	}

	if ( n == 3 && typeof deltakerStatus === typeof TiltakDeltakerStatus.DELTAR) {
		return [
			{
				id: endringsmeldingId(),
				type: EndringsmeldingType.ENDRE_OPPSTARTSDATO,
				innhold: { oppstartsdato: faker.date.soon() },
				sendt: faker.date.recent(),
				status: EndringsmeldingStatus.AKTIV
			}
		]
	}

	if ( n == 4 && typeof deltakerStatus === typeof TiltakDeltakerStatus.DELTAR) {
		return [
			{
				id: endringsmeldingId(),
				type: EndringsmeldingType.AVSLUTT_DELTAKELSE,
				innhold: { sluttdato: faker.date.soon(), aarsak: { type: DeltakerStatusAarsakType.SYK, beskrivelse: null } },
				sendt: faker.date.recent(),
				status: EndringsmeldingStatus.AKTIV
			}
		]
	}

	if ( n == 5 && typeof deltakerStatus === typeof TiltakDeltakerStatus.DELTAR) {
		return [
			{
				id: endringsmeldingId(),
				type: EndringsmeldingType.AVSLUTT_DELTAKELSE,
				innhold: {
					sluttdato: faker.date.soon(), aarsak: {
						type: DeltakerStatusAarsakType.ANNET,
						beskrivelse: 'Har flyttet til annen kommune'
					}
				},
				sendt: faker.date.recent(),
				status: EndringsmeldingStatus.AKTIV
			}
		]
	}

	if ( n < 3 && typeof deltakerStatus === typeof TiltakDeltakerStatus.HAR_SLUTTET) {
		return [
			{
				id: endringsmeldingId(),
				type: EndringsmeldingType.ENDRE_SLUTTAARSAK,
				innhold: {
					aarsak: {
						type: DeltakerStatusAarsakType.FATT_JOBB,
						beskrivelse: null,
					}
				},
				sendt: faker.date.recent(),
				status: EndringsmeldingStatus.AKTIV
			}
		]
	}

	return []
}

export const lagMockHistoriskeEndringsmeldingForDeltaker = ( deltakerStatus: typeof TiltakDeltakerStatus, startDato: Date | null, sluttDato: Date | null ): Endringsmelding[] => {
	const n = randBetween( 0, 10 )

	if ( n < 3 && typeof deltakerStatus === typeof TiltakDeltakerStatus.VENTER_PA_OPPSTART ) {
		return [
			{
				id: endringsmeldingId(),
				type: EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO,
				innhold: { oppstartsdato: faker.date.soon() },
				sendt: faker.date.past(),
				status: EndringsmeldingStatus.UTFORT
			}
		]
	}

	if ( n >= 3 && n < 5 && typeof deltakerStatus === typeof TiltakDeltakerStatus.DELTAR ) {
		const oppstartsdato = faker.date.soon()
		return [
			{
				id: endringsmeldingId(),
				type: EndringsmeldingType.ENDRE_OPPSTARTSDATO,
				innhold: { oppstartsdato },
				sendt: faker.date.between( startDato || faker.date.recent(), oppstartsdato ),
				status: EndringsmeldingStatus.UTFORT
			},
			{
				id: endringsmeldingId(),
				type: EndringsmeldingType.FORLENG_DELTAKELSE,
				innhold: { sluttdato: faker.date.future() },
				sendt: faker.date.past(),
				status: EndringsmeldingStatus.UTFORT
			}
		]
	}

	if ( n >= 5 && n < 7 && typeof deltakerStatus === typeof TiltakDeltakerStatus.HAR_SLUTTET ) {
		const pastDate = faker.date.past()
		const day2 = new Date()
		day2.setDate( pastDate.getDate() - 3 )
		const day3 = new Date()
		day2.setDate( pastDate.getDate() - 6 )
		return [
			// TODO legg til endre sluttårsak
			{
				id: endringsmeldingId(),
				type: EndringsmeldingType.ENDRE_SLUTTDATO,
				innhold: { sluttdato: faker.date.future() },
				sendt: pastDate,
				status: EndringsmeldingStatus.UTFORT
			},
			{
				id: endringsmeldingId(),
				type: EndringsmeldingType.AVSLUTT_DELTAKELSE,
				innhold: {
					sluttdato: faker.date.soon(), aarsak: {
						type: DeltakerStatusAarsakType.FATT_JOBB,
						beskrivelse: null
					}
				},
				sendt: day2,
				status: EndringsmeldingStatus.UTFORT
			},
			{
				id: endringsmeldingId(),
				type: EndringsmeldingType.FORLENG_DELTAKELSE,
				innhold: { sluttdato: faker.date.future() },
				sendt: day3,
				status: EndringsmeldingStatus.UTFORT
			}
		]
	}

	if ( n < 4 && typeof deltakerStatus === typeof TiltakDeltakerStatus.IKKE_AKTUELL ) {
		return [
			{
				id: endringsmeldingId(),
				type: EndringsmeldingType.AVSLUTT_DELTAKELSE,
				innhold: {
					sluttdato: faker.date.recent(), aarsak: {
						type: DeltakerStatusAarsakType.ANNET,
						beskrivelse: 'Har flyttet til annen kommune'
					}
				},
				sendt: faker.date.between( startDato || faker.date.past(), new Date() ),
				status: EndringsmeldingStatus.UTFORT
			}
		]
	}

	if ( n < 3 && typeof deltakerStatus === typeof TiltakDeltakerStatus.AVBRUTT ) {
		return [
			{
				id: endringsmeldingId(),
				type: EndringsmeldingType.AVSLUTT_DELTAKELSE,
				innhold: {
					sluttdato: faker.date.recent(), aarsak: {
						type: DeltakerStatusAarsakType.FATT_JOBB,
						beskrivelse: null
					}
				}, sendt: faker.date.past(),
				status: EndringsmeldingStatus.UTFORT
			}
		]
	}
	if ( n > 7 && typeof deltakerStatus === typeof TiltakDeltakerStatus.FULLFORT ) {
		return [
			{
				id: endringsmeldingId(),
				type: EndringsmeldingType.ENDRE_SLUTTDATO,
				innhold: { sluttdato: sluttDato || faker.date.soon() },
				sendt: faker.date.past(),
				status: EndringsmeldingStatus.UTFORT
			}
		]
	}
	return []
}