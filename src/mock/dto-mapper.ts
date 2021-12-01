import { TiltakDeltagerDetaljerDTO, TiltakDeltagerDTO } from '../api/data/deltager'
import { TiltakInstansDTO } from '../api/data/tiltak'
import { MockTiltakInstans } from './data/tiltak'

export const tilTiltakInstansDto = (instans: MockTiltakInstans): TiltakInstansDTO => {
	return {
		id: instans.id,
		navn: instans.navn,
		deltagerAntall: instans.deltagerAntall,
		deltagerKapasitet: instans.deltagerKapasitet,
		oppstartdato: instans.oppstartdato,
		sluttdato: instans.sluttdato,
		status: instans.status,
		tiltak: {
			tiltakskode: instans.tiltak.tiltakskode,
			tiltaksnavn: instans.tiltak.tiltaksnavn
		}
	}
}

export const tilTiltakDeltagerDto = (deltager: TiltakDeltagerDetaljerDTO): TiltakDeltagerDTO => {
	return {
		id: deltager.id,
		fornavn: deltager.fornavn,
		mellomnavn: deltager.mellomnavn,
		etternavn: deltager.etternavn,
		fodselsnummer: deltager.fodselsnummer,
		oppstartdato: deltager.oppstartdato,
		sluttdato: deltager.sluttdato,
		status: deltager.status
	}
}