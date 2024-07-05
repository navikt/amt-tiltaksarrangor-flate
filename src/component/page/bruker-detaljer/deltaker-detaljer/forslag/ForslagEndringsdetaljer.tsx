import React from 'react'
import { ForslagEndring, ForslagEndringType } from '../../../../../api/data/forslag'
import { assertNever } from '../../../../../utils/assert-never'
import { BodyLong, BodyShort, Detail } from '@navikt/ds-react'
import { formatDate } from '../../../../../utils/date-utils'
import styles from './Forslag.module.scss'

interface Props {
	readonly endring: ForslagEndring
	readonly begrunnelse: string | null
	readonly sendt: Date
}

export function ForslagEndringsdetaljer({ endring, begrunnelse, sendt }: Props) {
	return <>
		{endringsDetaljer(endring)}
		<BodyLong size="small">Begrunnelse: {begrunnelse}</BodyLong>
		<Detail>Sendt: {formatDate(sendt)}</Detail>
	</>
}

function endringsDetaljer(endring: ForslagEndring) {
	switch (endring.type) {
		case ForslagEndringType.ForlengDeltakelse: return (
			<div>
				<BodyShort size="small" weight="semibold" className={styles.endringTitle}>Forleng deltakelse</BodyShort>
				<BodyShort size="small">Ny sluttdato: {formatDate(endring.sluttdato)}</BodyShort>
			</div>
		)
		default: assertNever(endring.type)
	}

}
