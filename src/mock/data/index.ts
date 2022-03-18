import { TiltakDeltakerDetaljerDto } from '../../api/data/deltaker'
import { GjennomforingDto } from '../../api/data/tiltak'
import { lagMockTiltakDeltagereForGjennomforing } from './brukere'
import { lagTiltakGjennomforinger } from './tiltak'

export const mockGjennomforinger: GjennomforingDto[] = lagTiltakGjennomforinger()

export const mockTiltakDeltagere: TiltakDeltakerDetaljerDto[] = mockGjennomforinger
	.map(gjennomforing => lagMockTiltakDeltagereForGjennomforing(gjennomforing))
	.reduce((previousValue, currentValue) => previousValue.concat(currentValue), [])
