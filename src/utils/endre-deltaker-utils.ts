export const BESKRIVELSE_MAKS_TEGN = 40
export const BEGRUNNELSE_MAKS_TEGN = 350

export const fjernUgyldigeTegn = (str: string) => {
    const ugyldigeTegnRegex =
        /[^a-zA-ZæøåÆØÅ0-9 \s.,@<>'`!"#$%&\/()\\=?*<;:>*§_-]/g
    const stringUtenNonBreakingSace = str.replace(/\u00A0/g, ' ')
    const stringUtenZeroWidthNonBreakingSace = stringUtenNonBreakingSace.replace(/\uFEFF/g, '')
    return stringUtenZeroWidthNonBreakingSace.replace(ugyldigeTegnRegex, '')
}
