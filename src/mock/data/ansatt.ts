import { InnloggetAnsatt, Virksomhet } from '../../api/data/ansatt'
import { ansattId, virksomhetId } from './id'

export const mockInnloggetAnsattVirksomheter: Virksomhet[] = [
	{
		id: virksomhetId(),
		overordnetEnhetNavn: 'Muligheter Org',
		overordnetEnhetOrganisasjonsnummer: '750863842',
		navn: 'Muligheter AS',
		organisasjonsnummer: '123456789',
		roller: [ 'KOORDINATOR', 'VEILEDER' ]
	},
	{
		id: virksomhetId(),
		overordnetEnhetNavn: 'Tiltak Org',
		overordnetEnhetOrganisasjonsnummer: '137603847',
		navn: 'Tiltak til alle AS',
		organisasjonsnummer: '987654321',
		roller: [ 'VEILEDER' ]
	}
]

export const mockInnloggetAnsatt: InnloggetAnsatt = {
	id: ansattId(),
	fornavn: 'Karoline',
	etternavn: 'Koordinatorsen',
	arrangorer: mockInnloggetAnsattVirksomheter
}
