import { Vurderingstype } from '../../../../api/data/deltaker'
import { DeltakerStatusAarsak, DeltakerStatusAarsakType} from '../../../../api/data/endringsmelding'
import { EndringAarsak } from '../../../../api/data/forslag'
import { EndringType } from './types'
import { AvslutningsType } from './endre-deltaker-modal/AvsluttKursDeltakelseModal'

export const aarsakTekstMapper = (aarsakType: DeltakerStatusAarsakType) => {
  switch (aarsakType) {
    case DeltakerStatusAarsakType.FATT_JOBB:
      return 'Fått jobb'
    case DeltakerStatusAarsakType.SYK:
      return 'Syk'
    case DeltakerStatusAarsakType.TRENGER_ANNEN_STOTTE:
      return 'Trenger annen hjelp og støtte'
    case DeltakerStatusAarsakType.IKKE_MOTT:
      return 'Møter ikke opp'
    case DeltakerStatusAarsakType.UTDANNING:
      return 'Utdanning'
    case DeltakerStatusAarsakType.ANNET:
      return 'Annet - fyll ut'
    case DeltakerStatusAarsakType.SAMARBEIDET_MED_ARRANGOREN_ER_AVBRUTT:
      return 'Samarbeidet med arrangøren er avbrutt'
    case DeltakerStatusAarsakType.KURS_FULLT:
      return 'Kurset er fullt'
    case DeltakerStatusAarsakType.KRAV_IKKE_OPPFYLT:
      return 'Krav for deltakelse er ikke oppfylt'
    case DeltakerStatusAarsakType.AVLYST_KONTRAKT:
      return 'Kontrakten med arrangør er avlyst'
    case DeltakerStatusAarsakType.FIKK_IKKE_PLASS:
      return 'Fikk ikke plass'
    default:
      return 'Ukjent'
  }
}

export const avslutningsTypeTekstMapper = (kategoriType: AvslutningsType) => {
  switch (kategoriType) {
    case AvslutningsType.FULLFORT:
      return 'Ja, kurset er fullført'
    case AvslutningsType.AVBRUTT:
      return 'Nei, kurset er avbrutt'
    case AvslutningsType.IKKE_DELTATT:
      return 'Nei, personen har ikke deltatt'
    default:
      return 'Ukjent'
  }
}

export const avslutningsBeskrivelseTekstMapper = (kategoriType: AvslutningsType) => {
  switch (kategoriType) {
    case AvslutningsType.FULLFORT:
      return 'Med fullført menes at kurset er gjennomført, og/eller at ønsket mål, sertifisering el. er oppnådd'
    case AvslutningsType.AVBRUTT:
      return 'Med avbrutt menes at deltakeren avslutter på kurset uten å ha gjennomført og/eller oppnådd ønsket mål, sertifisering el.'
    case AvslutningsType.IKKE_DELTATT:
      return 'Dersom personen ikke har deltatt på tiltaket, vil statusen på tiltaket endres til “Ikke aktuell”.'
    default:
      return 'Ukjent'
  }
}
export const getDeltakerStatusAarsakText = (aarsak: DeltakerStatusAarsak) => {
  switch (aarsak.type) {
    case DeltakerStatusAarsakType.ANNET: {
      const beskrivelse = aarsak.beskrivelse ? ` - ${aarsak.beskrivelse}` : ''
      return `Annet${beskrivelse}`
    }
    case DeltakerStatusAarsakType.FATT_JOBB:
      return 'Fått jobb'
    case DeltakerStatusAarsakType.IKKE_MOTT:
      return 'Møter ikke opp'
    case DeltakerStatusAarsakType.SYK:
      return 'Syk'
    case DeltakerStatusAarsakType.TRENGER_ANNEN_STOTTE:
      return 'Trenger annen hjelp og støtte'
    case DeltakerStatusAarsakType.UTDANNING:
      return 'Utdanning'
    case DeltakerStatusAarsakType.SAMARBEIDET_MED_ARRANGOREN_ER_AVBRUTT:
      return 'Samarbeidet med arrangøren er avbrutt'
    case DeltakerStatusAarsakType.KURS_FULLT:
      return 'Kurset er fullt'
    case DeltakerStatusAarsakType.KRAV_IKKE_OPPFYLT:
      return 'Krav for deltakelse er ikke oppfylt'
    case DeltakerStatusAarsakType.AVLYST_KONTRAKT:
      return 'Kontrakten med arrangør er avlyst'
    case DeltakerStatusAarsakType.FIKK_IKKE_PLASS:
      return 'Fikk ikke plass'
  }
}

export const endringAarsakTekstMapper = (aarsak: EndringAarsak) => {
  switch (aarsak.type) {
    case 'Syk':
      return 'Syk'
    case 'FattJobb':
      return 'Fått jobb'
    case 'TrengerAnnenStotte':
      return 'Trenger annen hjelp og støtte'
    case 'Utdanning':
      return 'Utdanning'
    case 'IkkeMott':
      return 'Møter ikke opp'
    case 'Annet':
      return aarsak.beskrivelse
  }
}

export const endringTypeTekstMapper = (endringsType: EndringType) => {
  switch (endringsType) {
    case EndringType.LEGG_TIL_OPPSTARTSDATO:
      return 'Legg til oppstartsdato'
    case EndringType.ENDRE_OPPSTARTSDATO:
      return 'Endre oppstartsdato'
    case EndringType.FORLENG_DELTAKELSE:
      return 'Forleng deltakelse'
    case EndringType.DELTAKER_IKKE_AKTUELL:
      return 'Er ikke aktuell'
    case EndringType.AVSLUTT_DELTAKELSE:
      return 'Avslutt deltakelse'
    case EndringType.AVSLUTT_KURS_DELTAKELSE:
      return 'Avslutt deltakelse'
    case EndringType.ENDRE_DELTAKELSE_PROSENT:
      return 'Endre deltakelsesmengde'
    case EndringType.ENDRE_SLUTTDATO:
      return 'Endre sluttdato'
    case EndringType.ENDRE_SLUTTAARSAK:
      return 'Endre sluttårsak'
    case EndringType.FJERN_OPPSTARTSDATO:
      return 'Fjern oppstartsdato'
    default:
      return 'Ukjent'
  }
}

export const vurderingstypeTeksMapper = (vurderingstype: Vurderingstype) => {
  switch (vurderingstype) {
    case Vurderingstype.OPPFYLLER_IKKE_KRAVENE:
      return 'Oppfyller ikke kravene'
    case Vurderingstype.OPPFYLLER_KRAVENE:
      return 'Oppfyller kravene'
    default:
      return 'Ukjent'
  }
}
