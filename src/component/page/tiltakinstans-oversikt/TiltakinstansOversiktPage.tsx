import { AxiosResponse } from 'axios'
import { AlertStripeFeil } from 'nav-frontend-alertstriper'
import React, { useState } from 'react'

import { fetchTiltakinstanser } from '../../../api/tiltak-api'
import { TiltakInstans } from '../../../domeneobjekter/tiltak'
import { useValgtVirksomhetStore } from '../../../store/valgt-virksomhet-store'
import { finnUnikeTiltak } from '../../../utils/tiltak-utils'
import { isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise'
import { Spinner } from '../../felles/spinner/Spinner'
import { TiltakinstansListe } from './tiltakinstans-liste/TiltakinstansListe'
import styles from './TiltakinstansOversiktPage.module.less'
import { TiltaksvariantFilter } from './TiltaksvariantFilter'

export const TiltakinstansOversiktPage = (): React.ReactElement => {
	const { valgtVirksomhet } = useValgtVirksomhetStore()
	const [ valgteTiltakTyper, setValgteTiltakTyper ] = useState<string[]>([])

	const fetchTiltakInstanserPromise = usePromise<AxiosResponse<TiltakInstans[]>>(
		() => fetchTiltakinstanser(valgtVirksomhet.id), [ valgtVirksomhet ]
	)

	if (isNotStartedOrPending(fetchTiltakInstanserPromise)) {
		return <Spinner/>
	}

	if (isRejected(fetchTiltakInstanserPromise)) {
		return <AlertStripeFeil>Noe gikk galt</AlertStripeFeil>
	}

	const alleTiltakInstanser = fetchTiltakInstanserPromise.result.data

	const filtrerteTiltak = valgteTiltakTyper.length > 0
		? alleTiltakInstanser.filter(tiltakInstans => valgteTiltakTyper.includes(tiltakInstans.tiltak.tiltakskode))
		: alleTiltakInstanser

	const tiltakValg = finnUnikeTiltak(alleTiltakInstanser)
		.map(tiltak => ({ type: tiltak.tiltakskode, navn: tiltak.tiltaksnavn }))

	const handleOnTiltakValgtChanged = (valgteTyper: string[]) => {
		setValgteTiltakTyper(valgteTyper)
	}

	return (
		<main className={styles.page}>
			<section>
				<TiltaksvariantFilter
					tiltakValg={tiltakValg}
					valgteTyper={valgteTiltakTyper}
					onTiltakValgtChanged={handleOnTiltakValgtChanged}
				/>
			</section>

			<section>
				<TiltakinstansListe tiltakInstanser={filtrerteTiltak}/>
			</section>
		</main>
	)
}
