import { List } from '@navikt/ds-react'
import { Deltakelsesinnhold } from '../../../../api/data/deltaker'
import { INNHOLD_TYPE_ANNET } from '../../../../utils/deltaker-utils'

interface Props {
  deltakelsesinnhold: Deltakelsesinnhold
  className?: string
}

export const DeltakelseInnholdListe = ({
  deltakelsesinnhold,
  className
}: Props) => {
  return (
    <List as="ul" size="small" className={className ?? ''}>
      {deltakelsesinnhold.innhold
        .map((i) => (
          <List.Item key={i.innholdskode} className="mt-2 whitespace-pre-wrap">
            {i.innholdskode === INNHOLD_TYPE_ANNET ? i.beskrivelse : i.tekst}
          </List.Item>
        ))}
    </List>
  )
}
