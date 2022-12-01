import { Alert } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'

import { Endringsmelding } from '../../../../../api/data/endringsmelding'
import { hentEndringsmeldinger } from '../../../../../api/tiltak-api'
import { EndringsmeldingInnhold } from './EndringsmeldingInnhold'
import { EndringsmeldingPanel } from './EndringsmeldingPanel'

interface EndringsmeldingerProps {
	deltakerId: string
	setReloadEndringsmeldinger: (b: boolean) => void
	reloadEndringsmeldinger: boolean
}

export const Endringsmeldinger = ({
	deltakerId,
	setReloadEndringsmeldinger,
	reloadEndringsmeldinger
}: EndringsmeldingerProps) => {
	const [ endringsmeldinger, setEndringsmeldinger ] = useState<Endringsmelding[]>()
	const [ visfeilmelding, setVisFeilmelding ] = useState(false)

	useEffect(() => {
		if (!reloadEndringsmeldinger) return

		hentEndringsmeldinger(deltakerId)
			.then((res) => setEndringsmeldinger(res.data))
			.catch(() => setVisFeilmelding(true))
			.finally(() => setReloadEndringsmeldinger(false))
	}, [ reloadEndringsmeldinger, deltakerId, setReloadEndringsmeldinger ])

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
