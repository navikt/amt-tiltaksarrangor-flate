import { Email, Home, People, Telephone } from '@navikt/ds-icons'
import { Heading, Panel } from '@navikt/ds-react'
import cls from 'classnames'
import React from 'react'

import { NavKontor, NavVeileder } from '../../../../domeneobjekter/deltaker'
import globalStyles from '../../../../globals.module.scss'
import { formaterTelefonnummer } from '../../../../utils/bruker-utils'
import { IconLabel } from '../icon-label/IconLabel'
import styles from './NavInfoPanel.module.scss'

export function NavInfoPanel(props: { navKontor: NavKontor | null, navVeileder: NavVeileder | null }): React.ReactElement {
	const { navKontor, navVeileder } = props

	return (
		<Panel border className={styles.infoPanel}>
			<Heading size="medium" level="3" className={globalStyles.blokkXs}>NAV-kontor</Heading>

			<div className={cls(styles.contentBlock, globalStyles.blokkM)}>
				<IconLabel
					labelValue={navKontor?.navn}
					labelAlt="Nav-kontor"
					icon={<Home />}
					iconWrapperClassName={styles.iconWrapper}
				/>
			</div>

			<Heading size="medium" level="3" className={globalStyles.blokkXs}>NAV-veileder</Heading>

			<div className={styles.contentBlock}>
				<IconLabel
					labelValue={navVeileder?.navn}
					labelAlt="Veileder navn"
					icon={<People />}
					iconWrapperClassName={styles.iconWrapper}
				/>
				<IconLabel
					labelValue={formaterTelefonnummer(navVeileder?.telefon)}
					labelAlt="Veileder telefonnummer"
					icon={<Telephone />}
					iconWrapperClassName={styles.iconWrapper}
				/>
				<IconLabel
					labelValue={navVeileder?.epost}
					labelAlt="Veileder epost"
					icon={<Email />}
					iconWrapperClassName={styles.iconWrapper}
				/>
			</div>
		</Panel>
	)
}