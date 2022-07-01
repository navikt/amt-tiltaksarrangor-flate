import { TiltakDeltakerDetaljer } from '../../api/data/deltaker'
import { Gjennomforing } from '../../api/data/tiltak'
import { lagMockTiltakDeltagereForGjennomforing } from './brukere'
import { lagMockEndringsmelding } from './endringsmelding'
import { gjennomforingInfoListe, lagTiltakGjennomforinger, tilgjengeligGjennomforinger } from './tiltak'

export const mockGjennomforinger: Gjennomforing[] = lagTiltakGjennomforinger(gjennomforingInfoListe)

export const mockTilgjengeligGjennomforinger: Gjennomforing[] = lagTiltakGjennomforinger(tilgjengeligGjennomforinger)

export const mockTiltakDeltagere: TiltakDeltakerDetaljer[] = mockGjennomforinger
	.map(gjennomforing => lagMockTiltakDeltagereForGjennomforing(gjennomforing, 100))
	.reduce((previousValue, currentValue) => previousValue.concat(currentValue), [])

export const mockEndringsmeldinger = lagMockEndringsmelding(mockTiltakDeltagere)
