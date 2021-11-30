import { InnloggetAnsattDTO, VirksomhetDTO } from '../../api/data/ansatt'
import { randomUuid } from '../utils/faker'

export const mockInnloggetAnsattVirksomheter: VirksomhetDTO[] = [
	{
		id: randomUuid(),
		overordnetEnhetNavn: 'Muligheter Org',
		overordnetEnhetOrganisasjonsnummer: '750863842',
		navn: 'Muligheter AS',
		organisasjonsnummer: '123456789',
		roller: [ 'KOORDINATOR', 'VEILEDER' ]
	},
	{
		id: randomUuid(),
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
	leverandorer: mockInnloggetAnsattVirksomheter
}
