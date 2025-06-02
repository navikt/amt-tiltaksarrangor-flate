export const BESKRIVELSE_MAKS_TEGN = 40
export const BEGRUNNELSE_MAKS_TEGN = 350

export const fjernUgyldigeTegn = (str: string) => {
    const ugyldigeTegnRegex =
        /[^a-zA-ZæøåÆØÅ0-9 \s.,@<>'`!"#$%&\/()\\=?*<;:>*§_-]/g

    const cleanText = str.replace(
        new RegExp(
            // NBSP, Narrow NBSP, ZWNBSP, Word Joiner, Zero-width space, ZWNJ, ZWJ
            '[\\u00A0\\u202F\\uFEFF\\u2060\\u200B\\u200C\\u200D]|' +
            ugyldigeTegnRegex.source,
            'g'
        ),
        (match) => {
            // NBSP (NonBreakingSace)og, Narrow NBSP
            if (match === '\u00A0' || match === '\u202F') return ' '
            return '' // Fjern alle andre tegn
        }
    )

    return cleanText
}
