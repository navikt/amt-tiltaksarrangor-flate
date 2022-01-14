import { GjennomforingDTO } from '../api/data/tiltak'
import { MockGjennomforing } from './data/tiltak'

export const tilGjennomforingDTO = (gjennomforing: MockGjennomforing): GjennomforingDTO => {
	return {
		id: gjennomforing.id,
		navn: gjennomforing.navn,
		startDato: gjennomforing.startDato,
		sluttDato: gjennomforing.sluttDato,
		status: gjennomforing.status,
		tiltak: {
			tiltakskode: gjennomforing.tiltak.tiltakskode,
			tiltaksnavn: gjennomforing.tiltak.tiltaksnavn
		}
	}
}