import { Email, Home, People, Telephone } from '@navikt/ds-icons'
import { Heading, Panel } from '@navikt/ds-react'
import cls from 'classnames'
import React from 'react'

import { NavEnhet, NavVeileder } from '../../../../api/data/deltaker'
import globalStyles from '../../../../globals.module.scss'
import { formaterTelefonnummer } from '../../../../utils/bruker-utils'
import { IconLabel } from '../icon-label/IconLabel'
import styles from './NavInfoPanel.module.scss'

export function NavInfoPanel(props: { navEnhet: NavEnhet | null, navVeileder: NavVeileder | null }): React.ReactElement {
	const { navEnhet, navVeileder } = props

	return (
		<Panel border className={styles.infoPanel}>
			<Heading size="small" level="4" className={globalStyles.blokkXs}>NAV-kontor</Heading>

			<div className={cls(styles.contentBlock, globalStyles.blokkM)}>
				<IconLabel
					labelValue={navEnhet?.navn}
					icon={<Home title="Nav-kontor" />}
					iconWrapperClassName={styles.iconWrapper}
				/>
			</div>

			<Heading size="small" level="4" className={globalStyles.blokkXs}>NAV-veileder</Heading>

			<div className={styles.contentBlock}>
				<IconLabel
					labelValue={navVeileder?.navn}
					icon={<People title="Veileder navn" />}
					iconWrapperClassName={styles.iconWrapper}
				/>
				<IconLabel
					labelValue={formaterTelefonnummer(navVeileder?.telefon)}
					icon={<Telephone title="Veileder telefonnummer" />}
					iconWrapperClassName={styles.iconWrapper}
				/>
				<IconLabel
					labelValue={navVeileder?.epost}
					icon={<Email title="Veileder epost" />}
					iconWrapperClassName={styles.iconWrapper}
				/>
			</div>
		</Panel>
	)
}
