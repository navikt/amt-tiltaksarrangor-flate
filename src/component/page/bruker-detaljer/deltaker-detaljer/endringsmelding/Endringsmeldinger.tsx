import { Alert } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'

import { Endringsmelding } from '../../../../../api/data/endringsmelding'
import { hentEndringsmeldinger } from '../../../../../api/tiltak-api'
import styles from './Endringsmeldinger.module.scss'
import { EndringsmeldingInnhold } from './EndringsmeldingInnhold'
import { EndringsmeldingPanel } from './EndringsmeldingPanel'

interface EndringsmeldingerProps {
	deltakerId: string
	onEndringsmeldingTilbakekalt: () => void
}

export const Endringsmeldinger = ({ deltakerId, onEndringsmeldingTilbakekalt }: EndringsmeldingerProps) => {
	const [ endringsmeldinger, setEndringsmeldinger ] = useState<Endringsmelding[]>()
	const [ visfeilmelding, setVisFeilmelding ] = useState(false)

	useEffect(() => {
		let isMounted = true
		hentEndringsmeldinger(deltakerId)
			.then((res) => {
				if (isMounted) {
					setEndringsmeldinger(res.data)
				}
			})
			.catch(() => {
				if (isMounted) {
					setVisFeilmelding(true)
				}
			})
		return () => { isMounted = false }
	}, [ deltakerId ])

	return (
		<>
			{visfeilmelding && <Alert variant="error">Kunne ikke hente endringsmeldinger</Alert>}
			{endringsmeldinger && (
				<div className={styles.endringsmeldinger}>
					{endringsmeldinger.map(melding =>
						<EndringsmeldingPanel endringsmelding={melding} onEndringsmeldingTilbakekalt={onEndringsmeldingTilbakekalt} key={melding.id}>
							<EndringsmeldingInnhold endringsmelding={melding} />
						</EndringsmeldingPanel>)}
				</div>
			)}
		</>
	)
}

