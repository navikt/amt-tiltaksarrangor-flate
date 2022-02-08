import { BodyShort, Heading } from '@navikt/ds-react'
import cls from 'classnames'
import React from 'react'

import globalStyles from '../../../../globals.module.scss'
import styles from './DeltakerDetalj.module.scss'

interface DeltakerDetaljProps {
	detaljeTittel: string
	detaljeVerdi: string;
	detaljeIcon: React.ReactElement;
	className?: string;
}

export const DeltakerDetalj = (props: DeltakerDetaljProps): React.ReactElement => {

	return (
		<div className={cls(styles.deltakerDetalj, props.className)}>
			<div className={styles.iconWrapper}>{props.detaljeIcon}</div>
			<div>
				<Heading size="small" level="3" className={globalStyles.blokkXxxs}>{props.detaljeTittel}</Heading>
				<BodyShort>{props.detaljeVerdi}</BodyShort>
			</div>
		</div>
	)
}