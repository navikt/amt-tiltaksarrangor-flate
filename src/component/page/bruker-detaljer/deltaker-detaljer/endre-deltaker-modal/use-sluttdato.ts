import { DateValidationT } from '@navikt/ds-react'
import { Deltaker } from '../../../../../api/data/deltaker'
import { VarighetValg, varigheter } from './varighet'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { formatDate } from '../../../../../utils/date-utils'

interface UseSluttdatoOpts {
  min?: Date
  max?: Date
  valgtVarighet: VarighetValg | undefined
  defaultAnnetDato?: Date
}

export function useSluttdato({
  min,
  max,
  valgtVarighet,
  defaultAnnetDato
}: UseSluttdatoOpts): {
  sluttdato: Date | undefined
  error: string | null
  valider: () => boolean
  validerDato: (dateValidation: DateValidationT, date?: Date) => void
  handleChange: (date: Date | undefined) => void
} {
  const [sluttdato, setSluttdato] = useState<Date>()
  const [error, setError] = useState<string>()

  const onAnnetChange = (d: Date | undefined) => {
    setSluttdato(d)
  }

  const annet = useSluttdatoInput({
    min,
    max,
    onChange: onAnnetChange,
    defaultDato: defaultAnnetDato,
    erSkjult: valgtVarighet !== VarighetValg.ANNET
  })

  const kalkulerSluttdatoFra = (date: Date, varighetValg: VarighetValg) => {
    const varighet = varigheter[varighetValg]
    return dayjs(date).add(varighet.antall, varighet.tidsenhet).toDate()
  }

  useEffect(() => {
    if (valgtVarighet === VarighetValg.ANNET) {
      setSluttdato(annet.sluttdato)
    } else if (valgtVarighet && min) {
      setSluttdato(kalkulerSluttdatoFra(min, valgtVarighet))
    }
  }, [min, valgtVarighet])

  useEffect(() => {
    if (sluttdato && valgtVarighet !== VarighetValg.ANNET) {
      setError(validerSluttdato(sluttdato, min, max))
    } else if (valgtVarighet === VarighetValg.ANNET || !min) {
      setError(undefined)
    }
  }, [valgtVarighet, sluttdato])

  const valider = () => {
    if (!valgtVarighet) {
      setError('Du må velge en varighet')
      return false
    }
    if (!sluttdato) {
      setError('Du må velge en sluttdato')
      return false
    }
    return error === null && annet.error === null
  }

  const validerDato = (dateValidation: DateValidationT, date?: Date) => {
    annet.validate(dateValidation, date)
  }

  const handleChange = (date: Date | undefined) => {
    if (valgtVarighet === VarighetValg.ANNET) {
      annet.onChange(date)
    }
  }

  const hasError = error !== undefined || annet.error !== undefined

  return {
    sluttdato: hasError || valgtVarighet === undefined ? undefined : sluttdato,
    error: error || annet.error,
    valider,
    validerDato,
    handleChange
  }
}

interface SluttdatoInputOpts {
  min?: Date
  max?: Date
  onChange?: (date: Date | undefined) => void
  defaultDato: Date | undefined
  erSkjult?: boolean
}
export function useSluttdatoInput({
  min,
  max,
  onChange,
  defaultDato,
  erSkjult
}: SluttdatoInputOpts) {
  const [sluttdato, setSluttdato] = useState<Date | undefined>(defaultDato)
  const [error, setError] = useState<string>()

  useEffect(() => {
    if (sluttdato) {
      setError(validerSluttdato(sluttdato, min, max))
    } else {
      setError(undefined)
    }
  }, [min])

  const validate = (dateValidation: DateValidationT, date?: Date) => {
    if (dateValidation.isInvalid) {
      setError('Ugyldig dato')
    } else if (dateValidation.isBefore) {
      setError(`Dato må være etter ${min}`)
    } else if (date) {
      setError(validerSluttdato(date, min, max))
    } else {
      setError(undefined)
    }
  }

  const handleChange = (date: Date | undefined) => {
    if (date) {
      setSluttdato(date)
      setError(validerSluttdato(date, min, max))
    }
    if (onChange) {
      onChange(date)
    }
  }

  const errorMsg = erSkjult ? undefined : error

  return { sluttdato, error: errorMsg, validate, onChange: handleChange }
}

function validerSluttdato(dato: Date | undefined, min?: Date, max?: Date) {
  const sluttdato = dayjs(dato)
  if (!dato || !sluttdato.isValid()) {
    return 'Ugyldig dato'
  }
  if (min && sluttdato.isBefore(min)) {
    return `Dato må være etter ${formatDate(dayjs(min).subtract(1, 'day').toDate())}`
  } else if (max && sluttdato.isAfter(max)) {
    return `Dato må være før ${formatDate(dayjs(max).add(1, 'day').toDate())}`
  }
  return undefined
}
