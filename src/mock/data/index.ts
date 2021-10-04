import { mockInnloggetAnsattVirksomheter } from './ansatt'
import { lagMockTiltakDeltagereForTiltakInstans, MockTiltakDeltager } from './brukere'
import { lagTiltakinstanser, MockTiltakInstans } from './tiltak'

export const mockTiltakInstanser: MockTiltakInstans[] = mockInnloggetAnsattVirksomheter
	.map(virksomhet => lagTiltakinstanser(virksomhet.id))
	.reduce((previousValue, currentValue) => previousValue.concat(currentValue), [])

export const mockTiltakDeltagere: MockTiltakDeltager[] = mockTiltakInstanser
	.map(instans => lagMockTiltakDeltagereForTiltakInstans(instans))
	.reduce((previousValue, currentValue) => previousValue.concat(currentValue), [])
