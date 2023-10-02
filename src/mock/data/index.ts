import { Koordinator } from '../../api/data/tiltak'
import { lagMockTiltakDeltagereForGjennomforing, MockTiltakDeltaker } from './brukere'
import {
	deltakerlisteErKurs,
	gjennomforingInfoListe,
	lagMockDeltakerlisteVeileder,
	lagMockGjennomforinger,
	lagMockKoordinatorer,
	lagMockMineDeltakerlister,
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
		erKurs: deltakerlisteErKurs(gjennomforing.tiltak.tiltakskode),
		tiltakType: gjennomforing.tiltak.tiltakskode
	}
}
export const mockGjennomforinger: MockGjennomforing[] = lagMockGjennomforinger(gjennomforingInfoListe)

export const lagMockTiltakDeltakere = (antallGjennomforinger: number, antallDeltakere: number): MockTiltakDeltaker[] => {
	const tilfeldigeDeltakere = mockGjennomforinger.slice(0, 7)
		.map(gjennomforing => lagMockTiltakDeltagereForGjennomforing(gjennomforing, antallDeltakere))
		.reduce((previousValue, currentValue) => previousValue.concat(currentValue), [])

	const deltakereJobbklubb = lagMockTiltakDeltagereForGjennomforing(mockGjennomforinger[8], 40)
	const deltakereGruppeAmoNordvest = lagMockTiltakDeltagereForGjennomforing(mockGjennomforinger[9], 10)
	const deltakereGruppeAmoSorvest = lagMockTiltakDeltagereForGjennomforing(mockGjennomforinger[10], 15)
	const deltakereGruppeFagOgYrkeSorvest = lagMockTiltakDeltagereForGjennomforing(mockGjennomforinger[ 11 ], 18)

	return tilfeldigeDeltakere.concat(deltakereJobbklubb, deltakereGruppeAmoNordvest, deltakereGruppeAmoSorvest, deltakereGruppeFagOgYrkeSorvest)
}

const deltakereTilVeileder = () => {
	const g1 = mockTiltakDeltakere[0].gjennomforing.id
	const g2 = mockTiltakDeltakere.find(d => d.gjennomforing.id !== g1)?.gjennomforing.id

	const deltakere1 = mockTiltakDeltakere.filter(d => d.gjennomforing.id === g1).slice(0, 10)
	const deltakere2 = mockTiltakDeltakere.filter(d => d.gjennomforing.id === g2).slice(0, 5)

	return lagMockDeltakerlisteVeileder(deltakere1.concat(deltakere2))
}

export const mockTiltakDeltakere: MockTiltakDeltaker[] = lagMockTiltakDeltakere(11, 100)

export const mockDeltakerlisteVeileder: VeiledersDeltaker[] = deltakereTilVeileder()

export const mockMineDeltakerlister: MineDeltakerlister = lagMockMineDeltakerlister(mockGjennomforinger, mockDeltakerlisteVeileder)

