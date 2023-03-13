import styles from './DeltakerlisterPaEnhet.module.scss'
import { Heading } from '@navikt/ds-react'
import React, { ReactElement } from 'react'

interface DeltakerlisterForArrangorProps {
	navn: string,
	orgNr: string,
	children: ReactElement[]
}

export const DeltakerlisterForArrangor = (props: DeltakerlisterForArrangorProps) => {
	return (
		<div>
			<Heading size="small" level="4" spacing className={styles.header}>
				<span className={styles.virksomhetNavn}>{props.navn}</span>
				<span className={styles.orgnr}>org.nr.: {formatOrgnr(props.orgNr)}</span>
			</Heading>
			{props.children}
		</div>
	)
}

const formatOrgnr = (orgnr: string): string => {
	if (orgnr.length !== 9) return orgnr
	return `${orgnr.slice(0, 3)} ${orgnr.slice(3, 6)} ${orgnr.slice(6, 9)}`
}
