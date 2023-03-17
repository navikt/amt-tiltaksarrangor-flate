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

const deltakereTilVeileder = () => {
	const g1 = mockTiltakDeltakere[0].gjennomforing.id
	const g2 = mockTiltakDeltakere.find(d => d.gjennomforing.id !== g1)?.gjennomforing.id

	const deltakere1 = mockTiltakDeltakere.filter(d => d.gjennomforing.id === g1).slice(0, 10)
	const deltakere2 = mockTiltakDeltakere.filter(d => d.gjennomforing.id === g2).slice(0, 5)

	return lagMockDeltakerlisteVeileder(deltakere1.concat(deltakere2))
}

export const mockTiltakDeltakere: MockTiltakDeltaker[] = lagMockTiltakDeltakere(9, 100)

export const mockDeltakerlisteVeileder: VeiledersDeltaker[] = deltakereTilVeileder()

export const mockDeltakeroversikt: DeltakerOversikt = lagMockDeltakerOversikt(mockGjennomforinger, mockDeltakerlisteVeileder)

