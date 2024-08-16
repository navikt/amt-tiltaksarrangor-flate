import { Heading, ReadMore } from '@navikt/ds-react'
import React from 'react'

interface Props {
	tittel: string
	icon: React.ReactNode
	forslag?: React.ReactNode
	children: React.ReactNode
}

export const HistorikkElement = ({
	tittel,
	icon,
	forslag,
	children
}: Props) => {
	return (
		<div
			className="grid gap-2"
			style={{
				gridTemplateColumns: '1.25rem auto'
			}}
		>
			<div className="mt-3 text-xl" aria-hidden>
				{icon}
			</div>

			<div className="pt-2">
				<Heading level="2" size="small" className="mb-1">
					{tittel}
				</Heading>
				{children}
			</div>

			{forslag && (
				<ReadMore
					size="small"
					header="Forslaget fra arrangør"
					className="mt-1mb-1"
				>
					{forslag}
				</ReadMore>
			)}
		</div>
	)
}
