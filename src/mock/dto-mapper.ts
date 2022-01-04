import { GjennomforingDTO } from '../api/data/tiltak'
import { MockGjennomforing } from './data/tiltak'

export const tilGjennomforingDTO = (gjennomforing: MockGjennomforing): GjennomforingDTO => {
	return {
		id: gjennomforing.id,
		navn: gjennomforing.navn,
		oppstartdato: gjennomforing.oppstartdato,
		sluttdato: gjennomforing.sluttdato,
		status: gjennomforing.status,
		tiltak: {
			tiltakskode: gjennomforing.tiltak.tiltakskode,
			tiltaksnavn: gjennomforing.tiltak.tiltaksnavn
		}
	}
}