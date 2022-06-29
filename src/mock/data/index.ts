import { Gjennomforing } from '../../api/data/tiltak'
import { lagMockTiltakDeltagereForGjennomforing, MockTiltakDeltaker } from './brukere'
import { lagMockEndringsmelding } from './endringsmelding'
import { lagMockGjennomforinger } from './tiltak'

export const mockGjennomforinger: Gjennomforing[] = lagMockGjennomforinger()

export const mockTiltakDeltagere: MockTiltakDeltaker[] = mockGjennomforinger
	.map(gjennomforing => lagMockTiltakDeltagereForGjennomforing(gjennomforing, 100))
	.reduce((previousValue, currentValue) => previousValue.concat(currentValue), [])

export const mockEndringsmeldinger = lagMockEndringsmelding(mockTiltakDeltagere)
