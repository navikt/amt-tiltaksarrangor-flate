import { Alert } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'

import { Endringsmelding } from '../../../../../api/data/endringsmelding'
import { hentEndringsmeldinger } from '../../../../../api/tiltak-api'
import { EndringsmeldingInnhold } from './EndringsmeldingInnhold'
import { EndringsmeldingPanel } from './EndringsmeldingPanel'
import { Deltaker } from '../../../../../api/data/deltaker'

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
	const [ visfeilmelding, setVisFeilmelding ] = useState(false)

	useEffect(() => {
		if (!reloadEndringsmeldinger) return

		hentEndringsmeldinger(deltaker.id)
			.then((res) => setEndringsmeldinger(res.data))
			.catch(() => setVisFeilmelding(true))
			.finally(() => setReloadEndringsmeldinger(false))
	}, [ reloadEndringsmeldinger, deltaker, setReloadEndringsmeldinger ])

	return (
		<>
			{visfeilmelding && <Alert variant="error">Kunne ikke hente endringsmeldinger</Alert>}
			{ endringsmeldinger &&
				endringsmeldinger?.map(melding =>
					<EndringsmeldingPanel
						endringsmelding={melding}
						onEndringsmeldingTilbakekalt={() => setReloadEndringsmeldinger(true)}
						key={melding.id}
					>
						<EndringsmeldingInnhold endringsmelding={melding} />
					</EndringsmeldingPanel>)
			}
		</>
	)
}
