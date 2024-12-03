import {
  ForslagEndringType,
  HistorikkForslag as Forslag
} from '../../api/data/forslag'
import { EndringType } from '../../component/page/bruker-detaljer/deltaker-detaljer/types'
import { EndringType as HistorikkEndringType } from './../../api/data/historikk'

export const getEndreDeltakelsesType = (forslag: Forslag) => {
  switch (forslag.endring.type) {
    case ForslagEndringType.IkkeAktuell:
      return EndringType.DELTAKER_IKKE_AKTUELL
    case ForslagEndringType.AvsluttDeltakelse:
      return EndringType.AVSLUTT_DELTAKELSE
    case ForslagEndringType.ForlengDeltakelse:
      return EndringType.FORLENG_DELTAKELSE
    case ForslagEndringType.Deltakelsesmengde:
      return EndringType.ENDRE_DELTAKELSE_PROSENT
    case ForslagEndringType.Sluttdato:
      return EndringType.ENDRE_SLUTTDATO
    case ForslagEndringType.Startdato:
      return EndringType.ENDRE_OPPSTARTSDATO
    case ForslagEndringType.Sluttarsak:
      return EndringType.ENDRE_SLUTTAARSAK
  }
}

export const getHistorikkEndringsType = (forslag: Forslag) => {
  switch (forslag.endring.type) {
    case ForslagEndringType.IkkeAktuell:
      return HistorikkEndringType.IkkeAktuell
    case ForslagEndringType.AvsluttDeltakelse:
      return HistorikkEndringType.AvsluttDeltakelse
    case ForslagEndringType.ForlengDeltakelse:
      return HistorikkEndringType.ForlengDeltakelse
    case ForslagEndringType.Deltakelsesmengde:
      return HistorikkEndringType.EndreDeltakelsesmengde
    case ForslagEndringType.Sluttdato:
      return HistorikkEndringType.EndreSluttdato
    case ForslagEndringType.Startdato:
      return HistorikkEndringType.EndreStartdato
    case ForslagEndringType.Sluttarsak:
      return HistorikkEndringType.EndreSluttarsak
  }
}
