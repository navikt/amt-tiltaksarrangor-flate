import { EndringsmeldingType } from '../../../../../api/data/endringsmelding'
import { EndringType } from '../types'

export const mapTilEndringType = (endringsmeldingType: EndringsmeldingType) => {
  switch (endringsmeldingType) {
    case EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO:
      return EndringType.LEGG_TIL_OPPSTARTSDATO
    case EndringsmeldingType.ENDRE_OPPSTARTSDATO:
      return EndringType.ENDRE_OPPSTARTSDATO
    case EndringsmeldingType.FORLENG_DELTAKELSE:
      return EndringType.FORLENG_DELTAKELSE
    case EndringsmeldingType.DELTAKER_IKKE_AKTUELL:
      return EndringType.DELTAKER_IKKE_AKTUELL
    case EndringsmeldingType.AVSLUTT_DELTAKELSE:
      return EndringType.AVSLUTT_DELTAKELSE
    case EndringsmeldingType.ENDRE_DELTAKELSE_PROSENT:
      return EndringType.ENDRE_DELTAKELSE_PROSENT
    case EndringsmeldingType.ENDRE_SLUTTDATO:
      return EndringType.ENDRE_SLUTTDATO
    case EndringsmeldingType.ENDRE_SLUTTAARSAK:
      return EndringType.ENDRE_SLUTTAARSAK
    default:
      throw Error(`Kan ikke finne endringsmeldingtype: ${endringsmeldingType}`)
  }
}
