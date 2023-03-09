import { Koordinator } from '../../api/data/tiltak'
import { lagMockTiltakDeltagereForGjennomforing, MockTiltakDeltaker } from './brukere'
import {
	gjennomforingInfoListe, lagMockDeltakerlisteVeileder, lagMockDeltakerOversikt,
	lagMockGjennomforinger, lagMockKoordinatorer,
	MockGjennomforing,
	tilgjengeligGjennomforinger
} from './tiltak'
import { DeltakerOversikt, VeiledersDeltaker } from '../../api/data/deltaker'

export const mockGjennomforinger: MockGjennomforing[] = lagMockGjennomforinger(gjennomforingInfoListe)

export const mockTilgjengeligGjennomforinger: MockGjennomforing[] = lagMockGjennomforinger(tilgjengeligGjennomforinger)

export const mockKoordinatorer: Koordinator[] = lagMockKoordinatorer()

export const mockTiltakDeltakere: MockTiltakDeltaker[] = mockGjennomforinger
	.map(gjennomforing => lagMockTiltakDeltagereForGjennomforing(gjennomforing, 100))
	.reduce((previousValue, currentValue) => previousValue.concat(currentValue), [])

export const mockDeltakeroversikt: DeltakerOversikt = lagMockDeltakerOversikt(mockGjennomforinger)

export const mockDeltakerlisteVeileder: VeiledersDeltaker[] = lagMockDeltakerlisteVeileder(mockTiltakDeltakere.slice(0, 15))
