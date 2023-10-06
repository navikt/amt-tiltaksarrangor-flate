import { ReadMore, BodyShort } from '@navikt/ds-react'
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
	if ( historiskEndringsmelding.status === EndringsmeldingStatus.TILBAKEKALT){
		statusInfo = 'Arrangør har tilbakekalt meldingen.'
	} // Info hvis melding er utdatert?

	return <div className={styles.panel}>
		<EndringTypeIkon type={ mapTilEndringType( historiskEndringsmelding.type ) } />
		<div>
			<EndringsmeldingInnhold endringsmelding={ historiskEndringsmelding } />
			<BodyShort size="small" className={ styles.sendt }>Sendt: { formatDate( historiskEndringsmelding.sendt ) }</BodyShort>
			{ statusInfo && <BodyShort size="small" className={ styles.statusInfo }>{ statusInfo }</BodyShort> }
		</div>
	</div>
}

export const HistoriskeEndringsmeldinger = ( {
	historiskeEndringsmeldinger
}: HistoriskeEndringsmeldingerProps ) => {
	const [ isOopen, setIsOpen ] = useState(false)

	return (
		<ReadMore
			header={ isOopen ? 'Skjul historikk' : 'Vis historikk' }
			open={ isOopen }
			onClick={ () => setIsOpen( !isOopen )}
			size="small"
			className={ styles.meldinger }
		>
			<ul className={ styles.list }>
				{ historiskeEndringsmeldinger.map( e =>
					<li key={e.id}>
						{ getHistoriskEnrdingsmeldingPanel( e ) }
					</li>
				) }
			</ul>

		</ReadMore>
	)
}
