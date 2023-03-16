import { Email, Telephone } from '@navikt/ds-icons'
import { Heading } from '@navikt/ds-react'
import cls from 'classnames'
import React, { useEffect } from 'react'

import { MINE_DELTAKERE_PAGE_ROUTE, gjennomforingDetaljerPageUrl } from '../../../navigation'
import { useTilbakelenkeStore } from '../../../store/tilbakelenke-store'
import { formaterTelefonnummer, lagBrukerNavn } from '../../../utils/bruker-utils'
import styles from './DeltakerDetaljerHeader.module.scss'
import { IconLabel } from './icon-label/IconLabel'
import { KopierKnapp } from './kopier-knapp/KopierKnapp'
import { useInnloggetBrukerStore } from '../../../store/innlogget-bruker-store'
import { isOnlyKoordinator, isOnlyVeileder } from '../../../utils/rolle-utils'
import { useQuery } from '../../../utils/use-query'

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
	const { roller } = useInnloggetBrukerStore()
	const query = useQuery()

	useEffect(() => {
		if (isOnlyVeileder(roller)) {
			setTilbakeTilUrl(MINE_DELTAKERE_PAGE_ROUTE)
		} else if (isOnlyKoordinator(roller)) {
			setTilbakeTilUrl(gjennomforingDetaljerPageUrl(gjennomforingId))
		} else {
			const ref = query.get('ref')
			if (ref !== null && ref === 'veileder') {
				setTilbakeTilUrl(MINE_DELTAKERE_PAGE_ROUTE)
			} else {
				setTilbakeTilUrl(gjennomforingDetaljerPageUrl(gjennomforingId))
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ gjennomforingId, roller ])

	return (
		<div className={styles.header}>
			<div className={styles.headerContent}>
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
