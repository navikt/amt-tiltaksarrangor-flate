import { compareAsc, Sortering } from '../../../utils/sortering-utils'
import { VeiledersDeltaker } from '../../../api/data/deltaker'

export enum DeltakerKolonne {
  NAVN = 'NAVN',
  FODSELSNUMMER = 'FODSELSNUMMER',
  SIST_ENDRET = 'SIST_ENDRET',
  STATUS = 'STATUS',
  OPPSTART = 'OPPSTART',
  SLUTT = 'SLUTT'
}

export const sorterVeiledersDeltakere = (
  deltakere: VeiledersDeltaker[],
  sortering: Sortering | undefined
): VeiledersDeltaker[] => {
  if (!sortering) {
    return sorterStatusEndringDesc(deltakere)
  }

  if (sortering.direction === undefined) {
    return deltakere
  }

  const sorterteDeltakereAsc = [...deltakere].sort((a, b) => {
    switch (sortering.orderBy) {
      case DeltakerKolonne.NAVN: {
        const compareRes = compareAsc(a.etternavn, b.etternavn)
        return compareRes != 0 ? compareRes : compareAsc(a.fornavn, b.fornavn)
      }
      case DeltakerKolonne.STATUS:
        return compareAsc(a.status.type, b.status.type)
      case DeltakerKolonne.SIST_ENDRET:
        return compareAsc(a.sistEndret, b.sistEndret)
      case DeltakerKolonne.OPPSTART:
        return compareAsc(a.startDato, b.startDato)
      case DeltakerKolonne.SLUTT:
        return compareAsc(a.sluttDato, b.sluttDato)
      case DeltakerKolonne.FODSELSNUMMER:
        return compareAsc(a.fodselsnummer, b.fodselsnummer)
      default:
        return 0
    }
  })

  if (sortering.direction === 'descending') {
    return sorterteDeltakereAsc.reverse()
  }

  return sorterteDeltakereAsc
}

const sorterStatusEndringDesc = (
  deltakere: VeiledersDeltaker[]
): VeiledersDeltaker[] => {
  return [...deltakere]
    .sort((d1, d2) => {
      return compareAsc(d1.status.endretDato, d2.status.endretDato)
    })
    .reverse()
}
