import { useEffect, useState } from 'react'
import { DeltakerStatusAarsakType } from '../../../../../../api/data/endringsmelding'
import { EndringAarsak } from '../../../../../../api/data/forslag'
import { BEGRUNNELSE_MAKS_TEGN } from '../../../../../../utils/endre-deltaker-utils'
import { aarsakTekstMapper } from '../../tekst-mappers'

type ValidertAarsakForm = {
  endringsmelding: {
    aarsak: {
      type: DeltakerStatusAarsakType
      beskrivelse: string | null
    }
  }
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
      endringsmelding: {
        aarsak: {
          type: aarsak,
          beskrivelse: beskrivelse ?? null
        }
      },
      forslag: {
        aarsak: toEndringAarsakType(aarsak, beskrivelse),
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

function toEndringAarsakType(
  aarsak: DeltakerStatusAarsakType,
  beskrivelse: string | undefined | null
): EndringAarsak {
  switch (aarsak) {
    case DeltakerStatusAarsakType.SYK:
      return { type: 'Syk' }
    case DeltakerStatusAarsakType.FATT_JOBB:
      return { type: 'FattJobb' }
    case DeltakerStatusAarsakType.TRENGER_ANNEN_STOTTE:
      return { type: 'TrengerAnnenStotte' }
    case DeltakerStatusAarsakType.UTDANNING:
      return { type: 'Utdanning' }
    case DeltakerStatusAarsakType.IKKE_MOTT:
      return { type: 'IkkeMott' }
    case DeltakerStatusAarsakType.ANNET: {
      if (!beskrivelse) {
        throw new Error('Beskrivelse mangler for Annet')
      }
      return { type: 'Annet', beskrivelse: beskrivelse }
    }
    default:
      throw new Error(`Kan ikke konvertere ${aarsak} til EndringsAarsakType`)
  }
}
