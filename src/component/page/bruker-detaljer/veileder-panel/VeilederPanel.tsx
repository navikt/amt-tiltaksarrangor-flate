import { AddPerson, People } from '@navikt/ds-icons'
import { Alert, Button, Heading, Loader, Panel } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import cls from 'classnames'
import React, { useEffect, useState } from 'react'
import { Deltaker } from '../../../../api/data/deltaker'
import { Veileder } from '../../../../api/data/veileder'
import { hentVeiledereForDeltaker } from '../../../../api/tiltak-api'

import globalStyles from '../../../../globals.module.scss'
import { lagBrukerNavn } from '../../../../utils/bruker-utils'
import { EMDASH } from '../../../../utils/constants'
import { isNotStartedOrPending, isRejected, isResolved, usePromise } from '../../../../utils/use-promise'
import { Show } from '../../../felles/Show'
import { IconLabel } from '../icon-label/IconLabel'
import { TildelVeilederModal } from '../tildel-veileder-modal/TildelVeilederModal'
import styles from './VeilederPanel.module.scss'

interface Props {
	deltaker: Deltaker
	visTildeling: boolean
}

export const VeilederPanel = ({ deltaker, visTildeling }: Props): React.ReactElement => {
	const hentVeilederePromise = usePromise<AxiosResponse<Veileder[]>>(() => hentVeiledereForDeltaker(deltaker.id))
	const [ veileder, setVeileder ] = useState<Veileder>()
	const [ medveiledere, setMedveiledere ] = useState<Veileder[]>([])
	const [ openModal, setOpenModal ] = useState(false)

	useEffect(() => {
		if (isResolved(hentVeilederePromise)) {
			setVeileder(hentVeilederePromise.result.data.find(v => !v.erMedveileder))
			setMedveiledere(hentVeilederePromise.result.data.filter(v => v.erMedveileder))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ hentVeilederePromise.result ])

	if (isNotStartedOrPending(hentVeilederePromise)) {
		return <div className={styles.loader}><Loader size="2xlarge" /></div>
	}

	if (isRejected(hentVeilederePromise)) {
		return <Alert variant="error">Kan ikke vise veiledere.</Alert>
	}

	const handleModalState = () => {
		setOpenModal(prev => !prev)
	}

	const handleSubmit = (veiledere: Veileder[]) => {
		setVeileder(veiledere.find(v => !v.erMedveileder))
		setMedveiledere(veiledere.filter(v => v.erMedveileder))
	}

	return (
		<Panel border className={styles.infoPanel}>

			<Heading size="small" level="3" className={globalStyles.blokkXs}>Tiltaksarrangør</Heading>
			<Heading size="xsmall" level="4" className={globalStyles.blokkXs}>Veileder</Heading>
			<div className={cls(styles.contentBlock, globalStyles.blokkM)}>
				<IconLabel
					labelValue={veileder ? lagBrukerNavn(veileder.fornavn, veileder.mellomnavn, veileder.etternavn) : EMDASH}
					icon={<People title="Veileder navn" />}
					iconWrapperClassName={styles.iconWrapper}
				/>
			</div>

			<Heading size="xsmall" level="4" className={globalStyles.blokkXs}>Medveiledere</Heading>
			<div className={styles.contentBlock}>
				{medveiledere.length > 0 ? medveiledere.map(v => {
					return <IconLabel
						labelValue={lagBrukerNavn(v.fornavn, v.mellomnavn, v.etternavn)}
						icon={<People title="Veileder navn" />}
						iconWrapperClassName={styles.iconWrapper}
						key={v.ansattId}
					/>
				})
					: <IconLabel
						labelValue={EMDASH}
						icon={<People title="Veileder navn" />}
						iconWrapperClassName={styles.iconWrapper}
					/>
				}
			</div>

			<Show if={visTildeling}>
				<Button variant="secondary" size="small" className={styles.knapp} onClick={handleModalState}>
					<span className={styles.knappTekst}><AddPerson /> Endre</span>
				</Button>
				
				<TildelVeilederModal
					deltaker={deltaker}
					veileder={veileder}
					medveiledere={medveiledere}
					open={openModal}
					onClose={handleModalState}
					onSubmit={handleSubmit}
				/>
			</Show>

		</Panel>
	)
}
