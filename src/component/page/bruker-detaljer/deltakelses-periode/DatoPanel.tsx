import { Calender } from '@navikt/ds-icons'
import { BodyShort, Button, Heading } from '@navikt/ds-react'
import React from 'react'

import globalStyles from '../../../../globals.module.scss'
import { formatDate } from '../../../../utils/date-utils'
import { Nullable } from '../../../../utils/types/or-nothing'
import { Show } from '../../../felles/Show'
import styles from './DatoPanel.module.scss'

interface IProps {
	tittel: string
	disabled: boolean
	dato: Nullable<Date>
	ekspandert: boolean
	onEkspanderToggle: () => void
	children: React.ReactNode
}


export const DatoPanel = ({
	tittel,
	disabled,
	dato,
	ekspandert,
	onEkspanderToggle,
	children,
}: IProps): React.ReactElement => {

	return (
		<div className={styles.wrapper}>
			<div className={styles.iconWrapper}><Calender title="Kalender" /></div>

			<div className={styles.content}>
				<div className={styles.header}>
					<div>
						<Heading size="small" level="4" className={globalStyles.blokkXxxs}>{tittel}</Heading>
						<BodyShort>{formatDate(dato)}</BodyShort>
					</div>

					<Show if={!disabled}>
						{
							ekspandert
								? <Button variant="tertiary" className={styles.ekspanderKnapp} onClick={onEkspanderToggle}>Avbryt</Button>
								: <Button variant="secondary" className={styles.ekspanderKnapp} onClick={onEkspanderToggle}>
									{dato ? 'Endre' : 'Legg til'}
								</Button>
						}
					</Show>
				</div>

				<Show if={ekspandert && !disabled}>
					{children}
				</Show>

			</div>
		</div>
	)
}
