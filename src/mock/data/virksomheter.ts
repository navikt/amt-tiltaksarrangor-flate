
interface Virksomhet {
	id: string;
	navn: string;
	virksomhetsnummer: string;
}

export const mockVirksomheter: Virksomhet[] = [
	{
		id: 'a474079d-8214-4da0-acf2-906eab146ac3',
		navn: 'Muligheter AS',
		virksomhetsnummer: '123456789'
	},
	{
		id: '1d485ec2-8d98-4b96-8c0a-e6038cfdc57c',
		navn: 'Tiltak til alle AS',
		virksomhetsnummer: '987654321'
	}
];