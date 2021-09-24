import { lagMockTiltakDeltagereForTiltakInstans, MockTiltakDeltager } from './brukere';
import { lagTiltakinstanser, MockTiltakInstans } from './tiltak';
import { mockInnloggetAnsattVirksomheter } from './ansatt';

export const mockTiltakInstanser: MockTiltakInstans[] = mockInnloggetAnsattVirksomheter
	.map(virksomhet => lagTiltakinstanser(virksomhet.id))
	.reduce((previousValue, currentValue) => previousValue.concat(currentValue), []);

export const mockTiltakDeltagere: MockTiltakDeltager[] = mockTiltakInstanser
	.map(instans => lagMockTiltakDeltagereForTiltakInstans(instans))
	.reduce((previousValue, currentValue) => previousValue.concat(currentValue), []);
