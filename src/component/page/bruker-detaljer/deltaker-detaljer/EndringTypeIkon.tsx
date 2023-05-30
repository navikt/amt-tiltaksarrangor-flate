import React from 'react'

import styles from './EndringTypeIkon.module.scss'
import { EndringType } from './types'
import {
	CheckmarkCircleFillIcon,
	MinusCircleFillIcon,
	ChevronRightDoubleCircleFillIcon,
	ChevronRightCircleFillIcon,
	PlusCircleFillIcon,
	PieChartFillIcon
} from '@navikt/aksel-icons'

interface EndringTypeIkonProps {
	type: EndringType
}

export const EndringTypeIkon = (props: EndringTypeIkonProps) => {
	switch (props.type) {
		case EndringType.LEGG_TIL_OPPSTARTSDATO:
		case EndringType.ENDRE_OPPSTARTSDATO:
			return <ChevronRightCircleFillIcon className={styles.endreIkon} aria-hidden/>
		case  EndringType.FORLENG_DELTAKELSE:
			return <ChevronRightDoubleCircleFillIcon className={styles.forlengIkon} aria-hidden/>
		case EndringType.AVSLUTT_DELTAKELSE:
		case EndringType.ENDRE_SLUTTDATO:
			return <MinusCircleFillIcon className={styles.avsluttIkon} aria-hidden/>
		case EndringType.ENDRE_DELTAKELSE_PROSENT:
			return <PieChartFillIcon className={styles.endreProsentDeltakelseIkon} aria-hidden/>
		case EndringType.DELTAKER_IKKE_AKTUELL:
			return <PlusCircleFillIcon className={styles.ikkeAktuellIkon} aria-hidden/>
		case EndringType.DELTAKER_ER_AKTUELL:
			return <CheckmarkCircleFillIcon className={styles.erAktuellIkon} aria-hidden />
	}

}
