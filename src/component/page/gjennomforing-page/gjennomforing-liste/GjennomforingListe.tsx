import { Alert, Heading } from '@navikt/ds-react'
import React, { useMemo } from 'react'

import { Gjennomforing, Tiltak } from '../../../../api/data/tiltak'
import globalStyles from '../../../../globals.module.scss'
import { sortAlphabeticAsc } from '../../../../utils/sortering-utils'
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
			<Alert variant="info" className={globalStyles.blokkM}>For å se deltakere må du legge til en deltakerliste.</Alert>
		)
	}

	return (
		<div className={styles.cleanList}>
			{unikeTiltak
				.sort((t1, t2) => sortAlphabeticAsc(t1.tiltaksnavn, t2.tiltaksnavn))
				.map((tiltak, tiltakIdx) => {
					return (
						<div key={tiltakIdx} className={globalStyles.blokkL}>
							<Heading className={globalStyles.blokkS} size="xsmall" level="2">{tiltak.tiltaksnavn}</Heading>
							<ul className={styles.cleanList}>
								{finnTiltakGjennomforinger(tiltak.tiltakskode, props.gjennomforinger)
									.sort((g1, g2) => sortAlphabeticAsc(g1.navn, g2.navn))
									.map((gjennomforing) => {
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