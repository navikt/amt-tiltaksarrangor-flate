import { AdminDeltakerliste } from '../../../api/data/tiltak'
import { ArrangorOverenhet } from './deltakerliste.viewobjects'

export const deltakerlisteMapper = (
  adminDeltakerlister: AdminDeltakerliste[]
): ArrangorOverenhet[] => {
  const data: ArrangorOverenhet[] = []

  adminDeltakerlister.forEach((deltakerliste) => {
    if (!data.some((i) => i.navn === deltakerliste.arrangorNavn)) {
      data.push({ navn: deltakerliste.arrangorNavn, arrangorer: [] })
    }

    const overornetEnhet = data.find(
      (i) => i.navn === deltakerliste.arrangorNavn
    )

    if (overornetEnhet !== undefined) {
      if (
        !overornetEnhet.arrangorer.some(
          (i) => i.navn === deltakerliste.arrangorParentNavn
        )
      ) {
        overornetEnhet.arrangorer.push({
          id: deltakerliste.arrangorOrgnummer,
          navn: deltakerliste.arrangorParentNavn,
          deltakerlister: []
        })
      }

      const enhet = overornetEnhet.arrangorer.find(
        (i) => i.navn === deltakerliste.arrangorParentNavn
      )

      enhet?.deltakerlister.push({
        id: deltakerliste.id,
        navn: deltakerliste.navn,
        tiltaksnavn: deltakerliste.tiltaksnavn,
        startDato: deltakerliste.startDato,
        sluttDato: deltakerliste.sluttDato
      })
    }
  })

  return data
}
