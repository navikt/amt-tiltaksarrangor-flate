import { Alert, Link } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import dayjs from 'dayjs'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { hentAuthInfo, refreshToken } from '../../api/auth-api'
import { AuthInfo } from '../../api/data/auth'
import { absolutePath, loginUrl } from '../../utils/url-utils'
import { isResolved, usePromise } from '../../utils/use-promise'
import styles from './SesjonNotifikasjon.module.scss'
import { useNavigate } from 'react-router-dom'
import { DU_ER_LOGGET_UT_PAGE_ROUTE, MINE_DELTAKERLISTER_PAGE_ROUTE } from '../../navigation'

enum AlertType {
	UTLOPER_SNART,
	TVUNGEN_UTLOGGING_SNART,
	LOGGET_UT
}

export const SesjonNotifikasjon = (): React.ReactElement | null => {
	const [ alertType, setAlertType ] = useState<AlertType>()
	const [ tokenExpiryDate, setTokenExpiryDate ] = useState<Date|null>()
	const fetchAuthInfo = usePromise<AxiosResponse<AuthInfo>>(hentAuthInfo)
	const navigate = useNavigate()
	const tvungenUtloggingTimeoutRef = useRef<number>()
	const tokenTimedOut = useCallback(() => {
		return dayjs().isAfter(dayjs(tokenExpiryDate))
	}, [ tokenExpiryDate ])

	const visUtloperSnartAlert = useCallback(() => {
		const visAlert = dayjs(tokenExpiryDate).subtract(5, 'minutes')
		return dayjs().isAfter(visAlert)
	}, [ tokenExpiryDate ])

	const visDuBlirLoggetUtAlert = useCallback(() => {
		const visAlert = dayjs(tokenExpiryDate).subtract(2, 'minutes')
		return dayjs().isAfter(visAlert)
	}, [ tokenExpiryDate ])

	useEffect(() => {
		if (isResolved(fetchAuthInfo)) {
			setTokenExpiryDate(fetchAuthInfo.result.data.expirationTime)
		}
	}, [ fetchAuthInfo ])


	useEffect(() => {
		if (tvungenUtloggingTimeoutRef.current) return
		if (!tokenExpiryDate) return

		tvungenUtloggingTimeoutRef.current = setInterval(() => {
			if (tokenTimedOut()) {
				setAlertType(AlertType.LOGGET_UT)
				navigate(DU_ER_LOGGET_UT_PAGE_ROUTE)

			}
			else if (visDuBlirLoggetUtAlert()) {
				setAlertType(AlertType.TVUNGEN_UTLOGGING_SNART)
			}
			else if (visUtloperSnartAlert()) {
				setAlertType(AlertType.UTLOPER_SNART)
			}

		}, 3000) as unknown as number

	}, [ tokenExpiryDate, navigate, tokenTimedOut, visDuBlirLoggetUtAlert, visUtloperSnartAlert ])

	const refreshSessionToken = () => {
		refreshToken()
			.then(res => setTokenExpiryDate(res.data.tokens.expire_at))
			.then(() => {
				clearInterval(tvungenUtloggingTimeoutRef.current)
				tvungenUtloggingTimeoutRef.current = undefined
				setAlertType(undefined)
			})
			.catch(() => {
				navigate(loginUrl(window.location.href))
			})
	}


	const LoginLenke = () => <Link href={loginUrl(absolutePath(MINE_DELTAKERLISTER_PAGE_ROUTE))} className={styles.loginLenke}>Logg inn på nytt</Link>
	const RefreshLenke = () => <Link href="#" onClick={refreshSessionToken}>Forbli innlogget</Link>

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
					Du blir snart logget ut. <RefreshLenke />
				</Alert>
			}
		</div>
	)

}
