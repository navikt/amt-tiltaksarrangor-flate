import { Alert, BodyShort } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'

import { Endringsmelding } from '../../../../../api/data/endringsmelding'
import { hentAlleEndringsmeldinger } from '../../../../../api/tiltak-api'
import { EndringsmeldingInnhold } from './EndringsmeldingInnhold'
import { EndringsmeldingPanel } from './EndringsmeldingPanel'
import { Deltaker } from '../../../../../api/data/deltaker'
import styles from './Endringsmeldinger.module.scss'
import { HistoriskeEndringsmeldinger } from './HistoriskeEndringsmeldinger'

interface EndringsmeldingerProps {
	deltaker: Deltaker
	setReloadEndringsmeldinger: (b: boolean) => void
	reloadEndringsmeldinger: boolean
}

export const Endringsmeldinger = ({
	deltaker,
	setReloadEndringsmeldinger,
	reloadEndringsmeldinger
}: EndringsmeldingerProps) => {
	const [ endringsmeldinger, setEndringsmeldinger ] = useState<Endringsmelding[]>(deltaker.aktiveEndringsmeldinger)
	const [ historiskeEndringsmeldinger, setHistoriskeEndringsmeldinger ] = useState<Endringsmelding[]>( deltaker.historiskeEndringsmeldinger || [] )
	const [ visfeilmelding, setVisFeilmelding ] = useState(false)

	useEffect(() => {
		if (!reloadEndringsmeldinger) return

		hentAlleEndringsmeldinger(deltaker.id)
			.then((res) => {
				setEndringsmeldinger( res.data.aktiveEndringsmeldinger )
				setHistoriskeEndringsmeldinger( res.data.historiskeEndringsmeldinger )
			})
			.catch(() => setVisFeilmelding(true))
			.finally(() => setReloadEndringsmeldinger(false))
	}, [ reloadEndringsmeldinger, deltaker, setReloadEndringsmeldinger ])

	return (
		<div className={ styles.endringsmeldinger }>
			{visfeilmelding && <Alert variant="error">Kunne ikke hente endringsmeldinger</Alert>}
			{ (endringsmeldinger.length > 0 || historiskeEndringsmeldinger.length > 0 ) &&
				<BodyShort size="small" className={ styles.endringsmeldingerTitle }>Sendt til NAV:</BodyShort> }
			{ endringsmeldinger.length > 0 &&
				<div className={ styles.panelWrapper }>
					{ endringsmeldinger?.map( melding =>
						<EndringsmeldingPanel
							endringsmelding={ melding }
							onEndringsmeldingTilbakekalt={ () => setReloadEndringsmeldinger( true ) }
							key={ melding.id }
						>
							<EndringsmeldingInnhold endringsmelding={ melding } />
						</EndringsmeldingPanel> ) }
				</div>
			}
			{ historiskeEndringsmeldinger.length > 0 && <HistoriskeEndringsmeldinger historiskeEndringsmeldinger={ historiskeEndringsmeldinger } />}
		</div>
	)
}
