import { Table } from '@navikt/ds-react'
import React from 'react'
import { Link } from 'react-router-dom'

import { brukerDetaljerPageUrl } from '../../../navigation'
import { klikkDeltakerRadOversikt, loggKlikk } from '../../../utils/amplitude-utils'
import { lagKommaSeparertBrukerNavn } from '../../../utils/bruker-utils'
import { Fnr } from '../../felles/fnr/Fnr'
import { StatusMerkelapp } from '../../felles/status-merkelapp/StatusMerkelapp'
import styles from './RadVeileder.module.scss'
import { VeiledersDeltaker } from '../../../api/data/deltaker'
import { utledSluttdato, utledStartdato } from '../deltakerliste-detaljer/deltaker-oversikt/deltaker-tabell/Rad'

interface RadProps {
	idx: number;
	deltaker: VeiledersDeltaker;
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
		aktiveEndringsmeldinger,
	} = props.deltaker

	return (
		<Table.Row key={id}>
			<Table.DataCell>
				<Link className={styles.brukersNavn} to={brukerDetaljerPageUrl(id, 'veileder')} onClick={() => loggKlikk(klikkDeltakerRadOversikt)}>
					{lagKommaSeparertBrukerNavn(fornavn, mellomnavn, etternavn)}
				</Link>
			</Table.DataCell>
			<Table.DataCell><Fnr fnr={fodselsnummer} /></Table.DataCell>
			<Table.DataCell>{utledStartdato(startDato, aktiveEndringsmeldinger)}</Table.DataCell>
			<Table.DataCell>{utledSluttdato(sluttDato, aktiveEndringsmeldinger)}</Table.DataCell>
			<Table.DataCell>
				<StatusMerkelapp status={status} />
			</Table.DataCell>
		</Table.Row>
	)
}
