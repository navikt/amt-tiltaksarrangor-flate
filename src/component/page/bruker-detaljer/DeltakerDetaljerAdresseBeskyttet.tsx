import { Heading } from '@navikt/ds-react'
import React from 'react'
import { Deltaker } from '../../../api/data/deltaker'
import { formatDate } from '../../../utils/date-utils'
import { getDeltakelsesmengdetekst, skalViseDeltakelsesmengde } from '../../../utils/deltaker-utils'
import { LabelValue } from '../../felles/label-value/LabelValue'
import { StatusMerkelapp } from '../../felles/status-merkelapp/StatusMerkelapp'
import styles from './DeltakerDetaljer.module.scss'
import { VeilederPanel } from './veileder-panel/VeilederPanel'

interface Props {
	deltaker: Deltaker,
	visTildeling: boolean
}

export const DeltakerDetaljerAdresseBeskyttet = ( { deltaker, visTildeling }: Props ): React.ReactElement => {
	const {
		soktInnPa, soktInnDato, tiltakskode
	} = deltaker

	const viseDeltakelsesmengde = skalViseDeltakelsesmengde( tiltakskode )


	return (
		<div>
			<Heading level="2" size="small" className={ styles.deltaker_heading }>Adressebeskyttet</Heading>
			<div className={ styles.detaljer }>
				<section className={ styles.section }>
					<LabelValue title="Status">
						<StatusMerkelapp status={ deltaker.status } />
					</LabelValue>
					<LabelValue title="Dato">
						<span>{ formatDate( deltaker.startDato ) } - { formatDate( deltaker.sluttDato ) }</span>
					</LabelValue>
					{ viseDeltakelsesmengde && (
						<LabelValue title="Deltakelsesmengde">
							<span>{ getDeltakelsesmengdetekst( deltaker.deltakelseProsent, deltaker.dagerPerUke ) }</span>
						</LabelValue>
					) }


					<div className={ styles.innsokt_adresseBeskyttet }>
						<LabelValue title="Søkt inn på">
							{ soktInnPa }
						</LabelValue>
						<LabelValue title="Dato">
							{ formatDate( soktInnDato ) }
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
