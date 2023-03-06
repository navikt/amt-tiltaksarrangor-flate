import { Table } from '@navikt/ds-react'
import React from 'react'
import { Link } from 'react-router-dom'

import { brukerDetaljerPageUrl } from '../../../navigation'
import { klikkDeltakerRadOversikt, loggKlikk } from '../../../utils/amplitude-utils'
import { lagKommaSeparertBrukerNavn } from '../../../utils/bruker-utils'
import { formatDate } from '../../../utils/date-utils'
import { Fnr } from '../../felles/fnr/Fnr'
import { StatusMerkelapp } from '../../felles/status-merkelapp/StatusMerkelapp'
import styles from './RadVeileder.module.scss'
import { VeiledersDeltaker } from '../../../api/data/deltaker'

interface RadProps {
	idx: number;
	bruker: VeiledersDeltaker;
}

export const RadVeileder = (props: RadProps): React.ReactElement<RadProps> => {
	const {
		fodselsnummer,
		fornavn,
		etternavn,
		mellomnavn,
		id,
		startDato,
		sluttDato,
		status,
	} = props.bruker

	const startDatoTekst = formatDate(startDato)

	const sluttDatoTekst = formatDate(sluttDato)

	return (
		<Table.Row key={id}>
			<Table.DataCell>
				<Link className={styles.brukersNavn} to={brukerDetaljerPageUrl(id)} onClick={() => loggKlikk(klikkDeltakerRadOversikt)}>
					{lagKommaSeparertBrukerNavn(fornavn, mellomnavn, etternavn)}
				</Link>
			</Table.DataCell>
			<Table.DataCell><Fnr fnr={fodselsnummer} /></Table.DataCell>
			<Table.DataCell>{startDatoTekst}</Table.DataCell>
			<Table.DataCell>{sluttDatoTekst}</Table.DataCell>
			<Table.DataCell>
				<StatusMerkelapp status={status} />
			</Table.DataCell>
		</Table.Row>
	)
}
