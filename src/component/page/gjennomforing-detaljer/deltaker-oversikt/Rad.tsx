import { Table } from '@navikt/ds-react'
import React from 'react'
import { Link } from 'react-router-dom'

import { TiltakDeltaker } from '../../../../api/data/deltaker'
import { brukerDetaljerPageUrl } from '../../../../navigation'
import { klikkDeltakerRadOversikt, loggKlikk } from '../../../../utils/amplitude-utils'
import { lagKommaSeparertBrukerNavn } from '../../../../utils/bruker-utils'
import { formatDate } from '../../../../utils/date-utils'
import { Fnr } from '../../../felles/fnr/Fnr'
import { StatusMerkelapp } from '../../../felles/status-merkelapp/StatusMerkelapp'
import styles from './Rad.module.scss'

interface RadProps {
	idx: number;
	bruker: TiltakDeltaker;
}

export const Rad = (props: RadProps): React.ReactElement<RadProps> => {
	const {
		fodselsnummer,
		fornavn,
		etternavn,
		mellomnavn,
		id,
		startDato,
		sluttDato,
		registrertDato,
		status
	} = props.bruker

	return (
		<Table.Row key={id}>
			<Table.DataCell>
				<Link className={styles.brukersNavn} to={brukerDetaljerPageUrl(id)} onClick={() => loggKlikk(klikkDeltakerRadOversikt)}>
					{lagKommaSeparertBrukerNavn(fornavn, mellomnavn, etternavn)}
				</Link>
			</Table.DataCell>
			<Table.DataCell><Fnr fnr={fodselsnummer}/></Table.DataCell>
			<Table.DataCell>{formatDate(registrertDato)}</Table.DataCell>
			<Table.DataCell>{formatDate(startDato)}</Table.DataCell>
			<Table.DataCell>{formatDate(sluttDato)}</Table.DataCell>
			<Table.DataCell>
				<StatusMerkelapp status={status}/>
			</Table.DataCell>
		</Table.Row>
	)
}
