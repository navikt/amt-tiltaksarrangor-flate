import { InnloggetAnsattDTO, VirksomhetDTO } from '../../api/data/ansatt'
import { randomUuid } from '../utils/faker'

export const mockInnloggetAnsattVirksomheter: VirksomhetDTO[] = [
	{
		id: '4b26083d-c320-49e1-9104-b4dcdbcc8067',
		overordnetEnhetNavn: 'Muligheter Org',
		overordnetEnhetOrganisasjonsnummer: '750863842',
		navn: 'Muligheter AS',
		organisasjonsnummer: '123456789',
		roller: [ 'KOORDINATOR', 'VEILEDER' ]
	},
	{
		id: '7ee8b861-6dc7-4cc2-9706-252c82b63104',
		overordnetEnhetNavn: 'Tiltak Org',
		overordnetEnhetOrganisasjonsnummer: '137603847',
		navn: 'Tiltak til alle AS',
		organisasjonsnummer: '987654321',
		roller: [ 'VEILEDER' ]
	}
]

export const mockInnloggetAnsatt: InnloggetAnsattDTO = {
	id: randomUuid(),
	fornavn: 'Karoline',
	mellomnavn: undefined,
	etternavn: 'Koordinatorsen',
	arrangorer: mockInnloggetAnsattVirksomheter
}
