import { Table } from '@navikt/ds-react'
import React from 'react'
import { Link } from 'react-router-dom'

import { TiltakDeltaker } from '../../../../domeneobjekter/deltaker'
import { lagKommaSeparertBrukerNavn } from '../../../../utils/bruker-utils'
import { formatDate } from '../../../../utils/date-utils'
import { mapTiltakDeltagerStatusTilTekst } from '../../../../utils/text-mappers'
import { internalUrl } from '../../../../utils/url-utils'
import styles from './Rad.module.scss'

interface RadProps {
	idx: number;
	bruker: TiltakDeltaker;
}

export const Rad = (props: RadProps): React.ReactElement<RadProps> => {
	const { fodselsnummer, fornavn, etternavn, id, oppstartdato, sluttdato, registrertDato, status } = props.bruker

	return (
		<Table.Row key={id}>
			<Table.DataCell>
				<Link className={styles.brukersNavn} to={internalUrl(`/user/${id}`)}>
					{lagKommaSeparertBrukerNavn(fornavn, etternavn)}
				</Link>
			</Table.DataCell>
			<Table.DataCell>{fodselsnummer}</Table.DataCell>
			<Table.DataCell>{formatDate(oppstartdato)}</Table.DataCell>
			<Table.DataCell>{formatDate(sluttdato)}</Table.DataCell>
			<Table.DataCell>{formatDate(registrertDato)}</Table.DataCell>
			<Table.DataCell>{mapTiltakDeltagerStatusTilTekst(status)}</Table.DataCell>
		</Table.Row>
	)
}
