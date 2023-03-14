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

export const lagMockTiltakDeltakere = (antallGjennomforinger: number, antallDeltakere: number): MockTiltakDeltaker[] => {
	return mockGjennomforinger.slice(0, antallGjennomforinger)
		.map(gjennomforing => lagMockTiltakDeltagereForGjennomforing(gjennomforing, antallDeltakere))
		.reduce((previousValue, currentValue) => previousValue.concat(currentValue), [])
}

export const mockTiltakDeltakere: MockTiltakDeltaker[] = lagMockTiltakDeltakere(9, 100)

export const mockDeltakerlisteVeileder: VeiledersDeltaker[] = lagMockDeltakerlisteVeileder(lagMockTiltakDeltakere(2, 10))

export const mockDeltakeroversikt: DeltakerOversikt = lagMockDeltakerOversikt(mockGjennomforinger, mockDeltakerlisteVeileder)
