import { Table } from '@navikt/ds-react'
import React from 'react'
import { Link } from 'react-router-dom'

import { TiltakDeltaker } from '../../../../domeneobjekter/deltaker'
import { brukerDetaljerPageUrl } from '../../../../navigation'
import { lagKommaSeparertBrukerNavn } from '../../../../utils/bruker-utils'
import { formatDate } from '../../../../utils/date-utils'
import { mapTiltakDeltagerStatusTilTekst } from '../../../../utils/text-mappers'
import styles from './Rad.module.scss'

interface RadProps {
	idx: number;
	bruker: TiltakDeltaker;
}

export const Rad = (props: RadProps): React.ReactElement<RadProps> => {
	const { fodselsnummer, fornavn, etternavn, id, startDato, sluttDato, registrertDato, status } = props.bruker

	return (
		<Table.Row key={id}>
			<Table.DataCell>
				<Link className={styles.brukersNavn} to={brukerDetaljerPageUrl(id)}>
					{lagKommaSeparertBrukerNavn(fornavn, etternavn)}
				</Link>
			</Table.DataCell>
			<Table.DataCell>{fodselsnummer}</Table.DataCell>
			<Table.DataCell>{formatDate(startDato)}</Table.DataCell>
			<Table.DataCell>{formatDate(sluttDato)}</Table.DataCell>
			<Table.DataCell>{formatDate(registrertDato)}</Table.DataCell>
			<Table.DataCell>{mapTiltakDeltagerStatusTilTekst(status.type)}</Table.DataCell>
		</Table.Row>
	)
}
