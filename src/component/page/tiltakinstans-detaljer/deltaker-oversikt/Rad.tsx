import React from 'react'
import { Link } from 'react-router-dom'

import { TiltakDeltaker } from '../../../../domeneobjekter/deltaker'
import { useTiltaksoversiktSokStore } from '../../../../store/tiltaksoversikt-sok-store'
import { lagKommaSeparertBrukerNavn } from '../../../../utils/bruker-utils'
import { formatDate } from '../../../../utils/date-utils'
import { mapTiltakDeltagerStatusTilTekst } from '../../../../utils/text-mappers'
import styles from './Rad.module.less'
import { DeltakerKolonneNavn, DeltakerSortering } from './types'

interface RadProps {
	idx: number;
	bruker: TiltakDeltaker;
}

export const Rad = (props: RadProps): React.ReactElement<RadProps> => {
	const { fodselsnummer, fornavn, etternavn, id, oppstartdato, sluttdato, registrertDato, status } = props.bruker

	return (
		<tr key={id}>
			<td>
				<Link className={styles.brukersNavn} to={`/user/${id}`}>
					{lagKommaSeparertBrukerNavn(fornavn, etternavn)}
				</Link>
			</td>
			<td>{fodselsnummer}</td>
			<td>{oppstartdato && formatDate(oppstartdato)}</td>
			<td>{sluttdato && formatDate(sluttdato)}</td>
			<td>{formatDate(registrertDato)}</td>
			<td>{mapTiltakDeltagerStatusTilTekst(status)}</td>
		</tr>
	)
}
