import { BEGRUNNELSE_MAKS_TEGN } from '../../../../../../utils/endre-deltaker-utils'

export function validerObligatoriskBegrunnelse(begrunnelse: string) {
  return new Promise((resolve, reject) => {
    if (begrunnelse === '') {
      return reject('Begrunnelse mangler')
    }
    if (begrunnelse.length > BEGRUNNELSE_MAKS_TEGN) {
      return reject('Begrunnelsen kan ikke være over 200 tegn')
    }
    resolve(begrunnelse)
  })
}

export function gyldigObligatoriskBegrunnelse(begrunnelse: string) {
  return begrunnelse !== '' && begrunnelse.length <= BEGRUNNELSE_MAKS_TEGN
}
