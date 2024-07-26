import dayjs from 'dayjs'

import { Nullable } from '../../../../../utils/types/or-nothing'

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
