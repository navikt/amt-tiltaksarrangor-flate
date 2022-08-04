import { Alert, Link } from '@navikt/ds-react'
import { AxiosError, AxiosResponse } from 'axios'
import dayjs from 'dayjs'
import React, { useEffect, useRef } from 'react'

import { hentAuthInfo } from '../../api/auth-api'
import { AuthInfo } from '../../api/data/auth'
import { loginUrl } from '../../utils/url-utils'
import { isResolved, usePromise } from '../../utils/use-promise'
import styles from './SesjonNotifikasjon.module.scss'

enum SesjonStatus {
	UTLOPER_SNART,
	TVUNGEN_UTLOGGING
}

export const SesjonNotifikasjon = (): React.ReactElement | null => {
	const fetchAuthInfo = usePromise<AxiosResponse<AuthInfo>, AxiosError>(hentAuthInfo)
	const [ sesjonStatus, setSesjonStatus ] = React.useState<SesjonStatus>()
	const tvungenLogUtloggingTimeout = useRef<number>()
	const expirationTime = useRef<Date | null>()
	const visTvungen = sesjonStatus === SesjonStatus.TVUNGEN_UTLOGGING
	const visUtloper = sesjonStatus === SesjonStatus.UTLOPER_SNART

	const visTvungenAvslutning = () => !!expirationTime.current && dayjs(expirationTime.current)
		.subtract(30, 'seconds')
		.isBefore(dayjs())

	const visUtloperSnart = () => !!expirationTime.current && dayjs(expirationTime.current)
		.subtract(5, 'minutes')
		.isBefore(dayjs())

	useEffect(() => {
		setInterval(() => {
			if (visTvungenAvslutning())
				setSesjonStatus(SesjonStatus.TVUNGEN_UTLOGGING)
			else if (visUtloperSnart())
				setSesjonStatus(SesjonStatus.UTLOPER_SNART)

		}, 5000)

	}, [])

	useEffect(() => {
		if (isResolved(fetchAuthInfo)){
			expirationTime.current = fetchAuthInfo.result.data.expirationTime
		}
	}, [ fetchAuthInfo ])

	useEffect(() => {
		if (tvungenLogUtloggingTimeout.current) return
		if (sesjonStatus !== SesjonStatus.TVUNGEN_UTLOGGING) return

		tvungenLogUtloggingTimeout.current = setTimeout(() => {
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