import { lagMockTiltakDeltagereForGjennomforing, MockTiltakDeltaker } from './brukere'
import { lagMockEndringsmelding } from './endringsmelding'
import {
	gjennomforingInfoListe,
	lagMockGjennomforinger,
	MockGjennomforing,
	tilgjengeligGjennomforinger
} from './tiltak'

export const mockGjennomforinger: MockGjennomforing[] = lagMockGjennomforinger(gjennomforingInfoListe)

export const mockTilgjengeligGjennomforinger: MockGjennomforing[] = lagMockGjennomforinger(tilgjengeligGjennomforinger)

export const mockTiltakDeltagere: MockTiltakDeltaker[] = mockGjennomforinger
	.map(gjennomforing => lagMockTiltakDeltagereForGjennomforing(gjennomforing, 100))
	.reduce((previousValue, currentValue) => previousValue.concat(currentValue), [])

export const mockEndringsmeldinger = lagMockEndringsmelding(mockTiltakDeltagere)
