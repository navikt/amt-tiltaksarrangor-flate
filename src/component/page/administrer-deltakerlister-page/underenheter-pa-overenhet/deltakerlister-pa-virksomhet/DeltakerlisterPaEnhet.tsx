import { EnhetVO } from '../../deltakerliste.viewobjects'
import { Deltakerliste } from './deltakerlister/Deltakerliste'
import styles from './DeltakerlisterPaEnhet.module.scss'
import { Heading } from '@navikt/ds-react'
import React from 'react'

interface DeltakerlisterPaEnhetProps {
    enhet: EnhetVO;
    deltakerlisterLagtTil: string[];
    deltakerlisteIdLoading: string | undefined;
    onLeggTil: (id: string) => void;
    onFjern: (id: string) => void;
}

export const DeltakerlisterPaEnhet = (props: DeltakerlisterPaEnhetProps) => {
	return (
		<div>
			<Heading size="small" level="4" spacing className={styles.header}>
				<span className={styles.virksomhetNavn}>{props.enhet.navn}</span>
				<span className={styles.orgnr}>org.nr.: {formatOrgnr(props.enhet.id)}</span>
			</Heading>

			{props.enhet.deltakerlister.map((deltakerliste) =>
				<Deltakerliste key={deltakerliste.id}
					deltakerliste={deltakerliste}
					deltakerlisterLagtTil={props.deltakerlisterLagtTil}
					deltakerlisteIdLoading={props.deltakerlisteIdLoading}
					onLeggTil={props.onLeggTil}
					onFjern={props.onFjern}/>
			)}
		</div>
	)
}

const formatOrgnr = (orgnr: string): string => {
	if (orgnr.length !== 9) return orgnr
	return `${orgnr.slice(0, 3)} ${orgnr.slice(3, 6)} ${orgnr.slice(6, 9)}`
}
