import React from 'react'
import { Link } from 'react-router-dom'

import { TiltakDeltaker } from '../../../../domeneobjekter/deltaker'
import { lagKommaSeparertBrukerNavn } from '../../../../utils/bruker-utils'
import { formatDate } from '../../../../utils/date-utils'
import { mapTiltakDeltagerStatusTilTekst } from '../../../../utils/text-mappers'
import { internalUrl } from '../../../../utils/url-utils'
import styles from './Rad.module.less'

interface RadProps {
	idx: number;
	bruker: TiltakDeltaker;
}

export const Rad = (props: RadProps): React.ReactElement<RadProps> => {
	const { fodselsnummer, fornavn, etternavn, id, oppstartdato, sluttdato, registrertDato, status } = props.bruker

	return (
		<tr key={id}>
			<td>
				<Link className={styles.brukersNavn} to={internalUrl(`/user/${id}`)}>
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
