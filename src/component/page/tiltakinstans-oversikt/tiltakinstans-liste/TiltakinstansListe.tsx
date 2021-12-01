import { AlertStripeInfo } from 'nav-frontend-alertstriper'
import { Systemtittel } from 'nav-frontend-typografi'
import React, { useMemo } from 'react'

import { TiltakDTO } from '../../../../api/data/tiltak'
import { TiltakInstans } from '../../../../domeneobjekter/tiltak'
import globalStyles from '../../../../globals.module.less'
import { finnTiltakInstanser, finnUnikeTiltak } from '../../../../utils/tiltak-utils'
import { TiltakinstansOversiktPanel } from './tiltakinstans-oversikt-panel/TiltakinstansOversiktPanel'
import styles from './TiltaksinstansListe.module.less'

interface TiltakinstansListeProps {
	tiltakInstanser: TiltakInstans[];
}

export const TiltakinstansListe = (props: TiltakinstansListeProps): React.ReactElement<TiltakinstansListeProps> => {

	const unikeTiltak = useMemo<TiltakDTO[]>(() => {
		return finnUnikeTiltak(props.tiltakInstanser)
	}, [ props.tiltakInstanser ])

	if (props.tiltakInstanser.length === 0) {
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
							{finnTiltakInstanser(tiltak.tiltakskode, props.tiltakInstanser).map((tiltakInstans) => {
								return (
									<li key={tiltakInstans.id} className={globalStyles.blokkS}>
										<TiltakinstansOversiktPanel
											id={tiltakInstans.id}
											navn={tiltakInstans.navn}
											oppstart={tiltakInstans.oppstartdato}
											deltakere={tiltakInstans.deltagerAntall}
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