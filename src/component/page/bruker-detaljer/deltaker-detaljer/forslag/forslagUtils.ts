import { ForslagEndringType } from '../../../../../api/data/forslag'
import { assertNever } from '../../../../../utils/assert-never'
import { EndringType } from '../types'

export function forslagTitle(type: ForslagEndringType) {
  switch (type) {
    case ForslagEndringType.ForlengDeltakelse:
      return 'Forleng deltakelse'
    case ForslagEndringType.IkkeAktuell:
      return 'Personen er ikke aktuell'
    case ForslagEndringType.AvsluttDeltakelse:
      return 'Avslutt deltakelse'
    case ForslagEndringType.Deltakelsesmengde:
      return 'Endre deltakelsesmengde'
  }
}

export function mapTilEndringType(type: ForslagEndringType): EndringType {
  switch (type) {
    case ForslagEndringType.ForlengDeltakelse:
      return EndringType.FORLENG_DELTAKELSE
    case ForslagEndringType.IkkeAktuell:
      return EndringType.DELTAKER_IKKE_AKTUELL
    case ForslagEndringType.AvsluttDeltakelse:
      return EndringType.AVSLUTT_DELTAKELSE
    case ForslagEndringType.Deltakelsesmengde:
      return EndringType.ENDRE_DELTAKELSE_PROSENT
    default:
      assertNever(type)
  }
}
