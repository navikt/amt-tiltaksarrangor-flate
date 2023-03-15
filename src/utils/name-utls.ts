


export const nameString = (fornavn: string, mellomnavn: string | null, etternavn: string): string => {
    if(mellomnavn === null) {
        return fornavn + ' ' + etternavn
    } else {
        return fornavn + ' ' + mellomnavn + ' ' + etternavn
    }
}
