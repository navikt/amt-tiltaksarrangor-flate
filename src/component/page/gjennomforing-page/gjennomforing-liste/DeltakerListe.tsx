import { Alert } from '@navikt/ds-react'
import React, { useMemo } from 'react'

import globalStyles from '../../../../globals.module.scss'
import { sortAlphabeticAsc } from '../../../../utils/sortering-utils'
import styles from './DeltakerListe.module.scss'
import { GjennomforingListePanel } from './GjennomforingListePanel'
import { TiltakSection } from './TiltakSection'
import { Deltakerliste } from '../../../../api/data/deltaker'
import { finnDeltakerlister, finnUnikeTiltakstyper } from '../../../../utils/deltakerliste-utils'

interface DeltakerListeProps {
	deltakerliste: Deltakerliste[];
}

export const DeltakerListe = (props: DeltakerListeProps): React.ReactElement<DeltakerListeProps> => {
	const unikeTiltakstyper = useMemo<string[]>(() => {
		return finnUnikeTiltakstyper(props.deltakerliste)
	}, [ props.deltakerliste ])

	const sorterteTiltakstyper = unikeTiltakstyper
		.sort((t1, t2) => sortAlphabeticAsc(t1, t2))

	if (props.deltakerliste.length === 0) {
		return (
			<Alert variant="info" className={globalStyles.blokkM}>For å se deltakere må du legge til en deltakerliste.</Alert>
		)
	}

	return (
		<div className={styles.cleanList}>
			{sorterteTiltakstyper
				.map((tiltakstype, tiltakstypeIdx) => {
					return (
						<TiltakSection key={tiltakstypeIdx} navn={tiltakstype}>
							{finnDeltakerlister(tiltakstype, props.deltakerliste)
								.sort((d1, d2) => sortAlphabeticAsc(d1.navn, d2.navn))
								.map((dl) => {
									return (
										<GjennomforingListePanel
											key={dl.id}
											id={dl.id}
											navn={dl.navn}
										/>
									)
								})}
						</TiltakSection>
					)
				})}
		</div>
	)
}
