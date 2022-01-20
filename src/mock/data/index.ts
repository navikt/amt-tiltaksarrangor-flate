import { TiltakDeltagerDetaljerDTO } from '../../api/data/deltaker'
import { mockInnloggetAnsattVirksomheter } from './ansatt'
import { lagMockTiltakDeltagereForGjennomforing } from './brukere'
import { lagTiltakGjennomforinger, MockGjennomforing } from './tiltak'

export const mockGjennomforinger: MockGjennomforing[] = mockInnloggetAnsattVirksomheter
	.map(virksomhet => lagTiltakGjennomforinger(virksomhet.id))
	.reduce((previousValue, currentValue) => previousValue.concat(currentValue), [])

export const mockTiltakDeltagere: TiltakDeltagerDetaljerDTO[] = mockGjennomforinger
	.map(gjennomforing => lagMockTiltakDeltagereForGjennomforing(gjennomforing))
	.reduce((previousValue, currentValue) => previousValue.concat(currentValue), [])
