import { Koordinator, Tiltakskode } from '../../api/data/tiltak'
import { lagMockTiltakDeltagereForGjennomforing, MockTiltakDeltaker } from './brukere'
import {
	gjennomforingInfoListe, lagMockDeltakerlisteVeileder, lagMockMineDeltakerlister,
	lagMockGjennomforinger, lagMockKoordinatorer,
	MockGjennomforing
} from './tiltak'
import { KoordinatorsDeltakerliste, MineDeltakerlister, VeiledersDeltaker } from '../../api/data/deltaker'
import { mapToDeltakerListView } from '../handlers/mock-handlers'


export const mockKoordinatorer: Koordinator[] = lagMockKoordinatorer()

export const mockKoordinatorsDeltakerliste = (gjennomforing: MockGjennomforing): KoordinatorsDeltakerliste => {
	return {
		id: gjennomforing.id,
		navn: gjennomforing.navn,
		tiltaksnavn: gjennomforing.tiltak.tiltaksnavn,
		arrangorNavn: gjennomforing.arrangor.organisasjonNavn ?? gjennomforing.arrangor.virksomhetNavn,
		startDato: gjennomforing.startDato,
		sluttDato: gjennomforing.sluttDato,
		status: gjennomforing.status,
		koordinatorer: mockKoordinatorer,
		deltakere: mockTiltakDeltakere
			.filter(deltaker => deltaker.gjennomforing.id === gjennomforing.id)
			.map(deltaker => mapToDeltakerListView(deltaker)),
		erKurs: [ Tiltakskode.GRUFAGYRKE, Tiltakskode.JOBBK, Tiltakskode.GRUPPEAMO ].includes(gjennomforing.tiltak.tiltakskode)
	}
}
export const mockGjennomforinger: MockGjennomforing[] = lagMockGjennomforinger(gjennomforingInfoListe)

export const lagMockTiltakDeltakere = (antallDeltakere: number): MockTiltakDeltaker[] => {
	return mockGjennomforinger
		.map(gjennomforing => lagMockTiltakDeltagereForGjennomforing(gjennomforing, antallDeltakere))
		.reduce((previousValue, currentValue) => previousValue.concat(currentValue), [])
}

const deltakereTilVeileder = () => {
	const deltakere1 = lagMockTiltakDeltagereForGjennomforing(mockGjennomforinger[0], 10)
	const deltakere2 = lagMockTiltakDeltagereForGjennomforing(mockGjennomforinger[1], 5)

	return lagMockDeltakerlisteVeileder(deltakere1.concat(deltakere2))
}

export const mockTiltakDeltakere: MockTiltakDeltaker[] = lagMockTiltakDeltakere(50)

export const mockDeltakerlisteVeileder: VeiledersDeltaker[] = deltakereTilVeileder()

export const mockMineDeltakerlister: MineDeltakerlister = lagMockMineDeltakerlister(mockGjennomforinger, mockDeltakerlisteVeileder)

