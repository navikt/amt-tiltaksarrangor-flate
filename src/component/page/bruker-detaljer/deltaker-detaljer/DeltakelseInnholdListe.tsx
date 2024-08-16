import { List } from '@navikt/ds-react'
import { DeltakelsesInnhold } from '../../../../api/data/deltaker'


interface Props {
	deltakelsesinnhold: DeltakelsesInnhold
	className?: string
}

export const DeltakelseInnholdListe = ({
	deltakelsesinnhold,
	className
}: Props) => {
	// 'annet' i konstant
	return (
		<List as="ul" size="small" className={className ?? ''}>
			{deltakelsesinnhold.innhold
				.filter((i) => i.valgt)
				.map((i) => (
					<List.Item key={i.innholdskode} className="mt-2 whitespace-pre-wrap">
						{i.innholdskode === 'annet' ? i.beskrivelse : i.tekst}
					</List.Item>
				))}
		</List>
	)
}
