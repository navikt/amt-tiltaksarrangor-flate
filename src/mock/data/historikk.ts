import { DeltakerHistorikkListe, EndringType } from '../../api/data/historikk'
import { ForslagEndringAarsakType, ForslagEndringType, ForslagStatusType, HistorikkType } from '../../api/data/forslag'
import dayjs from 'dayjs'
import { randomUuid } from '../utils/faker'
import { DeltakerStatusAarsakType } from '../../api/data/endringsmelding'

const lagMockDeltakerhistorikkListe = (): DeltakerHistorikkListe => {
    return [
        {
            type: HistorikkType.Vedtak,
            fattet: dayjs().subtract(10, 'days').toDate(),
            bakgrunnsinformasjon: 'Bakgrunnsinformasjon',
            fattetAvNav: true,
            deltakelsesinnhold: {
                ledetekst:
                    'Du får tett oppfølging og støtte av en veileder. Sammen kartlegger dere hvordan din kompetanse, interesser og ferdigheter påvirker muligheten din til å jobbe.',
                innhold: [ {
                    tekst: 'Støtte til jobbsøking',
                    innholdskode: 'type1',
                    beskrivelse: null
                } ]
            },
            opprettetAv: 'Navn Navnesen',
            opprettetAvEnhet: 'NAV Fredrikstad',
            opprettet: dayjs().subtract(3, 'day').toDate()
        },
        {
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
                        type: ForslagEndringAarsakType.IkkeMott
                    }
                },
                status: {
                    type: ForslagStatusType.VenterPaSvar
                }
            }
        }
    ]
}

export const mockDeltakerHistorikk = lagMockDeltakerhistorikkListe()