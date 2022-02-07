import { DeltakerStatus, TiltakDeltakerStatus } from '../domeneobjekter/deltaker'
import { sluttaForOver2UkerSiden } from './deltaker-status-utils'

test('sluttaForOver2UkerSiden - deltaker slutta for over 2 uker siden - returnerer true', () =>{
	const status : DeltakerStatus = {
		type: TiltakDeltakerStatus.HAR_SLUTTET,
		endretDato: new Date('2021-03-22T03:30:32.589Z')
	}

	expect(sluttaForOver2UkerSiden(status)).toBeTruthy()
})

test('sluttaForOver2UkerSiden - deltaker slutta for under 2 uker siden - returnerer false', () =>{
	const status : DeltakerStatus = {
		type: TiltakDeltakerStatus.HAR_SLUTTET,
		endretDato: new Date()
	}

	expect(sluttaForOver2UkerSiden(status)).toBeFalsy()
})

test('sluttaForOver2UkerSiden - deltaker har ikke slutta - returnerer false', () =>{
	const status : DeltakerStatus = {
		type: TiltakDeltakerStatus.DELTAR,
		endretDato: new Date('2021-03-22T03:30:32.589Z')
	}

	expect(sluttaForOver2UkerSiden(status)).toBeFalsy()
})