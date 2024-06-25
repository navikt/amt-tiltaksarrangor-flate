import { ReadMore, Detail } from '@navikt/ds-react'
import React, { useState } from 'react'

import { Endringsmelding, EndringsmeldingStatus } from '../../../../../api/data/endringsmelding'
import styles from './HistoriskeEndringsmeldinger.module.scss'
import { EndringTypeIkon } from '../EndringTypeIkon'
import { mapTilEndringType } from './uitls'
import { EndringsmeldingInnhold } from './EndringsmeldingInnhold'
import { formatDate } from '../../../../../utils/date-utils'

interface HistoriskeEndringsmeldingerProps {
    historiskeEndringsmeldinger: Endringsmelding[]
}

const getHistoriskEnrdingsmeldingPanel = (historiskEndringsmelding: Endringsmelding) => {
	let  statusInfo = null
	if (historiskEndringsmelding.status === EndringsmeldingStatus.TILBAKEKALT){
		statusInfo = 'Arrangør tilbakekalte meldingen.'
	} else if (historiskEndringsmelding.status === EndringsmeldingStatus.UTDATERT) {
		statusInfo = 'Det ble sendt en ny melding av samme type.'
	}

	return <div className={styles.panel}>
		<EndringTypeIkon type={ mapTilEndringType(historiskEndringsmelding.type) } />
		<div>
			<EndringsmeldingInnhold endringsmelding={ historiskEndringsmelding } />
			<div className={ styles.meldingMeta }>
				<Detail textColor="subtle">
					Sendt: { formatDate(historiskEndringsmelding.sendt) }
				</Detail>
				{ statusInfo && <Detail textColor="subtle">{ statusInfo }</Detail> }
			</div>
		</div>
	</div>
}

export const HistoriskeEndringsmeldinger = ({
	historiskeEndringsmeldinger
}: HistoriskeEndringsmeldingerProps) => {
	const [ isOopen, setIsOpen ] = useState(false)

	return (
		<ReadMore
			header={ isOopen ? 'Skjul historikk' : 'Vis historikk' }
			open={ isOopen }
			onClick={ () => setIsOpen(!isOopen)}
			size="small"
			className={ styles.meldinger }
		>
			<ul className={ styles.list }>
				{ historiskeEndringsmeldinger.map(e =>
					<li key={e.id}>
						{ getHistoriskEnrdingsmeldingPanel(e) }
					</li>
				) }
			</ul>

		</ReadMore>
	)
}
