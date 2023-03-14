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
import { EndringsmeldingType } from '../../../api/data/endringsmelding'

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
		aktiveEndringsmeldinger,
	} = props.bruker

	const aktivSluttdato = aktiveEndringsmeldinger?.flatMap(e => {
		return e.type === EndringsmeldingType.FORLENG_DELTAKELSE || e.type === EndringsmeldingType.AVSLUTT_DELTAKELSE ? e.innhold.sluttdato : []
	})[0]
	const aktivStartdato = aktiveEndringsmeldinger?.flatMap(e => {
		return e.type === EndringsmeldingType.ENDRE_OPPSTARTSDATO || e.type === EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO ? e.innhold.oppstartsdato : []
	})[0]

	const startDatoTekst = aktivStartdato
		? formatDate(aktivStartdato) + '*'
		: formatDate(startDato)

	const sluttDatoTekst = aktivSluttdato
		? formatDate(aktivSluttdato) + '*'
		: formatDate(sluttDato)

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
