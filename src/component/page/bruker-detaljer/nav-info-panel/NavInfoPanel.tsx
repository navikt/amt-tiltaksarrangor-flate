import { Home } from '@navikt/ds-icons'
import { Heading, Panel } from '@navikt/ds-react'
import cls from 'classnames'
import React from 'react'

import { NavEnhet, NavVeileder } from '../../../../api/data/deltaker'
import globalStyles from '../../../../globals.module.scss'
import { IconLabel } from '../icon-label/IconLabel'
import styles from './NavInfoPanel.module.scss'
import { NavInfoVeileder } from './NavInfoVeileder'

export function NavInfoPanel(props: { navEnhet: NavEnhet | null, navVeileder: NavVeileder | null }): React.ReactElement {
	const { navEnhet, navVeileder } = props

	return (
		<Panel border className={styles.infoPanel}>
			<Heading size="xsmall" level="3" className={globalStyles.blokkXs}>NAV-kontor</Heading>

			<div className={cls(styles.contentBlock, globalStyles.blokkM)}>
				<IconLabel
					labelValue={navEnhet?.navn}
					icon={<Home title="Nav-kontor" />}
					iconWrapperClassName={styles.iconWrapper}
				/>
			</div>

			<NavInfoVeileder veileder={navVeileder} />
		</Panel>
	)
}
