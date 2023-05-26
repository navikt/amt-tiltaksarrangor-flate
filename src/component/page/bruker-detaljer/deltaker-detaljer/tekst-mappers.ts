import { DeltakerStatusAarsakType } from '../../../../api/data/endringsmelding'
import { EndringType } from './types'

export const aarsakTekstMapper = (aarsakType: DeltakerStatusAarsakType) => {
	switch (aarsakType) {
		case DeltakerStatusAarsakType.FATT_JOBB: return 'Fått jobb'
		case DeltakerStatusAarsakType.SYK: return 'Syk'
		case DeltakerStatusAarsakType.TRENGER_ANNEN_STOTTE: return 'Trenger annen hjelp og støtte'
		case DeltakerStatusAarsakType.IKKE_MOTT: return 'Møter ikke opp'
		case DeltakerStatusAarsakType.UTDANNING: return 'Utdanning'
		case DeltakerStatusAarsakType.OPPFYLLER_IKKE_KRAVENE: return 'Oppfyller ikke kravene - fyll ut'
		case DeltakerStatusAarsakType.ANNET: return 'Annet - fyll ut'
		default: return 'Ukjent'
	}
}

export const endringTypeTekstMapper = (endringsType: EndringType) => {
	switch (endringsType) {
		case EndringType.LEGG_TIL_OPPSTARTSDATO: return 'Legg til oppstartsdato'
		case EndringType.ENDRE_OPPSTARTSDATO: return 'Endre oppstartsdato'
		case EndringType.FORLENG_DELTAKELSE: return 'Forleng deltakelse'
		case EndringType.DELTAKER_IKKE_AKTUELL: return 'Er ikke aktuell'
		case EndringType.AVSLUTT_DELTAKELSE: return 'Avslutt deltakelse'
		case EndringType.ENDRE_DELTAKELSE_PROSENT: return 'Endre deltakelsesmengde'
		case EndringType.DELTAKER_ER_AKTUELL: return 'Er aktuell'
		case EndringType.ENDRE_SLUTTDATO: return 'Endre sluttdato'

		default: return 'Ukjent'
	}
}
