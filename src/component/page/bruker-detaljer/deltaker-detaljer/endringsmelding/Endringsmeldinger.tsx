import { Alert } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'

import { Endringsmelding } from '../../../../../api/data/endringsmelding'
import { hentEndringsmeldinger } from '../../../../../api/tiltak-api'
import styles from './Endringsmeldinger.module.scss'
import { EndringsmeldingInnhold } from './EndringsmeldingInnhold'
import { EndringsmeldingPanel } from './EndringsmeldingPanel'

interface EndringsmeldingerProps {
	deltakerId: string
}

export const Endringsmeldinger = ({ deltakerId }: EndringsmeldingerProps) => {
	const [ endringsmeldinger, setEndringsmeldinger ] = useState<Endringsmelding[]>()
	const [ visfeilmelding, setVisFeilmelding ] = useState(false)

	useEffect(() => {
		hentEndringsmeldinger(deltakerId)
			.then((res) => res.data.length>0? setEndringsmeldinger(res.data): undefined)
			.catch(() => setVisFeilmelding(true))
	}, [ deltakerId ])

	return (
		<>
			{visfeilmelding && <Alert variant="error">Kunne ikke hente endringsmeldinger</Alert> }
			{endringsmeldinger && (
				<div className={styles.endringsmeldinger}>
					{endringsmeldinger.map(melding =>
						<EndringsmeldingPanel endringsmelding={ melding } key={melding.id}>
							<EndringsmeldingInnhold endringsmelding={ melding }/>
						</EndringsmeldingPanel>)}
				</div>
			)}
		</>

	)
}