import {
	AddCircleFilled,
	ChevronRightCircleFilled,
	ChevronRightDoubleFilled,
	MinusCircleFilled
} from '@navikt/ds-icons'
import SvgDivideFilled from '@navikt/ds-icons/esm/DivideFilled'
import React from 'react'

import styles from './EndringTypeIkon.module.scss'
import { EndringType } from './types'

interface EndringTypeIkonProps {
	type: EndringType
}

export const EndringTypeIkon = (props: EndringTypeIkonProps) => {
	switch (props.type) {
		case EndringType.LEGG_TIL_OPPSTARTSDATO:
			return <ChevronRightCircleFilled className={styles.endreIkon} aria-hidden/>
		case EndringType.ENDRE_OPPSTARTSDATO:
			return <ChevronRightCircleFilled className={styles.endreIkon} aria-hidden/>
		case  EndringType.FORLENG_DELTAKELSE:
			return <ChevronRightDoubleFilled className={styles.forlengIkon} aria-hidden/>
		case EndringType.AVSLUTT_DELTAKELSE:
			return <MinusCircleFilled className={styles.avsluttIkon} aria-hidden/>
		case EndringType.ENDRE_DELTAKELSE_PROSENT:
			return <SvgDivideFilled className={styles.endreProsentDeltakelseIkon} aria-hidden/>
		case EndringType.DELTAKER_IKKE_AKTUELL:
			return <AddCircleFilled className={styles.ikkeAktuellIkon} aria-hidden/>

	}

}
