import React, { useEffect, useState } from 'react'

import { TiltakDeltaker } from '../../../../api/data/deltaker'
import globalStyles from '../../../../globals.module.scss'
import { useDeltakerSorteringContext } from '../../../../store/DeltakerSorteringContextProvider'
import { finnNesteSortering } from '../../../../utils/sortering-utils'
import { AlertInfoMessage } from '../../../felles/alert-info-message/AlertInfoMessage'
import { useKoordinatorFilterContext } from '../store/KoordinatorFilterContextProvider'
import { DeltakerTabell } from './deltaker-tabell/DeltakerTabell'
import { sorterDeltakere } from './deltaker-tabell/sortering'
import styles from './DeltakerOversiktTabell.module.scss'
import { IngenDeltakereAlertstripe } from './IngenDeltakereAlertstripe'
import {
	AlertInfoMessageSoktInnVurderes
} from '../../../felles/alert-info-message/sokt-inn-vurderes/AlertInfoMessageSoktInnVurderes'
import { Tiltakskode } from '../../../../api/data/tiltak'
import { useFeatureToggle } from '../../../../hooks/useFeatureToggle'

interface DeltakerOversiktTabellProps {
	deltakere: TiltakDeltaker[],
	tiltakstype?: Tiltakskode
}

export const DeltakerOversiktTabell = (
	props: DeltakerOversiktTabellProps
): React.ReactElement<DeltakerOversiktTabellProps> => {
	const { deltakere, tiltakstype } = props
	const { filtrerDeltakere, veilederFilter, medveilederFilter, statusFilter, hendelseFilter } =
		useKoordinatorFilterContext()
	const { deltakerSortering, setDeltakerSortering } =
		useDeltakerSorteringContext()
	const [ deltakereBearbeidet, setDeltakereBearbeidet ] = useState<
		TiltakDeltaker[]
	>(sorterDeltakere(deltakere, deltakerSortering))
  const { visInfomeldingSoktInnVurderes } = useFeatureToggle()

  useEffect(() => {
		if (!deltakere) return
		const filtrerteDeltakere = filtrerDeltakere(deltakere)
		const sortert = sorterDeltakere(filtrerteDeltakere, deltakerSortering)
		setDeltakereBearbeidet(sortert)
	}, [
		deltakere,
		filtrerDeltakere,
		deltakerSortering,
		veilederFilter,
		medveilederFilter,
		statusFilter,
		hendelseFilter
	])

	const handleOnSortChange = (sortKey: string | undefined) => {
		setDeltakerSortering((prevSort) => finnNesteSortering(sortKey, prevSort))
	}

	return (
		<div className={styles.tableWrapper}>
			<AlertInfoMessage/>
      { visInfomeldingSoktInnVurderes && tiltakstype === Tiltakskode.GRUPPEAMO && (
			    <AlertInfoMessageSoktInnVurderes/>
        )
      }

			{deltakere.length === 0 ? (
				<IngenDeltakereAlertstripe/>
			) : (
				<>
					<DeltakerTabell
						deltakere={deltakereBearbeidet}
						sortering={deltakerSortering}
						onSortChange={handleOnSortChange}
					/>
					<div
						aria-live="polite"
						aria-atomic="true"
						className={globalStyles.screenReaderOnly}
					>
						Viser {deltakereBearbeidet.length} av {deltakere.length} deltakere.
					</div>
				</>
			)}
		</div>
	)
}
