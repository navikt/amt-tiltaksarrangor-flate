import { Alert, Link } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import dayjs from 'dayjs'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { hentSessionInfo, refreshToken } from '../../api/auth-api'
import { SessionInfo } from '../../api/data/auth'
import { absolutePath, loginUrl } from '../../utils/url-utils'
import { isResolved, usePromise } from '../../utils/use-promise'
import styles from './SesjonNotifikasjon.module.scss'
import { useNavigate } from 'react-router-dom'
import { DU_ER_LOGGET_UT_PAGE_ROUTE, MINE_DELTAKERLISTER_PAGE_ROUTE } from '../../navigation'
import { Nullable } from '../../utils/types/or-nothing'

enum AlertType {
	UTLOPER_SNART,
	TVUNGEN_UTLOGGING_SNART,
	LOGGET_UT
}

export const SesjonNotifikasjon = (): React.ReactElement | null => {
	const [ alertType, setAlertType ] = useState<AlertType>()
	const [ tokenExpiryDate, setTokenExpiryDate ] = useState<Date|null>()
	const [ sessionInfo, setSessionInfo ] = useState<SessionInfo>()
	const fetchSessionInfo = usePromise<AxiosResponse<SessionInfo>>(hentSessionInfo)
	const navigate = useNavigate()
	const tvungenUtloggingTimeoutRef = useRef<number>()


	const tokenTimedOut = useCallback(() => {
		return dayjs().isAfter(dayjs(tokenExpiryDate))
	}, [ tokenExpiryDate ])

	const visUtloperSnartAlert = useCallback(() => {
		return tokenUtloperSnart(tokenExpiryDate)
	}, [ tokenExpiryDate ])

	const visDuBlirLoggetUtAlert = useCallback(() => {
		const visAlert = dayjs(tokenExpiryDate).subtract(2, 'minutes')
		return dayjs().isAfter(visAlert)
	}, [ tokenExpiryDate ])


	const tokenUtloperSnart = (expiryDate: Nullable<Date>) => {
		const utloperSnartTidspunkt = dayjs(expiryDate).subtract(5, 'minutes')
		return dayjs().isAfter(utloperSnartTidspunkt)
	}

	useEffect(() => {
		if (isResolved(fetchSessionInfo)) {
			setSessionInfo(fetchSessionInfo.result.data)
			setTokenExpiryDate(fetchSessionInfo.result.data.tokens.expire_at)
		}
	}, [ fetchSessionInfo ])


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
				navigate(loginUrl(absolutePath(MINE_DELTAKERLISTER_PAGE_ROUTE)))
			})
	}


	const LoginLenke = () => <Link href={loginUrl(absolutePath(MINE_DELTAKERLISTER_PAGE_ROUTE))} className={styles.loginLenke}>Logg inn på nytt</Link>
	const RefreshLenke = () => <Link href="#" onClick={refreshSessionToken} className={styles.loginLenke}>Logg inn på nytt</Link>

	const LoginEllerRefreshLenke = () => {
		const sessionAvsluttesSnart = dayjs().add(5, 'minutes').isAfter(sessionInfo?.session.ends_at)
		if (sessionAvsluttesSnart || !sessionInfo?.session.active) {
			return <LoginLenke />
		}
		return <RefreshLenke />
	}

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
					Du blir logget ut nå, og må logge inn på ny.<LoginEllerRefreshLenke />
				</Alert>
			}
			{alertType === AlertType.UTLOPER_SNART &&
				<Alert variant="warning" role="alert">
					Du blir snart logget ut.<LoginEllerRefreshLenke />
				</Alert>
			}
		</div>
	)

}
