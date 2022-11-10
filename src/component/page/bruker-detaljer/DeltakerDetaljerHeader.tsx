import { Email, Telephone } from '@navikt/ds-icons'
import { Heading } from '@navikt/ds-react'
import cls from 'classnames'
import React from 'react'

import { gjennomforingDetaljerPageUrl } from '../../../navigation'
import { formaterTelefonnummer, lagBrukerNavn } from '../../../utils/bruker-utils'
import { Fnr } from '../../felles/fnr/Fnr'
import { Tilbakelenke } from '../../felles/tilbakelenke/Tilbakelenke'
import styles from './DeltakerDetaljerHeader.module.scss'
import { IconLabel } from './icon-label/IconLabel'
import { KopierKnapp } from './kopier-knapp/KopierKnapp'

interface BrukerPaaTiltakHeaderProps {
	gjennomforingId: string,
	fornavn: string,
	mellomnavn?: string,
	etternavn: string,
	fodselsnummer: string,
	telefonnummer: string | null,
	epost: string | null,
}

export const DeltakerDetaljerHeader = (props: BrukerPaaTiltakHeaderProps): React.ReactElement => {
	const { gjennomforingId, fornavn, mellomnavn, etternavn, fodselsnummer, telefonnummer, epost } = props

	return (
		<div className={styles.header}>
			<div className={styles.headerContent}>
				<div className={styles.tilbakelenkeWrapper}>
					<Tilbakelenke to={gjennomforingDetaljerPageUrl(gjennomforingId)} className={styles.tilbakelenke}/>
				</div>

				<div className={styles.headerInfoWrapper}>
					<div className={cls(styles.headerTitleWrapper)}>
						<Heading size="medium" level="2" className={styles.headerTitle}>{lagBrukerNavn(fornavn, mellomnavn, etternavn)}</Heading>
						{fodselsnummer && (
							<KopierKnapp
								kopierTekst={fodselsnummer}
								ariaLabel={`Kopier fødselsnummer ${fodselsnummer.split('').join(' ')}`}
							>
								<Fnr fnr={fodselsnummer}/>
							</KopierKnapp>
						)}
					</div>

					<div className={styles.headerInfo}>
						<IconLabel labelValue={formaterTelefonnummer(telefonnummer)} icon={<Telephone title="Deltaker telefonnummer"/>}/>
						<IconLabel labelValue={epost} icon={<Email title="Deltaker e-post"/>}/>
					</div>
				</div>

			</div>
		</div>
	)
}