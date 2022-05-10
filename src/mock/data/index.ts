import { TiltakDeltakerDetaljer } from '../../api/data/deltaker'
import { Gjennomforing } from '../../api/data/tiltak'
import { lagMockTiltakDeltagereForGjennomforing } from './brukere'
import { lagMockEndringsmelding } from './endringsmelding'
import { lagTiltakGjennomforinger } from './tiltak'

export const mockGjennomforinger: Gjennomforing[] = lagTiltakGjennomforinger()

export const mockTiltakDeltagere: TiltakDeltakerDetaljer[] = mockGjennomforinger
	.map(gjennomforing => lagMockTiltakDeltagereForGjennomforing(gjennomforing))
	.reduce((previousValue, currentValue) => previousValue.concat(currentValue), [])

export const mockEndringsmeldinger = lagMockEndringsmelding(mockTiltakDeltagere)
