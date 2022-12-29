import { Email, Telephone } from '@navikt/ds-icons'
import { Heading } from '@navikt/ds-react'
import cls from 'classnames'
import React, { useEffect } from 'react'

import { gjennomforingDetaljerPageUrl } from '../../../navigation'
import { useTilbakelenkeStore } from '../../../store/tilbakelenke-store'
import { formaterTelefonnummer, lagBrukerNavn } from '../../../utils/bruker-utils'
import toggle from '../../../utils/toggle'
import { Fnr } from '../../felles/fnr/Fnr'
import { Tilbakelenke } from '../../felles/tilbakelenke/Tilbakelenke'
import styles from './DeltakerDetaljerHeader.module.scss'
import { IconLabel } from './icon-label/IconLabel'
import { KopierKnapp } from './kopier-knapp/KopierKnapp'

interface BrukerPaaTiltakHeaderProps {
	gjennomforingId: string,
	fornavn: string,
	mellomnavn: string | null,
	etternavn: string,
	fodselsnummer: string,
	telefonnummer: string | null,
	epost: string | null,
}

export const DeltakerDetaljerHeader = (props: BrukerPaaTiltakHeaderProps): React.ReactElement => {
	const { gjennomforingId, fornavn, mellomnavn, etternavn, fodselsnummer, telefonnummer, epost } = props
	const { setTilbakeTilUrl } = useTilbakelenkeStore()

	useEffect(() => {
		setTilbakeTilUrl(gjennomforingDetaljerPageUrl(gjennomforingId))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ gjennomforingId ])

	return (
		<div className={styles.header}>
			<div className={
				toggle.navDekoratorEnabled
					? styles.headerContent
					: styles.headerContentDeprecated
			}>
				{!toggle.navDekoratorEnabled && (
					<div className={styles.tilbakelenkeWrapper}>
						<Tilbakelenke to={gjennomforingDetaljerPageUrl(gjennomforingId)} className={styles.tilbakelenke} />
					</div>
				)}

				<div className={styles.headerInfoWrapper}>
					<div className={cls(styles.headerTitleWrapper)}>
						<Heading size="small" level="2" className={styles.headerTitle}>{lagBrukerNavn(fornavn, mellomnavn, etternavn)}</Heading>
						{fodselsnummer && (
							<KopierKnapp
								kopierTekst={fodselsnummer}
								ariaLabel={`Kopier fødselsnummer ${fodselsnummer.split('').join(' ')}`}
							>
								{fodselsnummer}
							</KopierKnapp>
						)}
					</div>

					<div className={styles.headerInfo}>
						<IconLabel labelValue={formaterTelefonnummer(telefonnummer)} icon={<Telephone title="Deltaker telefonnummer" />} />
						<IconLabel labelValue={epost} icon={<Email title="Deltaker e-post" />} />
					</div>
				</div>
			</div>
		</div>
	)
}
