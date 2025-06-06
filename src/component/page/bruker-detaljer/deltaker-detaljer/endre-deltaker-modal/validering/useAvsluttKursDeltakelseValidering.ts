import { useEffect, useState } from 'react'
import { AvslutningsType } from '../AvsluttKursDeltakelseModal'
import { validerAarsakForm } from './aarsakValidering'
import { DeltakerStatusAarsakType } from '../../../../../../api/data/deltakerStatusArsak'

type ValideringState = {
    isSuccess: boolean
    feilmelding: string | null
}

export function useAvsluttKursDeltakelseValidering(
    avslutningsType?: AvslutningsType,
    sluttDato?: Date,
    aarsak?: DeltakerStatusAarsakType,
    aarsakBeskrivelse?: string,
    begrunnelse?: string
) {
    const [validering, setValidering] = useState<ValideringState>({
        isSuccess: false,
        feilmelding: null
    })

    useEffect(() => {
        valider(sluttDato, aarsak, aarsakBeskrivelse, begrunnelse, avslutningsType )
            .then(() => setValidering({isSuccess: true, feilmelding: null}))
            .catch((error) => {
                setValidering({isSuccess: false, feilmelding: error})
            })
    }, [avslutningsType, sluttDato, aarsak, aarsakBeskrivelse, begrunnelse])

    return {validering}
}

const valider = (sluttDato?: Date, aarsak?: DeltakerStatusAarsakType, aarsakBeskrivelse?: string, begrunnelse?: string, avslutningsType?: AvslutningsType) => {

    if (!avslutningsType) {
        return Promise.reject(
            'Kan ikke sende forslag uten at avslutningstype er satt'
        )
    }

    if (!sluttDato &&
        (avslutningsType === AvslutningsType.FULLFORT ||
            avslutningsType === AvslutningsType.AVBRUTT)
    ) {
        return Promise.reject('Kan ikke sende forslag uten at sluttdato er satt')
    }

    if(avslutningsType !== AvslutningsType.FULLFORT) {
        return validerAarsakForm(aarsak, aarsakBeskrivelse, begrunnelse)
    }

    return Promise.resolve()
}