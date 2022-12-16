import { Heading } from '@navikt/ds-react'
import React from 'react'

import { Gjennomforing } from '../../../../api/data/tiltak'
import { sortAlphabeticAsc } from '../../../../utils/sortering-utils'
import styles from './GjennomforingListe.module.scss'
import { GjennomforingPanel } from './GjennomforingPanel'

interface Props {
	gjennomforinger: Gjennomforing[]
	erAlleredeLagtTil: (id: string) => boolean
}

export const GjennomforingerPaVirksomhetListe = ({ gjennomforinger, erAlleredeLagtTil }: Props) => {
	const arrangor = gjennomforinger[0].arrangor

	return (
		<>
			<Heading size="small" level="4" spacing className={styles.header}>
				<span className={styles.virksomhetNavn}>{arrangor.virksomhetNavn}</span>
				<span className={styles.orgnr}>org.nr.: {formatOrgnr(arrangor.virksomhetOrgnr)}</span>
			</Heading>
			<ul className={styles.list}>
				{gjennomforinger
					.sort((g1, g2) => {
						const sortTiltaksnavn = sortAlphabeticAsc(g1.tiltak.tiltaksnavn, g2.tiltak.tiltaksnavn)
						return sortTiltaksnavn === 0 ? sortAlphabeticAsc(g1.navn, g2.navn) : sortTiltaksnavn
					})
					.map(g => {
						return (
							<li key={g.id}>
								<GjennomforingPanel
									gjennomforingId={g.id}
									navn={g.navn}
									tiltaksnavn={g.tiltak.tiltaksnavn}
									startDato={g.startDato}
									sluttDato={g.sluttDato}
									alleredeLagtTil={erAlleredeLagtTil(g.id)}
								/>
							</li>
						)
					})}
			</ul>
		</>
	)
}

const formatOrgnr = (orgnr: string): string => {
	if (orgnr.length !== 9) return orgnr
	return `${orgnr.slice(0, 3)} ${orgnr.slice(3, 6)} ${orgnr.slice(6, 9)}`
}
