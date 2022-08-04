import { Alert, Link } from '@navikt/ds-react'
import { AxiosError, AxiosResponse } from 'axios'
import dayjs from 'dayjs'
import React, { useEffect, useRef, useState } from 'react'

import { hentAuthInfo } from '../../api/auth-api'
import { AuthInfo } from '../../api/data/auth'
import { loginUrl } from '../../utils/url-utils'
import { usePromise } from '../../utils/use-promise'
import styles from './SesjonNotifikasjon.module.scss'

enum SesjonStatus {
	UTLOPER_SNART,
	TVUNGEN_UTLOGGING_SNART
}

export const SesjonNotifikasjon = (): React.ReactElement | null => {
	const fetchAuthInfo = usePromise<AxiosResponse<AuthInfo>, AxiosError>(hentAuthInfo)
	const expirationTime = fetchAuthInfo.result?.data.expirationTime
	const tvungenUtloggingTimeoutRef = useRef<number>()
	const [ sesjonStatus, setSesjonStatus ] = React.useState<SesjonStatus>()
	const [ utlopOmMs, setUtlopOmMs ] = useState<number>()
	const [ utloggingOmMs, setUtloggingOmMs ] = useState<number>()
	const visTvungen = sesjonStatus === SesjonStatus.TVUNGEN_UTLOGGING_SNART
	const visUtloper = sesjonStatus === SesjonStatus.UTLOPER_SNART

	useEffect(() => {
		if(expirationTime === undefined) return
		const now = dayjs()
		const msTilUtlop =  dayjs(expirationTime)
			.subtract(5, 'minutes').diff(now)

		const msTilUtlogging = dayjs(expirationTime)
			.subtract(40, 'seconds').diff(now)

		setUtlopOmMs(msTilUtlop > 0? msTilUtlop : 0)
		setUtloggingOmMs(msTilUtlogging > 0? msTilUtlogging : 0)

	}, [ expirationTime ])

	useEffect(() => {
		if(utlopOmMs === undefined) return

		setTimeout(() => {
			setSesjonStatus(SesjonStatus.UTLOPER_SNART)
		}, utlopOmMs)

	}, [ utlopOmMs ])

	useEffect(() => {
		if(utloggingOmMs === undefined) return

		setTimeout(() => {
			setSesjonStatus(SesjonStatus.TVUNGEN_UTLOGGING_SNART)
		}, utloggingOmMs)

	}, [ utloggingOmMs ])

	useEffect(() => {
		if (sesjonStatus !== SesjonStatus.TVUNGEN_UTLOGGING_SNART) return
		if (tvungenUtloggingTimeoutRef.current) return

		tvungenUtloggingTimeoutRef.current = setTimeout(() => {
			window.location.href = loginUrl()
		}, 10000) as unknown as number

	}, [ sesjonStatus ])

	if (sesjonStatus === undefined) return null

	return <div className={styles.alertWrapper}>
		{visTvungen && <Alert variant="error">Sesjonen din har utløpt. Du blir snart logget inn på nytt.</Alert>}
		{visUtloper &&
			<Alert variant="warning">Din sesjon utløper snart. Ønsker du fortsatt å være innlogget?
				<Link href={loginUrl()} className={styles.loginLenke}>Ja, jeg vil fortsette</Link>
			</Alert>
		}
	</div>

}