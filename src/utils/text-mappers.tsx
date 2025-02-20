import { Adressetype, Hendelser, TiltakDeltakerStatus } from '../api/data/deltaker'
import { DeltakerStatusAarsak, DeltakerStatusAarsakType } from '../api/data/endringsmelding'
import { EndringAarsak, ForslagEndringAarsakType, ForslagEndringType, ForslagStatusType } from '../api/data/forslag'
import { DeltakerHistorikkStatus, Endring, EndringType } from '../api/data/historikk'
import { Veiledertype } from '../api/data/veileder'
import { dateStrWithMonthName } from './date-utils'
import { getDeltakelsesmengdetekst } from './deltaker-utils'

export const mapTiltakDeltakerStatusTilTekst = (
  tiltakDeltakerStatus: typeof TiltakDeltakerStatus | string
): string => {
  switch (tiltakDeltakerStatus) {
    case TiltakDeltakerStatus.VENTER_PA_OPPSTART:
      return 'Venter på oppstart'
    case TiltakDeltakerStatus.DELTAR:
      return 'Deltar'
    case TiltakDeltakerStatus.HAR_SLUTTET:
      return 'Har sluttet'
    case TiltakDeltakerStatus.IKKE_AKTUELL:
      return 'Ikke aktuell'
    case TiltakDeltakerStatus.VURDERES:
      return 'Vurderes'
    case TiltakDeltakerStatus.FULLFORT:
      return 'Fullført'
    case TiltakDeltakerStatus.AVBRUTT:
      return 'Avbrutt'
    default:
      return tiltakDeltakerStatus.toString()
  }
}

export const mapHendelseTypeTilTekst = (
  hendelse: Hendelser | string
): string => {
  if (hendelse === Hendelser.SvarFraNav) {
    return 'Svar fra Nav'
  } else if (hendelse === Hendelser.VenterPaSvarFraNav) {
    return 'Venter på svar fra Nav'
  } else {
    return ''
  }
}

export const mapVeilderTypeTilTekst = (
  veilederType: Veiledertype | string
): string => {
  if (veilederType === Veiledertype.MEDVEILEDER) {
    return 'Medveileder'
  } else {
    return 'Veileder'
  }
}

export const mapAdresseTypeTilTekst = (adressetype: Adressetype) => {
  switch (adressetype) {
    case Adressetype.KONTAKTADRESSE:
      return 'Kontaktadresse'
    case Adressetype.OPPHOLDSADRESSE:
      return 'Oppholdsadresse'
    case Adressetype.BOSTEDSADRESSE:
      return 'Bostedsadresse'
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
  }
}

export const getEndringsTittel = (endring: Endring) => {
  switch (endring.type) {
    case EndringType.IkkeAktuell:
      return 'Deltakelsen er ikke aktuell'
    case EndringType.ForlengDeltakelse:
      return `Deltakelsen er forlenget til ${dateStrWithMonthName(endring.sluttdato)}`
    case EndringType.AvsluttDeltakelse:
    case EndringType.EndreSluttdato:
      return `Ny sluttdato er ${dateStrWithMonthName(endring.sluttdato)}`
    case EndringType.EndreBakgrunnsinformasjon:
      return 'Bakgrunnsinfo er endret'
    case EndringType.EndreDeltakelsesmengde:
      return `Deltakelsen er endret til ${getDeltakelsesmengdetekst(endring.deltakelsesprosent, endring.dagerPerUke)}`
    case EndringType.EndreInnhold:
      return 'Innholdet er endret'
    case EndringType.ReaktiverDeltakelse:
      return 'Deltakelsen er endret til å være aktiv'
    case EndringType.EndreSluttarsak:
      return `Sluttårsak er endret til: ${getDeltakerStatusAarsakText(endring.aarsak)}`
    case EndringType.EndreStartdato:
      return `Oppstartsdato er endret til ${dateStrWithMonthName(endring.startdato)}`
    case EndringType.FjernOppstartsdato:
      return 'Oppstartsdato er fjernet'
  }
}

export const getForslagTittel = (endringstype: ForslagEndringType) => {
  switch (endringstype) {
    case ForslagEndringType.IkkeAktuell:
      return 'Er ikke aktuell'
    case ForslagEndringType.ForlengDeltakelse:
      return 'Forleng deltakelse'
    case ForslagEndringType.AvsluttDeltakelse:
      return 'Avslutt deltakelse'
    case ForslagEndringType.Deltakelsesmengde:
      return 'Endre deltakelsesmengde'
    case ForslagEndringType.Sluttarsak:
      return 'Endre sluttårsak'
    case ForslagEndringType.Sluttdato:
      return 'Endre sluttdato'
    case ForslagEndringType.Startdato:
      return 'Endre oppstartsdato'
    case ForslagEndringType.FjernOppstartsdato:
      return 'Fjern oppstartsdato'
  }
}

export const getForslagStatusTypeText = (type: ForslagStatusType) => {
  switch (type) {
    case ForslagStatusType.VenterPaSvar:
      return 'Venter på svar fra Nav'
    case ForslagStatusType.Avvist:
      return 'Forslaget er avvist'
    case ForslagStatusType.Erstattet:
      return 'Forslaget er erstattet'
    case ForslagStatusType.Godkjent:
      return 'Forslaget er godkjent'
    case ForslagStatusType.Tilbakekalt:
      return 'Forslaget er tilbakekalt'
  }
}

export const getForslagEndringAarsakText = (aarsak: EndringAarsak) => {
  switch (aarsak.type) {
    case ForslagEndringAarsakType.Annet:
      return `Annet - ${aarsak.beskrivelse}`
    case ForslagEndringAarsakType.FattJobb:
      return 'Fått jobb'
    case ForslagEndringAarsakType.IkkeMott:
      return 'Møter ikke opp'
    case ForslagEndringAarsakType.Syk:
      return 'Syk'
    case ForslagEndringAarsakType.TrengerAnnenStotte:
      return 'Trenger annen hjelp og støtte'
    case ForslagEndringAarsakType.Utdanning:
      return 'Utdanning'
  }
}

export const getDeltakerHistorikkStatusDisplayText = (
  type: DeltakerHistorikkStatus
): string => {
  switch (type) {
    case DeltakerHistorikkStatus.KLADD:
      return 'Kladd'
    case DeltakerHistorikkStatus.UTKAST_TIL_PAMELDING:
      return 'Utkast til påmelding'
    case DeltakerHistorikkStatus.VENTER_PA_OPPSTART:
      return 'Venter på oppstart'
    case DeltakerHistorikkStatus.DELTAR:
      return 'Deltar'
    case DeltakerHistorikkStatus.HAR_SLUTTET:
      return 'Har sluttet'
    case DeltakerHistorikkStatus.IKKE_AKTUELL:
      return 'Ikke aktuell'
    case DeltakerHistorikkStatus.FEILREGISTRERT:
      return 'Feilregistrert'
    case DeltakerHistorikkStatus.SOKT_INN:
      return 'Søkt inn'
    case DeltakerHistorikkStatus.VURDERES:
      return 'Vurderes'
    case DeltakerHistorikkStatus.VENTELISTE:
      return 'Venteliste'
    case DeltakerHistorikkStatus.AVBRUTT:
      return 'Avbrutt'
    case DeltakerHistorikkStatus.FULLFORT:
      return 'Fullført'
    case DeltakerHistorikkStatus.PABEGYNT_REGISTRERING:
      return 'Påbegynt Registrering'
    case DeltakerHistorikkStatus.AVBRUTT_UTKAST:
      return 'Avbrutt utkast'
  }
}