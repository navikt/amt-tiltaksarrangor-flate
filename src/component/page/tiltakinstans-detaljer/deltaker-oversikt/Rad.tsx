import React from 'react'
import { Link } from 'react-router-dom'

import { TiltakDeltager } from '../../../../domeneobjekter/deltager'
import { useTiltaksoversiktSokStore } from '../../../../store/tiltaksoversikt-sok-store'
import { lagKommaSeparertBrukerNavn } from '../../../../utils/bruker-utils'
import { formatDate } from '../../../../utils/date-utils'
import { mapTiltakDeltagerStatusTilTekst } from '../../../../utils/text-mappers'
import styles from './Rad.module.less'
import { DeltakerKolonneNavn, DeltakerSortering } from './types'

interface RadProps {
	idx: number;
	bruker: TiltakDeltager;
}

const sortClassName = (name: DeltakerKolonneNavn, deltakerSortering?: DeltakerSortering): string | undefined => {
	if (!deltakerSortering || name !== deltakerSortering.kolonne) {
		return undefined
	}

	return 'tabell__td--sortert'
}

export const Rad = (props: RadProps): React.ReactElement<RadProps> => {
	const { fodselsnummer, fornavn, etternavn, id, oppstartdato, sluttdato, registrertDato, status } = props.bruker
	const { deltakerSortering } = useTiltaksoversiktSokStore()

	return (
		<tr key={id}>
			<td className={sortClassName(DeltakerTabellKolonne.NAVN, deltakerSortering)}>
				<Link className={styles.brukersNavn} to={`/user/${id}`}>
					{lagKommaSeparertBrukerNavn(fornavn, etternavn)}
				</Link>
			</td>
			<td className={sortClassName(DeltakerTabellKolonne.FODSELSNUMMER, deltakerSortering)}>{fodselsnummer}</td>
			<td className={sortClassName(DeltakerTabellKolonne.START, deltakerSortering)}>
				{oppstartdato && formatDate(oppstartdato)}
			</td>
			<td className={sortClassName(DeltakerTabellKolonne.SLUTT, deltakerSortering)}>
				{sluttdato && formatDate(sluttdato)}
			</td>
			<td className={sortClassName(DeltakerTabellKolonne.REGDATO, deltakerSortering)}>
				{formatDate(registrertDato)}
			</td>
			<td className={sortClassName(DeltakerTabellKolonne.STATUS, deltakerSortering)}>{mapTiltakDeltagerStatusTilTekst(status)}</td>
		</tr>
	)
}
