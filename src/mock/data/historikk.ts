import { DeltakerHistorikkListe, EndringType } from '../../api/data/historikk'


export const mockDeltakerHistorikk = lagMockDeltakerhistorikkListe(5)

function lagMockDeltakerhistorikkListe(n: number): DeltakerHistorikkListe[] {
	return []
	/*return new Array(n).fill(null).map(() => {
		return {
			type: HistorikkType.Endring,
			endring: {
				type: EndringType.EndreSluttarsak,
				aarsak: { type: DeltakerStatusAarsakType.IKKE_MOTT, beskrivelse: null },
				begrunnelse: null
			},
			endretAv: 'Navn Navnesen',
			endretAvEnhet: 'NAV Fredrikstad',
			endret: dayjs().subtract(2, 'day').toDate(),
			forslag: {
				id: randomUuid(),
				type: HistorikkType.Forslag,
				opprettet: dayjs().toDate(),
				begrunnelse: null,
				arrangorNavn: 'Muligheter As',
				endring: {
					type: ForslagEndringType.Sluttarsak,
					aarsak: {
						type: DeltakerStatusAarsakType.IKKE_MOTT
					}
				},
				status: {
					type: ForslagStatusType.Godkjent,
					godkjent: dayjs().toDate()
				}
			}
		}
	})*/
}

