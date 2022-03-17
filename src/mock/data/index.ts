import { TiltakDeltagerDetaljerDTO } from '../../api/data/deltaker'
import { GjennomforingDTO } from '../../api/data/tiltak'
import { lagMockTiltakDeltagereForGjennomforing } from './brukere'
import { lagTiltakGjennomforinger } from './tiltak'

export const mockGjennomforinger: GjennomforingDTO[] = lagTiltakGjennomforinger()

export const mockTiltakDeltagere: TiltakDeltagerDetaljerDTO[] = mockGjennomforinger
	.map(gjennomforing => lagMockTiltakDeltagereForGjennomforing(gjennomforing))
	.reduce((previousValue, currentValue) => previousValue.concat(currentValue), [])
