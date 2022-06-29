import { Alert, Heading } from '@navikt/ds-react'
import React, { useMemo } from 'react'

import { Gjennomforing, Tiltak } from '../../../../api/data/tiltak'
import globalStyles from '../../../../globals.module.scss'
import { finnTiltakGjennomforinger, finnUnikeTiltak } from '../../../../utils/tiltak-utils'
import styles from './GjennomforingListe.module.scss'
import { GjennomforingListePanel } from './GjennomforingListePanel'

interface GjennomforingListeProps {
	gjennomforinger: Gjennomforing[];
}

export const GjennomforingListe = (props: GjennomforingListeProps): React.ReactElement<GjennomforingListeProps> => {

	const unikeTiltak = useMemo<Tiltak[]>(() => {
		return finnUnikeTiltak(props.gjennomforinger)
	}, [ props.gjennomforinger ])

	if (props.gjennomforinger.length === 0) {
		return (
			<div>
				<Alert variant="info">For å se deltakere må du legge til en deltakerliste.</Alert>
			</div>
		)
	}

	return (
		<div className={styles.cleanList}>
			{unikeTiltak.map((tiltak, tiltakIdx) => {
				return (
					<div key={tiltakIdx} className={globalStyles.blokkL}>
						<Heading className={globalStyles.blokkS} size="xsmall" level="2">{tiltak.tiltaksnavn}</Heading>
						<ul className={styles.cleanList}>
							{finnTiltakGjennomforinger(tiltak.tiltakskode, props.gjennomforinger).map((gjennomforing) => {
								return (
									<li key={gjennomforing.id} className={globalStyles.blokkS}>
										<GjennomforingListePanel
											id={gjennomforing.id}
											navn={gjennomforing.navn}
										/>
									</li>
								)
							})}
						</ul>
					</div>
				)
			})}
		</div>
	)
}