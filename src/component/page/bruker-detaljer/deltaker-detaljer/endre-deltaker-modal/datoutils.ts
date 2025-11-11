import dayjs from 'dayjs'

import { Nullable } from '../../../../../utils/types/or-nothing'
import { DeltakersDeltakerliste } from '../../../../../api/data/deltaker'
import { maxVarighetLeggTilOppstartsDatoMillisFor, maxVarighetMillisFor } from './varighet'

/*
	Skal maksimum være 2 måneder tilbake i tid.
	Hvis deltakerlisteStartDato er satt så må datoen være etter.
*/
export const kalkulerMinDato = (
  deltakerlisteStartDato: Nullable<Date>
): Date => {
  const twoMonthsAgo = dayjs().subtract(2, 'month')

  if (deltakerlisteStartDato && twoMonthsAgo.isBefore(deltakerlisteStartDato)) {
    return deltakerlisteStartDato
  } else {
    return twoMonthsAgo.toDate()
  }
}

/*
Skal maksimum være 2 måneder forover i tid.
	Hvis deltakerlisteSluttDato er satt så må datoen være før.
*/
export const kalkulerMaxDato = (
  deltakerlisteSluttDato: Nullable<Date>
): Date => {
  const twoMonthsInTheFuture = dayjs().add(2, 'month')

  if (
    deltakerlisteSluttDato &&
    twoMonthsInTheFuture.isAfter(deltakerlisteSluttDato)
  ) {
    return deltakerlisteSluttDato
  } else {
    return twoMonthsInTheFuture.toDate()
  }
}

export function maxSluttdato(
  startdato: Nullable<Date>,
  deltakerliste: DeltakersDeltakerliste,
  skalLeggeTilOppstartsDato?: boolean
): Date | undefined {
  const maxVarighetMs = skalLeggeTilOppstartsDato
    ? maxVarighetLeggTilOppstartsDatoMillisFor(deltakerliste.tiltakskode)
    : maxVarighetMillisFor(deltakerliste.tiltakskode)
  if (!startdato || !maxVarighetMs) return deltakerliste.sluttDato ?? undefined

  const sluttdato = dayjs(startdato).add(maxVarighetMs, 'milliseconds').toDate()

  if (!deltakerliste.sluttDato) return sluttdato

  return sluttdato < deltakerliste.sluttDato
    ? sluttdato
    : deltakerliste.sluttDato
}
