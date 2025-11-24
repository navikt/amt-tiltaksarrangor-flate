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

export const skalOppgiSluttdato = (avslutningsType?: AvslutningsType) =>
    avslutningsType === AvslutningsType.FULLFORT ||
    avslutningsType === AvslutningsType.AVBRUTT

export const skalOppgiAarsak = (avslutningsType?: AvslutningsType) =>
    avslutningsType === AvslutningsType.AVBRUTT ||
    avslutningsType === AvslutningsType.IKKE_DELTATT

const valider = (sluttDato?: Date, aarsak?: DeltakerStatusAarsakType, aarsakBeskrivelse?: string, begrunnelse?: string, avslutningsType?: AvslutningsType) => {

    if (!avslutningsType) {
        return Promise.reject(
            'Kan ikke sende forslag uten at avslutningstype er satt'
        )
    }

    if (!sluttDato && skalOppgiSluttdato(avslutningsType)) {
        return Promise.reject('Kan ikke sende forslag uten at sluttdato er satt')
    }

    if (skalOppgiAarsak(avslutningsType)) {
        return validerAarsakForm(aarsak, aarsakBeskrivelse, begrunnelse)
    }

    return Promise.resolve()
}