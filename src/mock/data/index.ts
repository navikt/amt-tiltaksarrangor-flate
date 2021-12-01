import { TiltakDeltagerDetaljerDTO } from '../../api/data/deltager'
import { mockInnloggetAnsattVirksomheter } from './ansatt'
import { lagMockTiltakDeltagereForTiltakInstans } from './brukere'
import { lagTiltakinstanser, MockTiltakInstans } from './tiltak'

export const mockTiltakInstanser: MockTiltakInstans[] = mockInnloggetAnsattVirksomheter
	.map(virksomhet => lagTiltakinstanser(virksomhet.id))
	.reduce((previousValue, currentValue) => previousValue.concat(currentValue), [])

export const mockTiltakDeltagere: TiltakDeltagerDetaljerDTO[] = mockTiltakInstanser
	.map(instans => lagMockTiltakDeltagereForTiltakInstans(instans))
	.reduce((previousValue, currentValue) => previousValue.concat(currentValue), [])
