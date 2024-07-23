import { useEffect, useState } from 'react'

export function useDeltakelsesmengdeValidering(
  deltakelsesprosent: string,
  dagerPerUke: string,
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
    if (deltakelsesprosent === opprinneligDeltakelsesprosent?.toString()) {
      setDeltakelsesprosentError(
        'Kan ikke være lik prosenten som er registrert'
      )
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
