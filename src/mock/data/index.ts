import { Koordinator } from '../../api/data/tiltak'
import { lagMockTiltakDeltagereForGjennomforing, MockTiltakDeltaker } from './brukere'
import {
	gjennomforingInfoListe,
	lagMockGjennomforinger, lagMockKoordinatorer,
	MockGjennomforing,
	tilgjengeligGjennomforinger
} from './tiltak'

export const mockGjennomforinger: MockGjennomforing[] = lagMockGjennomforinger(gjennomforingInfoListe)

export const mockTilgjengeligGjennomforinger: MockGjennomforing[] = lagMockGjennomforinger(tilgjengeligGjennomforinger)

export const mockKoordinatorer: Koordinator[] = lagMockKoordinatorer()

export const mockTiltakDeltakere: MockTiltakDeltaker[] = mockGjennomforinger
	.map(gjennomforing => lagMockTiltakDeltagereForGjennomforing(gjennomforing, 100))
	.reduce((previousValue, currentValue) => previousValue.concat(currentValue), [])
