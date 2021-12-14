import { TiltakInstansDTO } from '../api/data/tiltak'
import { MockTiltakInstans } from './data/tiltak'

export const tilTiltakInstansDto = (instans: MockTiltakInstans): TiltakInstansDTO => {
	return {
		id: instans.id,
		navn: instans.navn,
		oppstartdato: instans.oppstartdato,
		sluttdato: instans.sluttdato,
		status: instans.status,
		tiltak: {
			tiltakskode: instans.tiltak.tiltakskode,
			tiltaksnavn: instans.tiltak.tiltaksnavn
		}
	}
}