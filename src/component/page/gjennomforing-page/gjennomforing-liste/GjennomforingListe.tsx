import { AlertStripeInfo } from 'nav-frontend-alertstriper'
import { Systemtittel } from 'nav-frontend-typografi'
import React, { useMemo } from 'react'

import { TiltakDTO } from '../../../../api/data/tiltak'
import { Gjennomforing } from '../../../../domeneobjekter/tiltak'
import globalStyles from '../../../../globals.module.less'
import { finnTiltakGjennomforinger, finnUnikeTiltak } from '../../../../utils/tiltak-utils'
import styles from './GjennomforingListe.module.less'
import { GjennomforingListePanel } from './GjennomforingListePanel'

interface GjennomforingListeProps {
	gjennomforinger: Gjennomforing[];
}

export const GjennomforingListe = (props: GjennomforingListeProps): React.ReactElement<GjennomforingListeProps> => {

	const unikeTiltak = useMemo<TiltakDTO[]>(() => {
		return finnUnikeTiltak(props.gjennomforinger)
	}, [ props.gjennomforinger ])

	if (props.gjennomforinger.length === 0) {
		return (
			<div>
				<AlertStripeInfo>Ingen tiltak</AlertStripeInfo>
			</div>
		)
	}

	return (
		<ul className={styles.cleanList}>
			{unikeTiltak.map((tiltak, tiltakIdx) => {
				return (
					<li key={tiltakIdx} className={globalStyles.blokkL}>
						<Systemtittel className={globalStyles.blokkM}>{tiltak.tiltaksnavn}</Systemtittel>
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
					</li>
				)
			})}
		</ul>
	)
}