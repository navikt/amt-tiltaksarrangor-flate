import { useEffect, useState } from 'react'
import { Deltakelsesmengde } from '../../../../../../api/data/deltaker'
import dayjs from 'dayjs'
import { DateValidationT } from '@navikt/ds-react'

export function useDeltakelsesmengdeValidering(
  deltakelsesprosent: string,
  dagerPerUke: string,
  gyldigFra: Date | undefined,
  siste: Deltakelsesmengde | null
) {
  const [deltakelsesprosentError, setDeltakelsesprosentError] =
    useState<string>()
  const [dagerPerUkeError, setDagerPerUkeError] = useState<string>()
  const [gyldigFraError, setgyldigFraError] = useState<string>()

  const isNumberBetween = (n: string, min: number, max: number) => {
    const value = parseInt(n)
    return !(isNaN(value) || !n.match(/^\d+$/) || value < min || value > max)
  }

  const validerProsent = () => {
    const isValid = isNumberBetween(deltakelsesprosent, 1, 100)

    if (!isValid) {
      setDeltakelsesprosentError('Tallet må være et helt tall fra 1 til 100')
      return false
    }

    setDeltakelsesprosentError(undefined)
    return true
  }

  const validerDager = () => {
    if (dagerPerUke === '' || deltakelsesprosent === '100') {
      setDagerPerUkeError(undefined)
      return true
    }
    const isValid = isNumberBetween(dagerPerUke, 1, 5)

    if (!isValid) {
      setDagerPerUkeError('Dager per uke må være et helt tall fra 1 til 5')
      return false
    }

    setDagerPerUkeError(undefined)
    return true
  }

  const validerGyldigFra = (validation: DateValidationT) => {
    if (validation.isBefore) {
      setgyldigFraError(
        'Datoen kan ikke velges fordi den er før deltakers startsdato'
      )
    } else if (validation.isAfter) {
      setgyldigFraError(
        'Datoen kan ikke velges fordi den er etter deltakers sluttdato'
      )
    } else if (validation.isInvalid) {
      setgyldigFraError('Ugyldig dato')
    } else {
      setgyldigFraError(undefined)
    }
  }

  const harEndring = () => {
    const prosent = parseInt(deltakelsesprosent)
    const dager = parseInt(dagerPerUke)
    if (!siste) {
      return true
    }
    if (prosent !== siste.deltakelsesprosent || dager !== siste.dagerPerUke) {
      return true
    } else {
      return dayjs(gyldigFra)
        .startOf('day')
        .isBefore(dayjs(siste.gyldigFra).startOf('day'))
    }
  }

  useEffect(() => {
    if (deltakelsesprosent === '') {
      setDeltakelsesprosentError(undefined)
      return
    }
    validerProsent()
  }, [deltakelsesprosent])

  useEffect(() => {
    validerDager()
  }, [dagerPerUke])

  const isValid =
    deltakelsesprosent !== '' &&
    !deltakelsesprosentError &&
    !dagerPerUkeError &&
    !gyldigFraError

  return {
    deltakelsesprosentError,
    dagerPerUkeError,
    gyldigFraError,
    validerGyldigFra,
    harEndring,
    isValid
  }
}
