import { Alert, Link } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import dayjs from 'dayjs'
import React, { useEffect, useRef, useState } from 'react'

import { hentAuthInfo } from '../../api/auth-api'
import { AuthInfo } from '../../api/data/auth'
import { absolutePath, loginUrl } from '../../utils/url-utils'
import { usePromise } from '../../utils/use-promise'
import styles from './SesjonNotifikasjon.module.scss'
import { useNavigate } from 'react-router-dom'
import { DU_ER_LOGGET_UT_PAGE_ROUTE, GJENNOMFORING_LISTE_PAGE_ROUTE } from '../../navigation'

enum AlertType {
	UTLOPER_SNART,
	TVUNGEN_UTLOGGING_SNART,
	LOGGET_UT
}

export const SesjonNotifikasjon = (): React.ReactElement | null => {
	const [ alertType, setAlertType ] = useState<AlertType>()
	const [ utlopAlertOmMs, setUtlopAlertOmMs ] = useState<number>()
	const [ utloggingAlertOmMs, setUtloggingAlertOmMs ] = useState<number>()
	const [ tvungenUtloggingOmMs, setTvungenUtloggingOmMs ] = useState<number>()
	const fetchAuthInfo = usePromise<AxiosResponse<AuthInfo>>(hentAuthInfo)
	const navigate = useNavigate()

	const tvungenUtloggingTimeoutRef = useRef<number>()
	const tvungenUtloggingAlertTimeoutRef = useRef<number>()
	const utloperSnartAlertTimeoutRef = useRef<number>()

	const expirationTime = fetchAuthInfo.result?.data.expirationTime

	useEffect(() => {
		if (!expirationTime) return
		const now = dayjs()
		const msTilUtloperSnartAlert = dayjs(expirationTime)
			.subtract(5, 'minutes').diff(now)

		const msTilUtloggingAlert = dayjs(expirationTime)
			.subtract(2, 'minutes').diff(now)

		const msTilAutomatiskUtlogging = dayjs(expirationTime)
			.subtract(1, 'minutes').diff(now)

		setUtlopAlertOmMs(Math.max(msTilUtloperSnartAlert, 0))
		setUtloggingAlertOmMs(Math.max(msTilUtloggingAlert, 0))
		setTvungenUtloggingOmMs(Math.max(msTilAutomatiskUtlogging, 0))
	}, [ expirationTime ])

	useEffect(() => {
		if (utlopAlertOmMs === undefined) return

		utloperSnartAlertTimeoutRef.current = setTimeout(() => {
			setAlertType(AlertType.UTLOPER_SNART)

		}, utlopAlertOmMs) as unknown as number

		return () => clearTimeout(utloperSnartAlertTimeoutRef.current)
	}, [ utlopAlertOmMs ])

	useEffect(() => {
		if (utloggingAlertOmMs === undefined) return

		tvungenUtloggingAlertTimeoutRef.current = setTimeout(() => {
			setAlertType(AlertType.TVUNGEN_UTLOGGING_SNART)
		}, utloggingAlertOmMs) as unknown as number

		return () => clearTimeout(tvungenUtloggingAlertTimeoutRef.current)
	}, [ utloggingAlertOmMs ])

	useEffect(() => {
		if (tvungenUtloggingTimeoutRef.current) return
		if (!tvungenUtloggingOmMs) return

		tvungenUtloggingTimeoutRef.current = setTimeout(() => {
			setAlertType(AlertType.LOGGET_UT)
			window.location.href = loginUrl(window.location.href) //denne fungerer ikke om fanen ikke er aktiv
			navigate(DU_ER_LOGGET_UT_PAGE_ROUTE)
		}, tvungenUtloggingOmMs) as unknown as number
	}, [ alertType, tvungenUtloggingOmMs, navigate ])

	const LoginLenke = () => <Link href={loginUrl(absolutePath(GJENNOMFORING_LISTE_PAGE_ROUTE))} className={styles.loginLenke}>Logg inn på nytt</Link>

	if (alertType === undefined) return null
	return (
		<div className={styles.alertWrapper}>
			{alertType === AlertType.LOGGET_UT &&
                <Alert variant="error" role="alert">
                    Du er logget ut.<LoginLenke />
                </Alert>
			}
			{alertType === AlertType.TVUNGEN_UTLOGGING_SNART &&
				<Alert variant="error" role="alert">
					Du blir logget ut nå, og må logge inn på ny.<LoginLenke />
				</Alert>
			}
			{alertType === AlertType.UTLOPER_SNART &&
				<Alert variant="warning" role="alert">
					Du blir snart logget ut.<LoginLenke />
				</Alert>
			}
		</div>
	)

}