import { BodyShort, Heading } from '@navikt/ds-react'
import React from 'react'

import { Gjennomforing } from '../../../api/data/tiltak'
import globalStyles from '../../../globals.module.scss'

interface KoordinatorInfoProps {
    gjennomforing: Gjennomforing
}

export const KoordinatorInfo = (props: KoordinatorInfoProps) => {
	if (props.gjennomforing.koordinatorer.length === 0) {
		return <></>
	}

	return (
		<div className={globalStyles.blokkM}>
			<Heading size="medium" level="2" className={globalStyles.blokkXxs}>Koordinatorer</Heading>
			{props.gjennomforing.koordinatorer.map(k => <BodyShort key={k}>{k}</BodyShort>)}
		</div>
	)

}
