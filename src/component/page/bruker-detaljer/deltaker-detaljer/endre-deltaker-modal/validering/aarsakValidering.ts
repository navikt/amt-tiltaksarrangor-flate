import { useEffect, useState } from 'react'
import {EndringAarsak, ForslagEndringAarsakType} from '../../../../../../api/data/forslag'
import { BEGRUNNELSE_MAKS_TEGN } from '../../../../../../utils/endre-deltaker-utils'
import { aarsakTekstMapper } from '../../tekst-mappers'
import { DeltakerStatusAarsakType } from '../../../../../../api/data/deltakerStatusArsak'

type ValidertAarsakForm = {
  forslag: {
    aarsak: EndringAarsak
    begrunnelse: string | undefined
  }
}

export function validerAarsakForm(
  aarsak?: DeltakerStatusAarsakType,
  beskrivelse?: string | null,
  begrunnelse?: string
): Promise<ValidertAarsakForm> {
  return new Promise((resolve, reject) => {
    if (!aarsak) {
      return reject('Årsak er påkrevd')
    }
    if (aarsak === DeltakerStatusAarsakType.ANNET && !beskrivelse) {
      return reject(
        `Beskrivelse er påkrevd med årsak '${aarsakTekstMapper(aarsak)}'`
      )
    }
    if (
      aarsak === DeltakerStatusAarsakType.ANNET &&
      beskrivelse &&
      beskrivelse.length > 40
    ) {
      return reject(
        `Beskrivelse kan ikke være mer enn 40 tegn med årsak '${aarsakTekstMapper(aarsak)}'`
      )
    }
    if (begrunnelse && begrunnelse.length > BEGRUNNELSE_MAKS_TEGN) {
      return reject(
        `Begrunnelse kan ikke være lengre enn ${BEGRUNNELSE_MAKS_TEGN} tegn`
      )
    }
    return resolve({
      forslag: {
        aarsak: toEndringAarsakType(aarsak, beskrivelse)!,
        begrunnelse: begrunnelse
      }
    })
  })
}

type ValideringState = {
  isSuccess: boolean
  feilmelding: string | null
}

export function useAarsakValidering(
  aarsak?: DeltakerStatusAarsakType,
  beskrivelse?: string | null,
  begrunnelse?: string
) {
  const [validering, setValidering] = useState<ValideringState>({
    isSuccess: false,
    feilmelding: null
  })
  const [validertForm, setValidertForm] = useState<ValidertAarsakForm>()

  useEffect(() => {
    validerAarsakForm(aarsak, beskrivelse, begrunnelse)
      .then((validertForm) => {
        setValidering({ isSuccess: true, feilmelding: null })
        setValidertForm(validertForm)
      })
      .catch((error) => {
        setValidering({ isSuccess: false, feilmelding: error })
        setValidertForm(undefined)
      })
  }, [aarsak, beskrivelse, begrunnelse])

  return { validering, validertForm }
}

export function toEndringAarsakType(
  aarsak?: DeltakerStatusAarsakType,
  beskrivelse?: string | null
): EndringAarsak | null {
  switch (aarsak) {
    case DeltakerStatusAarsakType.SYK:
      return { type: ForslagEndringAarsakType.Syk }
    case DeltakerStatusAarsakType.FATT_JOBB:
      return { type: ForslagEndringAarsakType.FattJobb }
    case DeltakerStatusAarsakType.TRENGER_ANNEN_STOTTE:
      return { type: ForslagEndringAarsakType.TrengerAnnenStotte }
    case DeltakerStatusAarsakType.UTDANNING:
      return { type: ForslagEndringAarsakType.Utdanning }
    case DeltakerStatusAarsakType.IKKE_MOTT:
      return { type: ForslagEndringAarsakType.IkkeMott }
    case DeltakerStatusAarsakType.ANNET: {
      if (!beskrivelse) {
        throw new Error('Beskrivelse mangler for Annet')
      }
      return { type: ForslagEndringAarsakType.Annet, beskrivelse: beskrivelse }
    }
    default: return null
  }
}
