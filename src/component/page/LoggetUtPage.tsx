import React from 'react'
import { BodyShort, Link } from '@navikt/ds-react'
import { absolutePath, loginUrl } from '../../utils/url-utils'
import { GJENNOMFORING_LISTE_PAGE_ROUTE } from '../../navigation'
import styles from '../sesjon-notifikasjon/SesjonNotifikasjon.module.scss'

export const LoggetUtPage = () => {
	const redirectUrl = absolutePath(GJENNOMFORING_LISTE_PAGE_ROUTE)
	const LoginLenke = () => <Link href={loginUrl(redirectUrl)} className={styles.loginLenke}>Logg inn på nytt</Link>

	return <BodyShort>
		Du har blitt logget ut og må logge inn på nytt<LoginLenke />
	</BodyShort>
}