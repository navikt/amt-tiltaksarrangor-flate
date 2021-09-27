import { mockTiltakInstanser } from './data';
import { TiltakDeltagerDetaljerDto, TiltakDeltagerDto } from '../api/data/deltager';
import { TiltakInstansDto } from '../api/data/tiltak';
import { MockTiltakDeltager } from './data/brukere';
import { MockTiltakInstans } from './data/tiltak';

export const tilTiltakInstansDto = (instans: MockTiltakInstans): TiltakInstansDto => {
	return {
		id: instans.id,
		navn: instans.navn,
		deltagerAntall: instans.deltagerAntall,
		deltagerKapasitet: instans.deltagerKapasitet,
		startdato: instans.startdato,
		sluttdato: instans.sluttdato,
		status: instans.status,
		tiltak: {
			tiltakskode: instans.tiltak.tiltakstype,
			tiltaksnavn: instans.tiltak.tiltaksnavn
		}
	};
};

export const tilTiltakDeltagerDto = (deltager: MockTiltakDeltager): TiltakDeltagerDto => {
	return {
		id: deltager.id,
		fornavn: deltager.fornavn,
		mellomnavn: deltager.mellomnavn,
		etternavn: deltager.etternavn,
		fodselsnummer: deltager.fodselsnummer,
		startdato: deltager.startdato,
		sluttdato: deltager.sluttdato,
		status: deltager.status
	};
};

export const tilTiltakDeltagerDetaljerDto = (deltager: MockTiltakDeltager): TiltakDeltagerDetaljerDto => {
	const tiltakInstans = mockTiltakInstanser.find(instans => instans.id === deltager.tiltakInstansId)!;

	return {
		id: deltager.id,
		fornavn: deltager.fornavn,
		mellomnavn: deltager.mellomnavn,
		etternavn: deltager.etternavn,
		fodselsnummer: deltager.fodselsnummer,
		startdato: deltager.startdato,
		sluttdato: deltager.sluttdato,
		status: deltager.status,
		epost: deltager.epost,
		navKontor: deltager.navKontor,
		navVeileder: deltager.navVeileder,
		telefon: deltager.telefon,
		tiltakInstans: tilTiltakInstansDto(tiltakInstans),
	};
};

