import { People } from '@navikt/ds-icons'
import { Alert, Heading, Loader } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import React from 'react'

import { Koordinator } from '../../../api/data/tiltak'
import { fetchKoordinatorerForGjennfomforing } from '../../../api/tiltak-api'
import globalStyles from '../../../globals.module.scss'
import { isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise'
import styles from './KoordinatorInfo.module.scss'

const koordinatorDisplayString = (k: Koordinator): string => {
	if (k.mellomnavn != null) {
		return `${k.fornavn} ${k.mellomnavn} ${k.etternavn}`
	}
	return `${k.fornavn} ${k.etternavn}`
}

interface KoordinatorInfoProps {
	gjennomforingId: string
}

export const KoordinatorInfo = (props: KoordinatorInfoProps) => {

	const fetchKoordinatorerPromise = usePromise<AxiosResponse<Koordinator[]>>(
		() => fetchKoordinatorerForGjennfomforing(props.gjennomforingId), [ props.gjennomforingId ]
	)


	if (isNotStartedOrPending(fetchKoordinatorerPromise)) {
		return <Loader size="2xlarge" className={globalStyles.blokkS}/>
	}

	if (isRejected(fetchKoordinatorerPromise)) {
		return <Alert variant="error">Kan ikke vise Koordinatorer.</Alert>
	}

	const koordinatorer = fetchKoordinatorerPromise.result.data

	if (koordinatorer.length === 0) {
		return <></>
	}

	return (
		<div className={globalStyles.blokkM}>
			<Heading size="xsmall" level="3" className={globalStyles.blokkXxs}>Koordinatorer</Heading>
			<ul className={styles.koordinatorList}>
				{koordinatorer.map(k =>
					<li className={styles.koordinator} key={koordinatorDisplayString(k)}>
						<People aria-hidden/> {koordinatorDisplayString(k)}
					</li>)}
			</ul>

		</div>
	)

}
