import React from 'react'

import styles from './EndringTypeIkon.module.scss'
import { EndringType } from './types'
import {
	MinusCircleFillIcon,
	ChevronRightDoubleCircleFillIcon,
	ChevronRightCircleFillIcon,
	PlusCircleFillIcon,
	PieChartFillIcon,
} from '@navikt/aksel-icons'

interface EndringTypeIkonProps {
	type: EndringType
}

export const EndringTypeIkon = (props: EndringTypeIkonProps) => {
	switch (props.type) {
		case EndringType.LEGG_TIL_OPPSTARTSDATO:
		case EndringType.ENDRE_OPPSTARTSDATO:
			return <ChevronRightCircleFillIcon className={styles.endreIkon} aria-hidden />
		case EndringType.FORLENG_DELTAKELSE:
			return <ChevronRightDoubleCircleFillIcon className={styles.forlengIkon} aria-hidden />
		case EndringType.AVSLUTT_DELTAKELSE:
		case EndringType.ENDRE_SLUTTDATO:
			return <MinusCircleFillIcon className={styles.avsluttIkon} aria-hidden />
		case EndringType.ENDRE_DELTAKELSE_PROSENT:
			return <PieChartFillIcon className={styles.endreProsentDeltakelseIkon} aria-hidden />
		case EndringType.DELTAKER_IKKE_AKTUELL:
			return <PlusCircleFillIcon className={styles.ikkeAktuellIkon} aria-hidden />
		case EndringType.ENDRE_SLUTTAARSAK:
			return <ChevronRightLastFillIcon ariaHidden />
	}
}

interface ChevronRightLastFillIconProps {
	className?: string,
	ariaHidden?: boolean
}

const ChevronRightLastFillIcon = (props: ChevronRightLastFillIconProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			className={props.className}
			aria-hidden={props.ariaHidden}
		>
			<path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM15.7844 7.33856C16.1986 7.33856 16.5344 7.67435 16.5344 8.08856V15.6115C16.5344 16.0257 16.1986 16.3615 15.7844 16.3615C15.3702 16.3615 15.0344 16.0257 15.0344 15.6115V8.08856C15.0344 7.67435 15.3702 7.33856 15.7844 7.33856ZM8.38532 7.88532C8.67821 7.59242 9.15309 7.59242 9.44598 7.88532L13.0439 11.4832C13.3368 11.7761 13.3368 12.251 13.0439 12.5439L9.44598 16.1418C9.15309 16.4347 8.67821 16.4347 8.38532 16.1418C8.09243 15.8489 8.09243 15.374 8.38532 15.0811L11.4529 12.0136L8.38532 8.94598C8.09243 8.65308 8.09243 8.17821 8.38532 7.88532Z" fill="#676F7B" />
		</svg>
	)
}
