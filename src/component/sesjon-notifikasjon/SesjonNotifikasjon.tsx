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
	const [ sesjonStatus, setSesjonStatus ] = useState<SesjonStatus>()
	const [ utlopAlertOmMs, setUtlopAlertOmMs ] = useState<number>()
	const [ utloggingAlertOmMs, setUtloggingAlertOmMs ] = useState<number>()
	const [ tvungenUtloggingOmMs, setTvungenUtloggingOmMs ] = useState<number>()
	const fetchAuthInfo = usePromise<AxiosResponse<AuthInfo>, AxiosError>(hentAuthInfo)

	const tvungenUtloggingTimeoutRef = useRef<number>()
	const tvungenUtloggingAlertTimeoutRef = useRef<number>()
	const utloperSnartAlertTimeoutRef = useRef<number>()

	const expirationTime = fetchAuthInfo.result?.data.expirationTime
	const visTvungen = sesjonStatus === SesjonStatus.TVUNGEN_UTLOGGING_SNART
	const visUtloper = sesjonStatus === SesjonStatus.UTLOPER_SNART

	useEffect(() => {
		if (!expirationTime) return
		const now = dayjs()
		const msTilUtloperSnartAlert = dayjs(expirationTime)
			.subtract(5, 'minutes').diff(now)

		const msTilUtloggingAlert = dayjs(expirationTime)
			.subtract(1, 'minutes').diff(now)

		const msTilUtlogging = dayjs(expirationTime)
			.subtract(10, 'seconds').diff(now)

		setUtlopAlertOmMs(Math.max(msTilUtloperSnartAlert, 0))
		setUtloggingAlertOmMs(Math.max(msTilUtloggingAlert, 0))
		setTvungenUtloggingOmMs(Math.max(msTilUtlogging, 0))
	}, [ expirationTime ])

	useEffect(() => {
		if (utlopAlertOmMs === undefined) return

		utloperSnartAlertTimeoutRef.current = setTimeout(() => {
			setSesjonStatus(SesjonStatus.UTLOPER_SNART)

		}, utlopAlertOmMs) as unknown as number

		return () => clearTimeout(utloperSnartAlertTimeoutRef.current)
	}, [ utlopAlertOmMs ])

	useEffect(() => {
		if (utloggingAlertOmMs === undefined) return

		tvungenUtloggingAlertTimeoutRef.current = setTimeout(() => {
			setSesjonStatus(SesjonStatus.TVUNGEN_UTLOGGING_SNART)
		}, utloggingAlertOmMs) as unknown as number

		return () => clearTimeout(tvungenUtloggingAlertTimeoutRef.current)
	}, [ utloggingAlertOmMs ])

	useEffect(() => {
		if (sesjonStatus !== SesjonStatus.TVUNGEN_UTLOGGING_SNART) return
		if (tvungenUtloggingTimeoutRef.current) return
		if (!tvungenUtloggingOmMs) return

		tvungenUtloggingTimeoutRef.current = setTimeout(() => {
			window.location.href = loginUrl()
		}, tvungenUtloggingOmMs) as unknown as number

		return () => clearTimeout(tvungenUtloggingTimeoutRef.current)
	}, [ sesjonStatus, tvungenUtloggingOmMs ])

	if (sesjonStatus === undefined) return null

	const LoginLenke = () => <Link href={loginUrl()} className={styles.loginLenke}>Logg inn på nytt</Link>

	return (
		<div className={styles.alertWrapper}>
			{visTvungen &&
				<Alert variant="error" role="alert">
					Du blir logget ut nå, og må logge inn på ny.
					<LoginLenke />
				</Alert>
			}
			{visUtloper &&
				<Alert variant="warning" role="alert">
					Du blir snart logget ut
					<LoginLenke />
				</Alert>
			}
		</div>
	)

}