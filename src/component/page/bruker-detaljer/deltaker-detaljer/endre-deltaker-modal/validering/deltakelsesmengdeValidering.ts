import { useEffect, useState } from 'react'

export function useDeltakelsesmengdeValidering(
  deltakelsesprosent: string,
  dagerPerUke: string,
  opprinneligDagerPerUke: number | null,
  opprinneligDeltakelsesprosent: number | null
) {
  const [deltakelsesprosentError, setDeltakelsesprosentError] =
    useState<string>()
  const [dagerPerUkeError, setDagerPerUkeError] = useState<string>()

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
    if (deltakelsesprosent === opprinneligDeltakelsesprosent?.toString()
      && dagerPerUke === opprinneligDagerPerUke?.toString()) {
      setDeltakelsesprosentError(
        'Både deltakelsesprosent og dager i uken kan ikke være lik det som er registrert fra før.'
      )
      return false
    } else if (deltakelsesprosent === opprinneligDeltakelsesprosent?.toString()
      && opprinneligDeltakelsesprosent === 100) {
      setDeltakelsesprosentError(
        'Deltakelsesprosent kan ikke være lik det som er registrert fra før.'
      )
      return false
    } else {
      setDagerPerUkeError(undefined)
      setDeltakelsesprosentError(undefined)
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

    if (deltakelsesprosent === opprinneligDeltakelsesprosent?.toString()
      && dagerPerUke === opprinneligDagerPerUke?.toString()) {
      setDagerPerUkeError(
        'Både deltakelsesprosent og dager i uken kan ikke være lik det som er registrert fra før.'
      )
      return false
    } else {
      setDagerPerUkeError(undefined)
      setDeltakelsesprosentError(undefined)
    }

    setDagerPerUkeError(undefined)
    return true
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
    deltakelsesprosent !== '' && !deltakelsesprosentError && !dagerPerUkeError

  return {
    deltakelsesprosentError,
    dagerPerUkeError,
    isValid
  }
}
