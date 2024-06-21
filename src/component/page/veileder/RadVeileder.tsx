import { Table } from '@navikt/ds-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { brukerDetaljerPageUrl } from '../../../navigation'
import { klikkDeltakerRadOversikt, loggKlikk } from '../../../utils/amplitude-utils'
import { lagKommaSeparertBrukerNavn } from '../../../utils/bruker-utils'
import { Fnr } from '../../felles/fnr/Fnr'
import { StatusMerkelapp } from '../../felles/status-merkelapp/StatusMerkelapp'
import styles from './RadVeileder.module.scss'
import { VeiledersDeltaker } from '../../../api/data/deltaker'
import { utledSluttdato, utledStartdato } from '../deltakerliste-detaljer/deltaker-oversikt/deltaker-tabell/Rad'
import { AdressebeskyttetModal } from './AdressebeskyttetModal.tsx'

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
		adressebeskyttet
	} = props.deltaker
	const navigate = useNavigate()
	const [ modalOpen, setModalOpen ] = useState(false)
	const brukernaavn = adressebeskyttet ? 'Adressebeskyttet' : lagKommaSeparertBrukerNavn(fornavn, mellomnavn, etternavn)

	const deltakerDetaljerPageUrl = brukerDetaljerPageUrl(id, 'veileder')

	const handleConfrimed = () => {
		setModalOpen(false)
		loggKlikk(klikkDeltakerRadOversikt)
		navigate(deltakerDetaljerPageUrl)
	}

	return (
		<Table.Row key={id}>
			<Table.DataCell>
				<Link className={styles.brukersNavn} to={deltakerDetaljerPageUrl} onClick={(e) => {
					if (adressebeskyttet) {
						e.preventDefault()
						setModalOpen(true)
					} else {
						loggKlikk(klikkDeltakerRadOversikt)
					}
				}}>
					{brukernaavn}
				</Link>
			</Table.DataCell>
			<Table.DataCell>
				{adressebeskyttet ? '' : <Fnr fnr={fodselsnummer} />}
			</Table.DataCell>
			<Table.DataCell>{utledStartdato(startDato, aktiveEndringsmeldinger)}</Table.DataCell>
			<Table.DataCell>{utledSluttdato(sluttDato, aktiveEndringsmeldinger)}</Table.DataCell>
			<Table.DataCell>
				<StatusMerkelapp status={status} />
			</Table.DataCell>
			{adressebeskyttet && <AdressebeskyttetModal open={modalOpen} handleCloseModal={() => setModalOpen(false)} handleConfrimed={handleConfrimed} />}
		</Table.Row>
	)
}
