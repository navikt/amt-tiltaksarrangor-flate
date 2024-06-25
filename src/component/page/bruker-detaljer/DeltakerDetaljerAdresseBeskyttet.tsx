import { Heading } from '@navikt/ds-react'
import React, { useEffect } from 'react'
import { Deltaker } from '../../../api/data/deltaker'
import { formatDate } from '../../../utils/date-utils'
import { getDeltakelsesmengdetekst, skalViseDeltakelsesmengde } from '../../../utils/deltaker-utils'
import { LabelValue } from '../../felles/label-value/LabelValue'
import { StatusMerkelapp } from '../../felles/status-merkelapp/StatusMerkelapp'
import styles from './DeltakerDetaljer.module.scss'
import { VeilederPanel } from './veileder-panel/VeilederPanel'
import { useTilbakelenkeStore } from '../../../store/tilbakelenke-store'
import { useInnloggetBrukerStore } from '../../../store/innlogget-bruker-store'
import { isOnlyKoordinator, isOnlyVeileder } from '../../../utils/rolle-utils'
import { MINE_DELTAKERE_PAGE_ROUTE, deltakerlisteDetaljerPageUrl } from '../../../navigation'
import { useQuery } from '../../../utils/use-query'

interface Props {
	deltaker: Deltaker,
	visTildeling: boolean
}

export const DeltakerDetaljerAdresseBeskyttet = ({ deltaker, visTildeling }: Props): React.ReactElement => {
	const {
		soktInnPa, soktInnDato, tiltakskode, deltakerliste
	} = deltaker
	const { setTilbakeTilUrl } = useTilbakelenkeStore()
	const { roller } = useInnloggetBrukerStore()
	const query = useQuery()

	const viseDeltakelsesmengde = skalViseDeltakelsesmengde(tiltakskode)

	useEffect(() => {
		if (isOnlyVeileder(roller)) {
			setTilbakeTilUrl(MINE_DELTAKERE_PAGE_ROUTE)
		} else if (isOnlyKoordinator(roller)) {
			setTilbakeTilUrl(deltakerlisteDetaljerPageUrl(deltakerliste.id,))
		} else {
			const ref = query.get('ref')
			if (ref !== null && ref === 'veileder') {
				setTilbakeTilUrl(MINE_DELTAKERE_PAGE_ROUTE)
			} else {
				setTilbakeTilUrl(deltakerlisteDetaljerPageUrl(deltakerliste.id,))
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ deltakerliste.id, roller ])

	return (
		<div data-testid="bruker-detaljer-page">
			<Heading level="2" size="small" className={ styles.deltaker_heading }>Adressebeskyttet</Heading>
			<div className={ styles.detaljer }>
				<section className={ styles.section }>
					<LabelValue title="Status">
						<StatusMerkelapp status={ deltaker.status } />
					</LabelValue>
					<LabelValue title="Dato">
						<span>{ formatDate(deltaker.startDato) } - { formatDate(deltaker.sluttDato) }</span>
					</LabelValue>
					{ viseDeltakelsesmengde && (
						<LabelValue title="Deltakelsesmengde">
							<span>{ getDeltakelsesmengdetekst(deltaker.deltakelseProsent, deltaker.dagerPerUke) }</span>
						</LabelValue>
					) }


					<div className={ styles.innsokt_adresseBeskyttet }>
						<LabelValue title="Søkt inn på">
							{ soktInnPa }
						</LabelValue>
						<LabelValue title="Dato">
							{ formatDate(soktInnDato) }
						</LabelValue>
					</div>
				</section>

				<section>
					<VeilederPanel deltaker={ deltaker } visTildeling={ visTildeling } />
				</section>
			</div>
		</div>

	)
}
