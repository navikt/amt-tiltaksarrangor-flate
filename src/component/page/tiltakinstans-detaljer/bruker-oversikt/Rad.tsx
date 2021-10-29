import React from 'react'
import { Link } from 'react-router-dom'

import { TiltakDeltager } from '../../../../domeneobjekter/deltager'
import { lagKommaSeparertBrukerNavn } from '../../../../utils/bruker-utils'
import { formatDate } from '../../../../utils/date-utils'
import { mapTiltakDeltagerStatusTilTekst } from '../../../../utils/text-mappers'
import { BrukerSortering, Kolonnenavn } from './types'

interface RadProps {
	idx: number;
	bruker: TiltakDeltager;
	brukerSortering?: BrukerSortering;
}

const sortClassName = (name: Kolonnenavn, brukerSortering?: BrukerSortering): string | undefined => {
	if (!brukerSortering || name !== brukerSortering.kolonnenavn) {
		return undefined
	}

	return 'tabell__td--sortert'
}

export const Rad = (props: RadProps): React.ReactElement<RadProps> => {
	const { fodselsnummer, fornavn, etternavn, id, startdato, sluttdato, status } = props.bruker
	const userSort = props.brukerSortering

	return (
		<tr key={id}>
			<td className={sortClassName(Kolonnenavn.NAVN, userSort)}>
				<Link to={`/user/${id}`}>
					{lagKommaSeparertBrukerNavn(fornavn, etternavn)}
				</Link>
			</td>
			<td className={sortClassName(Kolonnenavn.FODSELSNUMMER, userSort)}>{fodselsnummer}</td>
			<td className={sortClassName(Kolonnenavn.START, userSort)}>
				{startdato && formatDate(startdato)}
			</td>
			<td className={sortClassName(Kolonnenavn.SLUTT, userSort)}>
				{sluttdato && formatDate(sluttdato)}
			</td>
			<td className={sortClassName(Kolonnenavn.STATUS, userSort)}>{mapTiltakDeltagerStatusTilTekst(status)}</td>
		</tr>
	)
}
