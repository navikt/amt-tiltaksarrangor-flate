import { ForslagEndringType } from '../../../../../api/data/forslag'
import { EndringType } from '../../../../../api/data/historikk'
import { UlestEndring, UlestEndringType } from '../../../../../api/data/ulestEndring'

export function forslagEndringsTittel(type: ForslagEndringType | EndringType) {
  switch (type) {
    case ForslagEndringType.ForlengDeltakelse:
    case EndringType.ForlengDeltakelse:
      return 'Forleng deltakelse'
    case ForslagEndringType.IkkeAktuell:
    case EndringType.IkkeAktuell:
      return 'Er ikke aktuell'
    case ForslagEndringType.AvsluttDeltakelse:
    case EndringType.AvsluttDeltakelse:
      return 'Avslutt deltakelse'
    case ForslagEndringType.Deltakelsesmengde:
    case EndringType.EndreDeltakelsesmengde:
      return 'Endre deltakelsesmengde'
    case ForslagEndringType.Sluttdato:
    case EndringType.EndreSluttdato:
      return 'Endre sluttdato'
    case ForslagEndringType.Startdato:
    case EndringType.EndreStartdato:
      return 'Endre oppstartsdato'
    case ForslagEndringType.Sluttarsak:
    case EndringType.EndreSluttarsak:
      return 'Endre sluttårsak'
    case ForslagEndringType.FjernOppstartsdato:
    case EndringType.FjernOppstartsdato:
      return 'Fjern oppstartsdato'
    case EndringType.EndreInnhold:
      return 'Endre innhold'
    case EndringType.EndreBakgrunnsinformasjon:
      return 'Endre bakgrunnsinformasjon'
    case EndringType.ReaktiverDeltakelse:
      return 'Deltakelsen er endret til å være aktiv'
    case EndringType.EndreAvslutning:
    case ForslagEndringType.EndreAvslutning:
      return 'Endre avslutning'
  }
}

export const ulestEndringErSvarFraNav = (ulestEndring: UlestEndring) => {
  if (ulestEndring.oppdatering.type === UlestEndringType.DeltakelsesEndring) {
    return !!ulestEndring.oppdatering.endring.forslag
  }
  if (ulestEndring.oppdatering.type === UlestEndringType.AvvistForslag) {
    return true
  }
  return false
}

export const ulestEndringErOppdateringFraNav = (ulestEndring: UlestEndring) =>
  !ulestEndringErSvarFraNav(ulestEndring) && !ulestEndringErNyeDeltaker(ulestEndring)

export const ulestEndringErNyeDeltaker = (ulestEndring: UlestEndring) =>
  ulestEndring.oppdatering.type === UlestEndringType.NyDeltaker ||
  ulestEndring.oppdatering.type === UlestEndringType.DeltMedArrangor ||
  (ulestEndring.oppdatering.type === UlestEndringType.TildeltPlass && ulestEndring.oppdatering.erNyDeltaker)
