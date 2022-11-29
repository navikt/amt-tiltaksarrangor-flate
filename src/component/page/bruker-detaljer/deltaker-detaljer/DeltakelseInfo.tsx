import { BodyShort } from '@navikt/ds-react'
import React, { useState } from 'react'

import { DeltakerStatus, TiltakDeltakerDetaljer } from '../../../../api/data/deltaker'
import { formatDate } from '../../../../utils/date-utils'
import { StatusMerkelapp } from '../../../felles/status-merkelapp/StatusMerkelapp'
import styles from './DeltakelseInfo.module.scss'
import { ElementPanel } from './ElementPanel'
import { EndreDeltakelseKnapp } from './EndreDeltakelseKnapp'
import { Endringsmeldinger } from './endringsmelding/Endringsmeldinger'

interface DeltakelseInfoProps {
	erSkjermetPerson: boolean
	deltaker: TiltakDeltakerDetaljer
	status: DeltakerStatus
}

export const DeltakelseInfo = ({
	erSkjermetPerson,
	deltaker,
	status
}: DeltakelseInfoProps): React.ReactElement => {
	const [ key, setKey ] = useState<number>(0)

	const reInstansierEndringsmeldinger = () => {
		setKey((pk) => pk+1)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.section}>
				<div className={styles.header}>
					<ElementPanel tittel="Status:" className={styles.margin}>
						<StatusMerkelapp status={status}/>
					</ElementPanel>
					<EndreDeltakelseKnapp disabled={erSkjermetPerson} deltaker={deltaker} onEndringUtfort={reInstansierEndringsmeldinger}/>
				</div>
				<ElementPanel tittel="Dato:">
					<BodyShort size="small" >{formatDate(deltaker.startDato)} - {formatDate(deltaker.sluttDato)}</BodyShort>
				</ElementPanel>
				<Endringsmeldinger 
					deltakerId={deltaker.id} 
					key={key} 
					onEndringsmeldingTilbakekalt={reInstansierEndringsmeldinger}
				/>
			</div>
		</div>
	)
}
