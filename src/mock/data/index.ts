import { lagMockTiltakDeltagereForTiltakInstans } from './brukere';
import { TiltakInstansStatus } from '../../api/data/tiltak';
import { TiltakDeltagerStatus } from '../../api/data/deltager';
import { lagTiltakinstanser } from './tiltak';

export interface MockTiltakInstans {
	id: string,
	navn: string,
	startdato: string,
	sluttdato: string,
	status: TiltakInstansStatus,
	deltagerAntall: number,
	deltagerKapasitet: number,
	tiltak: {
		tiltakstype: string,
		tiltaksnavn: string
	}
}

export interface MockTiltakDeltager {
	id: string,
	tiltakInstansId: string
	fornavn: string,
	mellomnavn: string | undefined,
	etternavn: string,
	fodselsdato: string | undefined,
	telefon: string | undefined,
	epost: string | undefined,
	navKontor: {
		navn: string,
		adresse: string
	},
	navVeileder: {
		navn: string,
		telefon: string,
		epost: string,
	},
	startdato: string,
	sluttdato: string,
	status: TiltakDeltagerStatus,
}

export const mockTiltakInstanser: MockTiltakInstans[] = lagTiltakinstanser();

export const mockTiltakDeltagere: MockTiltakDeltager[] = mockTiltakInstanser
	.map(instans => lagMockTiltakDeltagereForTiltakInstans(instans))
	.reduce((previousValue, currentValue) => previousValue.concat(currentValue), []);
