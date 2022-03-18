import dayjs from 'dayjs'

import { DeltakerStatusDto, TiltakDeltakerStatus } from '../api/data/deltaker'
import { sluttaForOver2UkerSiden } from './deltaker-status-utils'

test('sluttaForOver2UkerSiden - deltaker slutta for over 2 uker siden - returnerer true', () =>{
	const status : DeltakerStatusDto = {
		type: TiltakDeltakerStatus.HAR_SLUTTET,
		endretDato: dayjs('2021-03-22T03:30:32.589Z').toDate()
	}

	expect(sluttaForOver2UkerSiden(status)).toBeTruthy()
})

test('sluttaForOver2UkerSiden - deltaker slutta for under 2 uker siden - returnerer false', () =>{
	const status : DeltakerStatusDto = {
		type: TiltakDeltakerStatus.HAR_SLUTTET,
		endretDato: dayjs().toDate()
	}

	expect(sluttaForOver2UkerSiden(status)).toBeFalsy()
})

test('sluttaForOver2UkerSiden - deltaker har ikke slutta - returnerer false', () =>{
	const status : DeltakerStatusDto = {
		type: TiltakDeltakerStatus.DELTAR,
		endretDato: dayjs('2021-03-22T03:30:32.589Z').toDate()
	}

	expect(sluttaForOver2UkerSiden(status)).toBeFalsy()
})